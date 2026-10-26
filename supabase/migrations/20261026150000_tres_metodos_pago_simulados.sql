-- Amigurumiland: tarjeta, transferencia y PayPal son métodos de demostración.
-- No se procesan cobros ni se almacenan datos de tarjeta.
-- La migración falla de forma segura si la función no coincide exactamente con
-- la versión revisada; no modifica la lógica transaccional restante.

BEGIN;

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
  v_original_method_check text := 'p_metodo NOT IN (''transferencia'', ''simulado'')';
  v_updated_method_check text := 'p_metodo NOT IN (''tarjeta'', ''transferencia'', ''paypal'')';
  v_original_simulation_flag text := '(v_metodo = ''simulado'')';
BEGIN
  SELECT pg_get_functiondef(
    'public.finalizar_compra_transaccional(jsonb,smallint,jsonb,text,text)'::regprocedure
  ) INTO v_definition;

  IF position(v_original_method_check IN v_definition) = 0 THEN
    RAISE EXCEPTION 'No se encontró la validación de método de pago esperada; migración cancelada.';
  END IF;

  IF position(v_original_simulation_flag IN v_definition) = 0 THEN
    RAISE EXCEPTION 'No se encontró la marca de simulación esperada; migración cancelada.';
  END IF;

  v_definition := replace(v_definition, v_original_method_check, v_updated_method_check);
  v_definition := replace(v_definition, v_original_simulation_flag, 'true');

  IF position(v_updated_method_check IN v_definition) = 0
     OR position(v_original_method_check IN v_definition) > 0
     OR position('        true' IN v_definition) = 0 THEN
    RAISE EXCEPTION 'No se pudieron verificar los cambios de la función; migración cancelada.';
  END IF;

  EXECUTE v_definition;
END
$migration$;

COMMENT ON FUNCTION public.finalizar_compra_transaccional(jsonb, smallint, jsonb, text, text)
IS 'Registra pedidos de forma transaccional. tarjeta, transferencia y paypal son métodos de demostración; ningún pago se procesa ni se marca como dinero recibido.';

COMMIT;
