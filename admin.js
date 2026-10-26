(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const status = $("#adminStatus");
  const escape = value => String(value ?? "").replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  const money = value => "$" + Number(value || 0).toFixed(2);
  const date = value => value ? new Date(value).toLocaleString("es-EC",{dateStyle:"medium",timeStyle:"short"}) : "Sin fecha";
  const say = (message, error = false) => { status.textContent = message; status.className = error ? "admin-error" : "admin-success"; };
  const db = () => window.supabaseClient;
  async function requireAdmin() {
    if (!db()) throw new Error("No está disponible la conexión con Supabase.");
    const { data: { session }, error } = await db().auth.getSession();
    if (error) throw error;
    if (!session) { location.replace("login.html?next=admin.html"); return false; }
    const { data, error: roleError } = await db().rpc("es_administrador");
    if (roleError) throw roleError;
    if (data !== true) throw new Error("Esta cuenta no tiene permisos de administración.");
    $("#adminApp").hidden = false;
    return true;
  }
  async function loadOrders() {
    const box = $("#adminOrders");
    box.innerHTML = '<p class="muted">Cargando pedidos…</p>';
    const { data: orders, error } = await db().from("pedidos")
      .select("id,codigo,usuario_id,estado,total,created_at,punto_retiro_id")
      .order("created_at",{ascending:false}).limit(100);
    if (error) throw error;
    if (!orders?.length) { box.innerHTML = '<p class="muted">Todavía no hay pedidos.</p>'; return; }
    const ids = orders.map(item => item.id);
    const [{data:details,error:detailError},{data:payments,error:paymentError},{data:shipments,error:shipmentError}] = await Promise.all([
      db().from("detalle_pedido").select("pedido_id,nombre_producto,cantidad,color,tamano,subtotal").in("pedido_id",ids),
      db().from("pagos").select("id,pedido_id,metodo,estado,es_simulacion,referencia,importe").in("pedido_id",ids),
      db().from("envios").select("pedido_id,estado,fecha_disponible").in("pedido_id",ids)
    ]);
    if(detailError) throw detailError; if(paymentError) throw paymentError; if(shipmentError) throw shipmentError;
    const pickup = {1:"Centro Norte",2:"Centro Histórico",3:"Cumbayá"};
    box.innerHTML = orders.map(order => {
      const lines = (details||[]).filter(x=>x.pedido_id===order.id);
      const payment = (payments||[]).find(x=>x.pedido_id===order.id);
      const shipment = (shipments||[]).find(x=>x.pedido_id===order.id);
      const approve = payment && payment.estado==="Pendiente" && payment.metodo==="transferencia" && !payment.es_simulacion;
      return `<article class="admin-card">
        <h3>Pedido ${escape(order.codigo)}</h3>
        <p><b>Estado:</b> ${escape(order.estado)} · <b>Total:</b> ${money(order.total)}</p>
        <p class="admin-meta">Creado: ${date(order.created_at)}<br>Cliente (ID): ${escape(order.usuario_id)}<br>Retiro: ${escape(pickup[order.punto_retiro_id]||"Por coordinar")}</p>
        <ul>${lines.map(line=>`<li>${escape(line.nombre_producto)} · ${escape([line.color,line.tamano].filter(Boolean).join(" / "))} × ${Number(line.cantidad)}</li>`).join("")}</ul>
        <p><b>Pago:</b> ${escape(payment?.metodo||"No registrado")} — ${escape(payment?.estado||"Sin estado")} ${payment?.es_simulacion?"(simulado; sin cobro real)":""}</p>
        ${payment?.referencia?`<p><b>Referencia:</b> ${escape(payment.referencia)}</p>`:""}
        <p><b>Retiro/envío:</b> ${escape(shipment?.estado||"Sin registro")}</p>
        <div class="admin-actions">
          ${approve?`<button class="btn dark" data-approve="${escape(payment.id)}">Aprobar transferencia verificada</button>`:""}
          ${shipment?`<select class="field" aria-label="Estado de retiro para ${escape(order.codigo)}" data-shipment="${escape(order.id)}">
            ${["Pendiente","Preparación","Listo para retiro","Entregado","Cancelado"].map(s=>`<option ${shipment.estado===s?"selected":""}>${s}</option>`).join("")}
          </select><button class="btn light" data-save-shipment="${escape(order.id)}">Guardar estado</button>`:""}
        </div>
      </article>`;
    }).join("");
    box.querySelectorAll("[data-approve]").forEach(button=>button.addEventListener("click",async()=>{
      if(!confirm("Confirma solo si verificaste que el dinero llegó realmente a la cuenta bancaria. ¿Deseas aprobar este pago?")) return;
      button.disabled=true;
      try { const {error}=await db().rpc("aprobar_pago_administrativo",{p_pago_id:button.dataset.approve}); if(error)throw error; say("Pago aprobado y pedido confirmado."); await loadOrders(); }
      catch(error){say("No se pudo aprobar: "+error.message,true);button.disabled=false;}
    }));
    box.querySelectorAll("[data-save-shipment]").forEach(button=>button.addEventListener("click",async()=>{
      const orderId=button.dataset.saveShipment;
      const state=$(`[data-shipment="${orderId}"]`,box).value;
      button.disabled=true;
      try {
        const {data:rows,error:readError}=await db().from("envios").select("pedido_id").eq("pedido_id",orderId).limit(1);
        if(readError)throw readError;
        if(!rows?.length)throw new Error("No se encontró el registro de envío.");
        const {error}=await db().from("envios").update({estado:state}).eq("pedido_id",orderId);
        if(error)throw error;
        say("Estado de retiro actualizado."); await loadOrders();
      } catch(error){say("No se pudo actualizar el retiro: "+error.message,true);button.disabled=false;}
    }));
  }
  async function loadQuotes() {
    const box=$("#adminQuotes");
    box.innerHTML='<p class="muted">Cargando cotizaciones…</p>';
    const {data:quotes,error}=await db().from("cotizaciones")
      .select("id,usuario_id,diseno,tamano,colores,detalles,estado,precio_propuesto,respuesta_admin,created_at")
      .order("created_at",{ascending:false}).limit(100);
    if(error)throw error;
    if(!quotes?.length){box.innerHTML='<p class="muted">Todavía no hay cotizaciones.</p>';return;}
    box.innerHTML=quotes.map(q=>`<article class="admin-card">
      <h3>Solicitud ${escape(q.id.slice(0,8))}</h3>
      <p class="admin-meta">${date(q.created_at)}<br>Usuario: ${escape(q.usuario_id)}</p>
      <p><b>Diseño:</b> ${escape(q.diseno)}<br><b>Tamaño:</b> ${escape(q.tamano)}<br><b>Colores:</b> ${escape(q.colores)}</p>
      ${q.detalles?`<p><b>Detalles:</b> ${escape(q.detalles)}</p>`:""}
      <div data-quote-images="${escape(q.id)}" class="admin-actions"></div>
      <label>Estado<select class="field" data-quote-state="${escape(q.id)}">${["Recibida","En revisión","Cotizada","Aceptada","Rechazada","Cancelada"].map(s=>`<option ${q.estado===s?"selected":""}>${s}</option>`).join("")}</select></label>
      <label>Precio propuesto (USD)<input class="field" data-quote-price="${escape(q.id)}" type="number" min="0" step="0.01" value="${q.precio_propuesto??""}"></label>
      <label>Respuesta<textarea class="field" data-quote-reply="${escape(q.id)}" maxlength="1000" rows="3">${escape(q.respuesta_admin||"")}</textarea></label>
      <div class="admin-actions"><button class="btn dark" data-save-quote="${escape(q.id)}">Guardar cotización</button></div>
    </article>`).join("");
    for(const q of quotes){
      const {data:images,error:imageError}=await db().from("imagenes_cotizacion").select("storage_path").eq("cotizacion_id",q.id);
      if(imageError)throw imageError;
      const target=$(`[data-quote-images="${q.id}"]`,box);
      for(const image of images||[]){
        const {data,error:signError}=await db().storage.from("amigurumiland-cotizaciones").createSignedUrl(image.storage_path,300);
        if(signError)continue;
        const a=document.createElement("a");a.href=data.signedUrl;a.target="_blank";a.rel="noopener";a.textContent="Ver imagen de referencia";target.append(a);
      }
    }
    box.querySelectorAll("[data-save-quote]").forEach(button=>button.addEventListener("click",async()=>{
      const id=button.dataset.saveQuote;
      const price=$(`[data-quote-price="${id}"]`,box).value.trim();
      const state=$(`[data-quote-state="${id}"]`,box).value;
      const reply=$(`[data-quote-reply="${id}"]`,box).value.trim();
      if(price!==""&&(!Number.isFinite(Number(price))||Number(price)<0)){say("El precio debe ser cero o mayor.",true);return;}
      button.disabled=true;
      try {
        const {error}=await db().from("cotizaciones").update({estado:state,precio_propuesto:price===""?null:Number(price),respuesta_admin:reply||null}).eq("id",id);
        if(error)throw error;
        say("Cotización actualizada."); await loadQuotes();
      } catch(error){say("No se pudo actualizar la cotización: "+error.message,true);button.disabled=false;}
    }));
  }
  document.querySelectorAll("[data-panel]").forEach(button=>button.addEventListener("click",()=>{
    document.querySelectorAll("[data-panel]").forEach(b=>b.setAttribute("aria-pressed",String(b===button)));
    $("#panel-orders").classList.toggle("admin-hidden",button.dataset.panel!=="orders");
    $("#panel-quotes").classList.toggle("admin-hidden",button.dataset.panel!=="quotes");
  }));
  document.addEventListener("DOMContentLoaded",async()=>{
    try { if(!await requireAdmin())return; say("Sesión administrativa verificada."); await Promise.all([loadOrders(),loadQuotes()]); }
    catch(error){$("#adminApp").hidden=true;say(error.message||"No se pudo validar el acceso.",true);}
  });
})();