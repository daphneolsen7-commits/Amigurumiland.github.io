const SUPABASE_URL =
  "https://fgkurfilmphuxkbhlcul.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_R0_Qhm9ddXcgHoN2vJpuyA_qogCuwCS";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

async function probarConexionSupabase() {
  const { data, error } = await supabaseClient
    .from("productos")
    .select("id, nombre, precio, stock")
    .eq("activo", true)
    .limit(5);

  if (error) {
    console.error("Error al conectar con Supabase:", error.message);
    return;
  }

  console.log("Conexión correcta. Productos recibidos:", data);
}