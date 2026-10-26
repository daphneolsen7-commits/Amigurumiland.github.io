-- Amigurumiland: checkout atómico (pedido + detalles + factura + pago + envío + stock)
-- Ejecutar una sola vez en Supabase > SQL Editor. No requiere claves privadas.
-- Esta versión incorpora validación explícita del método de pago y entradas numéricas.

create or replace function public.finalizar_compra_transaccional(
  p_items jsonb,
  p_punto_retiro_id smallint,
  p_factura jsonb,
  p_metodo text,
  p_referencia text default null
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_usuario_id uuid;
  v_pedido_id uuid;
  v_codigo text;
  v_subtotal numeric(10,2) := 0;
  v_item record;
  v_producto public.productos%rowtype;
  v_lineas integer;
  v_metodo text;
  v_referencia text;
begin
  -- 1. Verificar sesión
  v_usuario_id := auth.uid();
  if v_usuario_id is null then
    raise exception 'Debes iniciar sesión para realizar una compra.' using errcode = '28000';
  end if;

  -- 2. Validar estructura y tamaño del carrito
  if p_items is null or jsonb_typeof(p_items) <> 'array' then
    raise exception 'El carrito está vacío o supera el máximo de 50 líneas.' using errcode = '22023';
  end if;

  if jsonb_array_length(p_items) = 0 or jsonb_array_length(p_items) > 50 then
    raise exception 'El carrito está vacío o supera el máximo de 50 líneas.' using errcode = '22023';
  end if;

  -- 3. Validar los datos de cada artículo
  if exists (
    select 1
    from jsonb_array_elements(p_items) as x(item)
    where jsonb_typeof(x.item) <> 'object'
       or coalesce(x.item->>'producto_id', '') !~ '^[0-9]{1,10}$'
       or case
            when coalesce(x.item->>'producto_id', '') ~ '^[0-9]{1,10}$'
            then (x.item->>'producto_id')::numeric not between 1 and 2147483647
            else true
          end
       or coalesce(x.item->>'cantidad', '') !~ '^[1-9][0-9]?$'
       or coalesce(x.item->>'tamano', '') not in (
         'Pequeño (15 cm)', 'Mediano (20 cm)', 'Grande (30 cm)'
       )
       or char_length(coalesce(x.item->>'color', '')) > 80
  ) then
    raise exception 'Hay artículos con datos inválidos.' using errcode = '22023';
  end if;

  -- 4. Limitar la cantidad total de cada producto
  if exists (
    select 1
    from (
      select (x.item->>'producto_id')::integer as producto_id,
             sum((x.item->>'cantidad')::integer)::integer as cantidad
      from jsonb_array_elements(p_items) as x(item)
      group by (x.item->>'producto_id')::integer
    ) q
    where q.cantidad > 99
  ) then
    raise exception 'La cantidad total de un producto no puede superar 99.' using errcode = '22023';
  end if;

  -- 5. Verificar punto de retiro activo
  if p_punto_retiro_id is null or not exists (
    select 1 from public.puntos_retiro pr
    where pr.id = p_punto_retiro_id and pr.activo = true
  ) then
    raise exception 'El punto de retiro no está disponible.' using errcode = '22023';
  end if;

  -- 6. Validar datos de facturación
  if p_factura is null or jsonb_typeof(p_factura) <> 'object'
     or coalesce(length(trim(p_factura->>'nombre_razon_social')), 0) not between 2 and 160
     or coalesce(p_factura->>'tipo_identificacion', '') not in ('cedula', 'ruc')
     or coalesce(length(trim(p_factura->>'identificacion')), 0) not between 10 and 13
     or coalesce(length(trim(p_factura->>'telefono')), 0) not between 7 and 20
     or coalesce(length(trim(p_factura->>'direccion')), 0) not between 8 and 160
     or coalesce(length(trim(p_factura->>'email')), 0) not between 3 and 254 then
    raise exception 'Los datos de facturación están incompletos o no son válidos.' using errcode = '22023';
  end if;

  -- 7. Validar explícitamente el método de pago
  if p_metodo is null or p_metodo not in ('transferencia', 'simulado') then
    raise exception 'El método de pago no está permitido.' using errcode = '22023';
  end if;
  v_metodo := p_metodo;
  v_referencia := left(coalesce(nullif(trim(p_referencia), ''), 'SIMULACIÓN'), 100);

  -- 8. Bloquear productos en orden determinista y comprobar existencias
  for v_item in
    select (x.item->>'producto_id')::integer as producto_id,
           sum((x.item->>'cantidad')::integer)::integer as cantidad
    from jsonb_array_elements(p_items) as x(item)
    group by (x.item->>'producto_id')::integer
    order by (x.item->>'producto_id')::integer
  loop
    select p.* into v_producto
    from public.productos p
    where p.id = v_item.producto_id and p.activo = true
    for update;

    if not found then
      raise exception 'El producto % no existe o no está disponible.', v_item.producto_id using errcode = '22023';
    end if;
    if v_producto.stock < v_item.cantidad then
      raise exception 'Stock insuficiente para el producto %. Disponible: %, solicitado: %.',
        v_producto.nombre, v_producto.stock, v_item.cantidad using errcode = '22023';
    end if;
  end loop;

  -- 9. Calcular subtotal usando precios de la base de datos
  -- Suplemento de tamaño: mediano +3, grande +6
  select coalesce(sum((
    p.precio +
    case x.item->>'tamano'
      when 'Mediano (20 cm)' then 3
      when 'Grande (30 cm)' then 6
      else 0
    end
  ) * (x.item->>'cantidad')::integer), 0)
  into v_subtotal
  from jsonb_array_elements(p_items) as x(item)
  join public.productos p
    on p.id = (x.item->>'producto_id')::integer and p.activo = true;

  if v_subtotal < 0 or v_subtotal > 99999999.99 then
    raise exception 'El total del pedido supera el máximo permitido.' using errcode = '22003';
  end if;

  v_lineas := jsonb_array_length(p_items);

  -- 10. Crear pedido
  insert into public.pedidos (
    usuario_id, punto_retiro_id, estado, subtotal, total, notas
  )
  values (
    v_usuario_id, p_punto_retiro_id, 'Pendiente de pago', v_subtotal, v_subtotal, null
  )
  returning id, codigo into v_pedido_id, v_codigo;

  -- 11. Guardar detalle del pedido
  insert into public.detalle_pedido (
    pedido_id, producto_id, nombre_producto, cantidad, color, tamano, precio_unitario
  )
  select
    v_pedido_id,
    p.id,
    p.nombre,
    (x.item->>'cantidad')::integer,
    nullif(left(coalesce(x.item->>'color', ''), 80), ''),
    x.item->>'tamano',
    p.precio + case x.item->>'tamano'
      when 'Mediano (20 cm)' then 3
      when 'Grande (30 cm)' then 6
      else 0
    end
  from jsonb_array_elements(p_items) as x(item)
  join public.productos p
    on p.id = (x.item->>'producto_id')::integer and p.activo = true;

  -- 12. Descontar inventario
  update public.productos p
  set stock = p.stock - i.cantidad,
      updated_at = now()
  from (
    select (x.item->>'producto_id')::integer as producto_id,
           sum((x.item->>'cantidad')::integer)::integer as cantidad
    from jsonb_array_elements(p_items) as x(item)
    group by (x.item->>'producto_id')::integer
  ) i
  where p.id = i.producto_id;

  -- 13. Registrar factura
  insert into public.facturas (
    pedido_id, nombre_razon_social, tipo_identificacion, identificacion,
    telefono, direccion, email, total, estado
  ) values (
    v_pedido_id,
    left(trim(p_factura->>'nombre_razon_social'), 160),
    p_factura->>'tipo_identificacion',
    trim(p_factura->>'identificacion'),
    trim(p_factura->>'telefono'),
    left(trim(p_factura->>'direccion'), 160),
    lower(trim(p_factura->>'email')),
    v_subtotal,
    'Registrada'
  );

  -- 14. Registrar pago pendiente; solo el método simulado se marca como simulación.
  insert into public.pagos (
    pedido_id, metodo, estado, referencia, importe, es_simulacion
  ) values (
    v_pedido_id, v_metodo, 'Pendiente', v_referencia, v_subtotal, (v_metodo = 'simulado')
  );

  -- 15. Registrar envío
  insert into public.envios (pedido_id, estado, fecha_disponible)
  values (v_pedido_id, 'Pendiente', current_date + 7);

  -- 16. Devolver confirmación
  return jsonb_build_object(
    'pedido_id', v_pedido_id,
    'codigo', v_codigo,
    'estado', 'Pendiente de pago',
    'subtotal', v_subtotal,
    'total', v_subtotal,
    'lineas', v_lineas,
    'mensaje', 'Pedido registrado. El pago sigue pendiente de verificación; no se realizó ningún cobro.'
  );
end;
$$;

revoke all on function public.finalizar_compra_transaccional(jsonb, smallint, jsonb, text, text) from public;
revoke all on function public.finalizar_compra_transaccional(jsonb, smallint, jsonb, text, text) from anon;
grant execute on function public.finalizar_compra_transaccional(jsonb, smallint, jsonb, text, text) to authenticated;

comment on function public.finalizar_compra_transaccional(jsonb, smallint, jsonb, text, text)
is 'Registra atómicamente pedido, detalles, factura, pago pendiente, envío y descuento de stock para el usuario autenticado; los precios y suplementos se calculan en PostgreSQL.';
