-- Amigurumiland: los tres métodos son simulaciones. No se reciben ni almacenan datos de tarjeta.
-- La función conserva su validación, bloqueo de stock y transacción existentes; solo amplía métodos y marca cada pago como simulación.
ALTER TABLE public.pagos DROP CONSTRAINT IF EXISTS pagos_metodo_check;
ALTER TABLE public.pagos
  ADD CONSTRAINT pagos_metodo_check
  CHECK (metodo = ANY (ARRAY[
    'tarjeta'::text, 'transferencia'::text, 'paypal'::text,
    'efectivo'::text, 'simulado'::text, 'otro'::text
  ]));

DO $migration$
DECLARE
  v_definition text;
BEGIN
  SELECT pg_get_functiondef(
    'public.finalizar_compra_transaccional(jsonb,smallint,jsonb,text,text)'::regprocedure
  ) INTO v_definition;

  IF position('p_metodo NOT IN (''transferencia'', ''simulado'')' IN v_definition) = 0 THEN
    RAISE EXCEPTION 'La función de compra no coincide con la versión esperada; se cancela la migración.';
  END IF;

  v_definition := replace(
    v_definition,
    'p_metodo NOT IN (''transferencia'', ''simulado'')',
    'p_metodo NOT IN (''tarjeta'', ''transferencia'', ''paypal'')'
  );
  v_definition := replace(v_definition, '(v_metodo = ''simulado'')', 'true');

  EXECUTE v_definition;
END
$migration$;

COMMENT ON FUNCTION public.finalizar_compra_transaccional(jsonb, smallint, jsonb, text, text)
IS 'Registra pedidos de forma transaccional. tarjeta, transferencia y paypal son métodos de demostración; ningún pago se procesa ni se marca como dinero recibido.';
