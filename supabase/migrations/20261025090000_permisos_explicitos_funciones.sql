-- Amigurumiland: permisos explícitos para funciones privilegiadas.
-- Revisado contra el proyecto Supabase fgkurfilmphuxkbhlcul el 2026-10-25.
-- Esta migración no altera pedidos, pagos, inventario ni datos de usuarios.
-- Aplicar tras revisar en el entorno de Supabase correspondiente.

BEGIN;

-- Operaciones administrativas y compra: solo usuarios autenticados pueden invocarlas.
-- Las funciones también validan auth.uid() y, en el caso administrativo,
-- la pertenencia a public.administradores dentro de su cuerpo.
REVOKE ALL ON FUNCTION public.aprobar_pago_administrativo(uuid)
  FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.aprobar_pago_administrativo(uuid)
  TO authenticated;

REVOKE ALL ON FUNCTION public.es_administrador()
  FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.es_administrador()
  TO authenticated;

REVOKE ALL ON FUNCTION public.finalizar_compra_transaccional(jsonb, smallint, jsonb, text, text)
  FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.finalizar_compra_transaccional(jsonb, smallint, jsonb, text, text)
  TO authenticated;

-- La consulta por código + correo es una función pública intencional del sitio.
-- Mantener solo los roles necesarios; el cuerpo debe seguir devolviendo únicamente
-- los datos del pedido cuyo código y correo coinciden.
REVOKE ALL ON FUNCTION public.consultar_pedido_publico(text, text)
  FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.consultar_pedido_publico(text, text)
  TO anon, authenticated;

-- Función de trigger: no es una API y no debe poder llamarse directamente.
REVOKE ALL ON FUNCTION public.crear_perfil_nuevo_usuario()
  FROM PUBLIC, anon, authenticated;

COMMIT;
