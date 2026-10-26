-- Permite que el catálogo reciba actualizaciones de stock en tiempo real.
-- La lectura pública sigue limitada por la política RLS de productos activos.
ALTER PUBLICATION supabase_realtime ADD TABLE public.productos;
