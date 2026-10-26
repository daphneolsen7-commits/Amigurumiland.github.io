-- Amigurumiland: integración de cotizaciones, reseñas, pedidos y panel administrativo.
-- Idempotente. Aplicada al proyecto activo fgkurfilmphuxkbhlcul el 2026-10-26.
BEGIN;

CREATE OR REPLACE FUNCTION public.es_administrador()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = ''
AS $$
  SELECT EXISTS (SELECT 1 FROM public.administradores a WHERE a.usuario_id = auth.uid());
$$;
REVOKE ALL ON FUNCTION public.es_administrador() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.es_administrador() TO authenticated;

CREATE TABLE IF NOT EXISTS public.resenas_imagenes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resena_id uuid NOT NULL REFERENCES public.resenas(id) ON DELETE CASCADE,
  storage_path text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.resenas_imagenes ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.resenas_imagenes FROM PUBLIC, anon, authenticated;
GRANT SELECT ON TABLE public.resenas_imagenes TO anon, authenticated;
GRANT INSERT, DELETE ON TABLE public.resenas_imagenes TO authenticated;
DROP POLICY IF EXISTS "Leer imagenes de resenas" ON public.resenas_imagenes;
CREATE POLICY "Leer imagenes de resenas" ON public.resenas_imagenes FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Crear imagenes de resenas propias" ON public.resenas_imagenes;
CREATE POLICY "Crear imagenes de resenas propias" ON public.resenas_imagenes FOR INSERT TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM public.resenas r WHERE r.id = resena_id AND r.usuario_id = (SELECT auth.uid())));
DROP POLICY IF EXISTS "Borrar imagenes de resenas propias" ON public.resenas_imagenes;
CREATE POLICY "Borrar imagenes de resenas propias" ON public.resenas_imagenes FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.resenas r WHERE r.id = resena_id AND r.usuario_id = (SELECT auth.uid())));

DROP POLICY IF EXISTS "Administradores leen pedidos" ON public.pedidos;
CREATE POLICY "Administradores leen pedidos" ON public.pedidos FOR SELECT TO authenticated USING (public.es_administrador());
DROP POLICY IF EXISTS "Administradores leen detalles de pedidos" ON public.detalle_pedido;
CREATE POLICY "Administradores leen detalles de pedidos" ON public.detalle_pedido FOR SELECT TO authenticated USING (public.es_administrador());
DROP POLICY IF EXISTS "Administradores leen pagos" ON public.pagos;
CREATE POLICY "Administradores leen pagos" ON public.pagos FOR SELECT TO authenticated USING (public.es_administrador());
DROP POLICY IF EXISTS "Administradores leen facturas" ON public.facturas;
CREATE POLICY "Administradores leen facturas" ON public.facturas FOR SELECT TO authenticated USING (public.es_administrador());
DROP POLICY IF EXISTS "Administradores leen envíos" ON public.envios;
CREATE POLICY "Administradores leen envíos" ON public.envios FOR SELECT TO authenticated USING (public.es_administrador());
DROP POLICY IF EXISTS "Administradores actualizan envíos" ON public.envios;
CREATE POLICY "Administradores actualizan envíos" ON public.envios FOR UPDATE TO authenticated USING (public.es_administrador()) WITH CHECK (public.es_administrador());
DROP POLICY IF EXISTS "Administradores leen cotizaciones" ON public.cotizaciones;
CREATE POLICY "Administradores leen cotizaciones" ON public.cotizaciones FOR SELECT TO authenticated USING (public.es_administrador());
DROP POLICY IF EXISTS "Administradores actualizan cotizaciones" ON public.cotizaciones;
CREATE POLICY "Administradores actualizan cotizaciones" ON public.cotizaciones FOR UPDATE TO authenticated USING (public.es_administrador()) WITH CHECK (public.es_administrador());
GRANT UPDATE ON TABLE public.cotizaciones, public.envios TO authenticated;
GRANT DELETE ON TABLE public.cotizaciones TO authenticated;

INSERT INTO storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
VALUES ('amigurumiland-cotizaciones','amigurumiland-cotizaciones',false,5242880,ARRAY['image/jpeg','image/png','image/webp']),
       ('amigurumiland-resenas','amigurumiland-resenas',true,5242880,ARRAY['image/jpeg','image/png','image/webp'])
ON CONFLICT (id) DO UPDATE SET public=EXCLUDED.public,file_size_limit=EXCLUDED.file_size_limit,allowed_mime_types=EXCLUDED.allowed_mime_types;
DROP POLICY IF EXISTS "Leer imagenes de cotizaciones propias o admin" ON storage.objects;
CREATE POLICY "Leer imagenes de cotizaciones propias o admin" ON storage.objects FOR SELECT TO authenticated
USING (bucket_id='amigurumiland-cotizaciones' AND (public.es_administrador() OR (storage.foldername(name))[1]=(SELECT auth.uid())::text));
DROP POLICY IF EXISTS "Subir imagenes de cotizaciones propias" ON storage.objects;
CREATE POLICY "Subir imagenes de cotizaciones propias" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id='amigurumiland-cotizaciones' AND (storage.foldername(name))[1]=(SELECT auth.uid())::text);
DROP POLICY IF EXISTS "Borrar imagenes de cotizaciones propias" ON storage.objects;
CREATE POLICY "Borrar imagenes de cotizaciones propias" ON storage.objects FOR DELETE TO authenticated
USING (bucket_id='amigurumiland-cotizaciones' AND (storage.foldername(name))[1]=(SELECT auth.uid())::text);
DROP POLICY IF EXISTS "Imagenes de resenas visibles publicamente" ON storage.objects;
CREATE POLICY "Imagenes de resenas visibles publicamente" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id='amigurumiland-resenas');
DROP POLICY IF EXISTS "Subir imagenes de resenas propias" ON storage.objects;
CREATE POLICY "Subir imagenes de resenas propias" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id='amigurumiland-resenas' AND (storage.foldername(name))[1]=(SELECT auth.uid())::text);
DROP POLICY IF EXISTS "Borrar imagenes de resenas propias" ON storage.objects;
CREATE POLICY "Borrar imagenes de resenas propias" ON storage.objects FOR DELETE TO authenticated
USING (bucket_id='amigurumiland-resenas' AND (storage.foldername(name))[1]=(SELECT auth.uid())::text);

CREATE OR REPLACE FUNCTION public.consultar_pedido_publico(p_codigo text,p_email text)
RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = ''
AS $$
DECLARE v_result jsonb;
BEGIN
 IF p_codigo IS NULL OR length(trim(p_codigo))<8 OR length(trim(p_codigo))>24 OR p_email IS NULL OR length(trim(p_email))>254 THEN RETURN NULL; END IF;
 SELECT jsonb_build_object(
  'codigo',p.codigo,'estado',p.estado,'total',p.total,'created_at',p.created_at,
  'punto_retiro',COALESCE(pr.nombre,'Por coordinar'),
  'fecha_disponible',(SELECT min(e.fecha_disponible) FROM public.envios e WHERE e.pedido_id=p.id AND e.fecha_disponible IS NOT NULL),
  'pago_estado',(SELECT pg.estado FROM public.pagos pg WHERE pg.pedido_id=p.id ORDER BY pg.created_at DESC LIMIT 1),
  'pago_metodo',(SELECT pg.metodo FROM public.pagos pg WHERE pg.pedido_id=p.id ORDER BY pg.created_at DESC LIMIT 1),
  'detalles',COALESCE(jsonb_agg(jsonb_build_object('nombre_producto',dp.nombre_producto,'cantidad',dp.cantidad,'color',dp.color,'tamano',dp.tamano) ORDER BY dp.id) FILTER(WHERE dp.id IS NOT NULL),'[]'::jsonb))
 INTO v_result
 FROM auth.users u JOIN public.pedidos p ON p.usuario_id=u.id
 LEFT JOIN public.puntos_retiro pr ON pr.id=p.punto_retiro_id
 LEFT JOIN public.detalle_pedido dp ON dp.pedido_id=p.id
 WHERE upper(p.codigo)=upper(trim(p_codigo)) AND lower(u.email)=lower(trim(p_email))
 GROUP BY p.id,pr.nombre LIMIT 1;
 RETURN v_result;
END; $$;
REVOKE ALL ON FUNCTION public.consultar_pedido_publico(text,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.consultar_pedido_publico(text,text) TO anon,authenticated;
DROP POLICY IF EXISTS "Administradores leen imagenes de cotizaciones" ON public.imagenes_cotizacion;
CREATE POLICY "Administradores leen imagenes de cotizaciones" ON public.imagenes_cotizacion FOR SELECT TO authenticated USING (public.es_administrador());
DROP POLICY IF EXISTS "Borrar cotizaciones propias" ON public.cotizaciones;
CREATE POLICY "Borrar cotizaciones propias" ON public.cotizaciones FOR DELETE TO authenticated USING ((SELECT auth.uid())=usuario_id);

CREATE INDEX IF NOT EXISTS idx_resenas_imagenes_resena ON public.resenas_imagenes(resena_id);
CREATE INDEX IF NOT EXISTS idx_cotizaciones_usuario_created ON public.cotizaciones(usuario_id,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_resenas_producto_created ON public.resenas(producto_id,created_at DESC);

CREATE OR REPLACE FUNCTION public.sincronizar_estado_pedido_desde_envio()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
 IF NEW.estado IS DISTINCT FROM OLD.estado THEN
  IF NEW.estado='Listo para retiro' THEN
   UPDATE public.pedidos SET estado='Listo para retiro' WHERE id=NEW.pedido_id AND estado IN ('Confirmado','En preparación');
  ELSIF NEW.estado='Preparación' THEN
   UPDATE public.pedidos SET estado='En preparación' WHERE id=NEW.pedido_id AND estado='Confirmado';
  ELSIF NEW.estado='Entregado' THEN
   UPDATE public.pedidos SET estado='Entregado' WHERE id=NEW.pedido_id AND estado='Listo para retiro';
  END IF;
 END IF;
 RETURN NEW;
END; $$;
REVOKE ALL ON FUNCTION public.sincronizar_estado_pedido_desde_envio() FROM PUBLIC,anon,authenticated;
DROP TRIGGER IF EXISTS trg_sincronizar_estado_pedido_desde_envio ON public.envios;
CREATE TRIGGER trg_sincronizar_estado_pedido_desde_envio AFTER UPDATE OF estado ON public.envios FOR EACH ROW EXECUTE FUNCTION public.sincronizar_estado_pedido_desde_envio();

COMMIT;
