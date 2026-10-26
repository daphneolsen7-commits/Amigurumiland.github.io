-- Amigurumiland: endurecimiento idempotente y rendimiento de claves foráneas.
-- Aplicada/verificada en el proyecto Supabase fgkurfilmphuxkbhlcul el 2026-10-26.
-- No modifica pedidos, productos ni datos existentes.

BEGIN;

-- Esta función es un trigger interno; no debe invocarse directamente por la API.
-- El trigger sigue ejecutándose con los permisos del propietario de la función.
REVOKE ALL ON FUNCTION public.crear_perfil_nuevo_usuario()
FROM PUBLIC, anon, authenticated;

-- Índices de soporte para las claves foráneas señaladas por el asesor de Supabase.
CREATE INDEX IF NOT EXISTS idx_detalle_pedido_producto
    ON public.detalle_pedido (producto_id);

CREATE INDEX IF NOT EXISTS idx_pedidos_punto_retiro
    ON public.pedidos (punto_retiro_id);

COMMIT;

-- La función finalizar_compra_transaccional debe marcar es_simulacion según
-- (v_metodo = 'simulado'), nunca como TRUE para todas las transferencias.
-- Su definición canónica está en ../supabase_checkout_transaccional.sql.
