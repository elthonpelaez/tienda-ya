// Catálogo Oficial de Productos Argentinos
const productos = [
  {
    id: 1,
    nombre: "Yerba Mate Playadito 1kg",
    precio: 8.5,
    imagen: "assets/img/playadito.jpg",
  },
  {
    id: 2,
    nombre: "Yerba Mate Amanda 1kg",
    precio: 7.9,
    imagen: "assets/img/amanda.jpg",
  },
  {
    id: 3,
    nombre: "Yerba Mate Rosamonte 1kg",
    precio: 8.2,
    imagen: "assets/img/rosamonte.jpg",
  },
  {
    id: 4,
    nombre: "Yerba Mate Baldo 1kg",
    precio: 8.9,
    imagen: "assets/img/baldo.jpg",
  },
  {
    id: 5,
    nombre: "Yerba Mate CBSé 1kg",
    precio: 7.5,
    imagen: "assets/img/cbse.jpg",
  },
  {
    id: 6,
    nombre: "Yerba Mate Taragüí 1kg",
    precio: 7.9,
    imagen: "assets/img/taragui.jpg",
  },
  {
    id: 7,
    nombre: "Yerba Mate Mañanita 1kg",
    precio: 7.8,
    imagen: "assets/img/mananita.jpg",
  },
  {
    id: 8,
    nombre: "Yerba Mate Canarias 1kg",
    precio: 9.5,
    imagen: "assets/img/canarias.jpg",
  },
  {
    id: 9,
    nombre: "Gancia Americano 1L",
    precio: 12.5,
    imagen: "assets/img/gancia.jpg",
  },
  {
    id: 10,
    nombre: "Fernet Branca 1L",
    precio: 18.9,
    imagen: "assets/img/fernet.jpg",
  },
  {
    id: 11,
    nombre: "Dulce de Leche Havanna 450g",
    precio: 6.5,
    imagen: "assets/img/dulce-havanna.jpg",
  },
  {
    id: 12,
    nombre: "Set Matero + Bombilla",
    precio: 15.0,
    imagen: "assets/img/set-matero.jpg",
  },
];

let carrito = [];
let cantidadesGrid = {};
let slideActual = 0;
let cantidadCarrusel = 1;

let costoEnvioActual = 0;
let zonaSeleccionadaTexto = "Retiro Presencial en Tienda (Tondela)";
let esRetiroEnTienda = true;
let esEntregaLocal = false;
let tarifaACoordinar = false;

const NUMERO_WHATSAPP = "351927798000";

// Inicializar cantidades por defecto
productos.forEach((p) => (cantidadesGrid[p.id] = 1));

/* ==========================================================================
   GESTIÓN DE COPIADO E INTEGRACIÓN MB WAY
   ========================================================================== */

function copiarTexto(texto, elementoBoton) {
  reproducirSonidoPop();
  navigator.clipboard
    .writeText(texto)
    .then(() => {
      const textoOriginal = elementoBoton.innerText;
      elementoBoton.innerText = "¡Copiado! ✓";
      elementoBoton.style.backgroundColor = "#25d366";
      elementoBoton.style.color = "#ffffff";

      setTimeout(() => {
        elementoBoton.innerText = textoOriginal;
        elementoBoton.style.backgroundColor = "";
        elementoBoton.style.color = "";
      }, 1800);
    })
    .catch((err) => {
      console.error("Error al copiar: ", err);
    });
}

function abrirOCopiarMBWay(numero, elementoBoton) {
  reproducirSonidoPop();
  navigator.clipboard.writeText(numero);

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobile) {
    window.location.href = "mbway://";
    setTimeout(() => {
      elementoBoton.innerText = "¡Copiado! ✓";
      setTimeout(() => (elementoBoton.innerText = "📲 Abrir App"), 1800);
    }, 1200);
  } else {
    elementoBoton.innerText = "¡Copiado! ✓";
    setTimeout(() => (elementoBoton.innerText = "📲 Abrir App"), 1800);
  }
}

/* ==========================================================================
   DICCIONARIO DE IDIOMAS (ESPAÑOL, PORTUGUÉS, INGLÉS)
   ========================================================================== */

const traducciones = {
  es: {
    nav_nuestros_productos: "Nuestros Productos",
    nav_productos: "Productos",
    nav_quienes_somos: "Quiénes Somos",
    btn_entrar: "ENTRAR A LA TIENDA ➔",
    hero_slogan: "TU TIENDA LATINA",
    hero_subtext:
      "Sabor latino directo a tu hogar desde Portugal para toda Europa 🇵🇹🇪🇺",
    section_productos_titulo: "🇦🇷 Nuestros Productos Argentinos",
    section_destacados: "Destacados en Carrusel",
    section_historia: "Nuestra Historia",
    modal_titulo: "Resumen de tu Pedido",
    modal_modalidad: "🚚 Modalidad / Zona de Entrega:",
    modal_datos_cliente: "Datos del Cliente para la Entrega:",
    cart_btn: "Pedir por WhatsApp",
    btn_confirmar_wa: "Confirmar y Enviar a WhatsApp ➔",
  },
  pt: {
    nav_nuestros_productos: "Nossos Produtos",
    nav_productos: "Produtos",
    nav_quienes_somos: "Quem Somos",
    btn_entrar: "ENTRAR NA LOJA ➔",
    hero_slogan: "A TUA LOJA LATINA",
    hero_subtext:
      "Sabor latino direto para a tua casa de Portugal para toda a Europa 🇵🇹🇪🇺",
    section_productos_titulo: "🇦🇷 Nossos Produtos Argentinos",
    section_destacados: "Destaques em Carrossel",
    section_historia: "A Nossa História",
    modal_titulo: "Resumo da tua Encomenda",
    modal_modalidad: "🚚 Modalidade / Zona de Entrega:",
    modal_datos_cliente: "Dados do Cliente para a Entrega:",
    cart_btn: "Encomendar por WhatsApp",
    btn_confirmar_wa: "Confirmar e Enviar para WhatsApp ➔",
  },
  en: {
    nav_nuestros_productos: "Our Products",
    nav_productos: "Products",
    nav_quienes_somos: "About Us",
    btn_entrar: "ENTER STORE ➔",
    hero_slogan: "YOUR LATIN STORE",
    hero_subtext:
      "Latin flavor straight to your home from Portugal to all Europe 🇵🇹🇪🇺",
    section_productos_titulo: "🇦🇷 Our Argentine Products",
    section_destacados: "Featured Items",
    section_historia: "Our History",
    modal_titulo: "Order Summary",
    modal_modalidad: "🚚 Delivery Method / Zone:",
    modal_datos_cliente: "Customer Details for Delivery:",
    cart_btn: "Order via WhatsApp",
    btn_confirmar_wa: "Confirm & Send to WhatsApp ➔",
  },
};

let idiomaActual = localStorage.getItem("ya_idioma") || "es";

function cambiarIdioma(lang) {
  idiomaActual = lang;
  localStorage.setItem("ya_idioma", lang);

  const elementos = document.querySelectorAll("[data-i18n]");
  elementos.forEach((el) => {
    const clave = el.getAttribute("data-i18n");
    if (traducciones[lang] && traducciones[lang][clave]) {
      el.innerText = traducciones[lang][clave];
    }
  });

  const select = document.getElementById("selectIdioma");
  if (select) select.value = lang;
}

/* ==========================================================================
   SINTETIZADOR DE SONIDOS (WEB AUDIO API)
   ========================================================================== */

const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;

function obtenerAudioContext() {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// 🔊 1. SONIDO DE CLICK SECO
function reproducirSonidoClick() {
  try {
    const ctx = obtenerAudioContext();
    const ahora = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, ahora);
    osc.frequency.exponentialRampToValueAtTime(80, ahora + 0.015);

    gain.gain.setValueAtTime(0.2, ahora);
    gain.gain.exponentialRampToValueAtTime(0.001, ahora + 0.015);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ahora);
    osc.stop(ahora + 0.015);
  } catch (e) {
    console.log("Audio en espera de interacción");
  }
}

// ✅ 2. SONIDO DE ACEPTACIÓN
function reproducirSonidoExito() {
  try {
    const ctx = obtenerAudioContext();
    const ahora = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(523.25, ahora);
    gain1.gain.setValueAtTime(0.15, ahora);
    gain1.gain.exponentialRampToValueAtTime(0.01, ahora + 0.1);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(ahora);
    osc1.stop(ahora + 0.1);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(783.99, ahora + 0.06);
    gain2.gain.setValueAtTime(0.2, ahora + 0.06);
    gain2.gain.exponentialRampToValueAtTime(0.01, ahora + 0.22);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(ahora + 0.06);
    osc2.stop(ahora + 0.22);
  } catch (e) {
    console.log("Audio en espera de interacción");
  }
}

// 🔘 3. SONIDO POP SUAVE
function reproducirSonidoPop() {
  try {
    const ctx = obtenerAudioContext();
    const ahora = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(400, ahora);
    osc.frequency.exponentialRampToValueAtTime(650, ahora + 0.05);

    gain.gain.setValueAtTime(0.1, ahora);
    gain.gain.exponentialRampToValueAtTime(0.01, ahora + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ahora);
    osc.stop(ahora + 0.05);
  } catch (e) {
    console.log("Audio en espera de interacción");
  }
}

// 🪙 4. SONIDO DE APERTURA DE CAJA
function reproducirSonidoAperturaCaja() {
  try {
    const ctx = obtenerAudioContext();
    const ahora = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(1396.91, ahora);
    gain1.gain.setValueAtTime(0.25, ahora);
    gain1.gain.exponentialRampToValueAtTime(0.01, ahora + 0.3);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(ahora);
    osc1.stop(ahora + 0.3);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(2093.0, ahora + 0.08);
    gain2.gain.setValueAtTime(0.3, ahora + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.01, ahora + 0.35);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(ahora + 0.08);
    osc2.stop(ahora + 0.35);
  } catch (e) {
    console.log("Audio en espera de interacción");
  }
}

// 🎉 5. SONIDO DE VICTORIA
function reproducirSonidoVictoria() {
  try {
    const ctx = obtenerAudioContext();
    const ahora = ctx.currentTime;

    const notas = [523.25, 659.25, 783.99, 1046.5];
    const tiempos = [0, 0.08, 0.16, 0.26];
    const duraciones = [0.1, 0.1, 0.1, 0.35];

    notas.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, ahora + tiempos[idx]);

      gain.gain.setValueAtTime(0.25, ahora + tiempos[idx]);
      gain.gain.exponentialRampToValueAtTime(
        0.01,
        ahora + tiempos[idx] + duraciones[idx],
      );

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ahora + tiempos[idx]);
      osc.stop(ahora + tiempos[idx] + duraciones[idx]);
    });
  } catch (e) {
    console.log("Audio en espera de interacción");
  }
}

/* ==========================================================================
   NAVEGACIÓN Y TANGO
   ========================================================================== */

function mostrarSeccion(idSeccion) {
  const secciones = [
    "portada",
    "nuestros-productos",
    "productos",
    "quienes-somos",
  ];
  const navbar = document.getElementById("mainNavbar");
  const cartFloat = document.getElementById("floatingCart");
  const audioTango = document.getElementById("audioTango");

  secciones.forEach((sec) => {
    const el = document.getElementById(sec);
    if (el) {
      if (sec === "portada") {
        el.style.display = sec === idSeccion ? "flex" : "none";
      } else {
        el.style.display = sec === idSeccion ? "block" : "none";
      }
    }
  });

  if (navbar) navbar.style.display = idSeccion === "portada" ? "none" : "flex";

  if (cartFloat) {
    if (idSeccion === "portada" || idSeccion === "quienes-somos") {
      cartFloat.style.display = "none";
    } else {
      cartFloat.style.display = "block";
    }
  }

  if (audioTango) {
    if (idSeccion === "quienes-somos") {
      audioTango.volume = 0.4;
      audioTango.play().catch((e) => {
        console.log(
          "El navegador requiere interacción previa para reproducir audio.",
        );
      });
    } else {
      audioTango.pause();
      audioTango.currentTime = 0;
    }
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function entrarALaTienda() {
  const portada = document.getElementById("portada");

  reproducirSonidoClick();

  if (portada) {
    portada.classList.add("destello-activo");
    setTimeout(() => {
      portada.classList.remove("destello-activo");
    }, 600);
  }

  setTimeout(() => {
    mostrarSeccion("nuestros-productos");
  }, 300);
}

/* ==========================================================================
   GRID DE PRODUCTOS
   ========================================================================== */

function cambiarCantidadGrid(id, cambio) {
  reproducirSonidoPop();
  cantidadesGrid[id] += cambio;
  if (cantidadesGrid[id] < 1) cantidadesGrid[id] = 1;
  document.getElementById(`qtyGrid-${id}`).innerText = cantidadesGrid[id];
}

function renderizarProductos() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;
  grid.innerHTML = "";

  productos.forEach((p) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="card-img-wrapper">
        <img src="${p.imagen}" alt="${p.nombre}">
      </div>
      <div class="card-body">
        <h3 class="card-title">${p.nombre}</h3>
        
        <div class="price-qty-row">
          <span class="card-price">€${p.precio.toFixed(2)}</span>
          <div class="quantity-control-sm">
            <button class="btn-qty-sm" onclick="cambiarCantidadGrid(${p.id}, -1)">-</button>
            <span class="qty-number-sm" id="qtyGrid-${p.id}">${cantidadesGrid[p.id]}</span>
            <button class="btn-qty-sm" onclick="cambiarCantidadGrid(${p.id}, 1)">+</button>
          </div>
        </div>

        <button class="btn-add" onclick="agregarAlCarrito(${p.id})">Añadir al Carrito</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function agregarAlCarrito(id) {
  reproducirSonidoExito();
  const producto = productos.find((p) => p.id === id);
  const cant = cantidadesGrid[id];
  if (producto) {
    for (let i = 0; i < cant; i++) {
      carrito.push(producto);
    }
    actualizarContador();
    cantidadesGrid[id] = 1;
    document.getElementById(`qtyGrid-${id}`).innerText = 1;
  }
}

/* ==========================================================================
   CARRUSEL 3D
   ========================================================================== */

function renderizarCarrusel() {
  const mainCard = document.getElementById("mainCard");
  const sidePrev = document.getElementById("sidePrev");
  const sideNext = document.getElementById("sideNext");

  if (!mainCard) return;

  const total = productos.length;
  const idxPrev = (slideActual - 1 + total) % total;
  const idxNext = (slideActual + 1) % total;

  const prodMain = productos[slideActual];
  const prodPrev = productos[idxPrev];
  const prodNext = productos[idxNext];

  sidePrev.innerHTML = `
    <div class="carousel-img-wrapper">
      <img src="${prodPrev.imagen}" alt="${prodPrev.nombre}">
    </div>
    <h4 style="font-size:0.85rem">${prodPrev.nombre}</h4>
  `;

  mainCard.innerHTML = `
    <div class="carousel-img-wrapper">
      <img src="${prodMain.imagen}" alt="${prodMain.nombre}">
    </div>
    <h3 class="card-title">${prodMain.nombre}</h3>
    <p class="card-price">€${prodMain.precio.toFixed(2)}</p>
    
    <div class="quantity-control-sm" style="justify-content: center; margin: 15px 0;">
      <button class="btn-qty-sm" onclick="cambiarCantidadCarrusel(-1)">-</button>
      <span class="qty-number-sm" id="carouselQty">${cantidadCarrusel}</span>
      <button class="btn-qty-sm" onclick="cambiarCantidadCarrusel(1)">+</button>
    </div>

    <button class="btn-add" onclick="agregarCarruselAlCarrito()">🛒 Agregar al Carrito</button>
  `;

  sideNext.innerHTML = `
    <div class="carousel-img-wrapper">
      <img src="${prodNext.imagen}" alt="${prodNext.nombre}">
    </div>
    <h4 style="font-size:0.85rem">${prodNext.nombre}</h4>
  `;
}

function cambiarSlide(direccion) {
  reproducirSonidoPop();
  const total = productos.length;
  slideActual = (slideActual + direccion + total) % total;
  cantidadCarrusel = 1;
  renderizarCarrusel();
}

function cambiarCantidadCarrusel(cambio) {
  reproducirSonidoPop();
  cantidadCarrusel += cambio;
  if (cantidadCarrusel < 1) cantidadCarrusel = 1;
  document.getElementById("carouselQty").innerText = cantidadCarrusel;
}

function agregarCarruselAlCarrito() {
  reproducirSonidoExito();
  const prod = productos[slideActual];
  for (let i = 0; i < cantidadCarrusel; i++) {
    carrito.push(prod);
  }
  actualizarContador();
  cantidadCarrusel = 1;
  renderizarCarrusel();
}

function actualizarContador() {
  document.getElementById("cartCount").innerText = carrito.length;
}

/* ==========================================================================
   MODAL DE RESUMEN Y CÁLCULO DINÁMICO DE ENVÍO
   ========================================================================== */

function actualizarCostoEnvio() {
  const select = document.getElementById("selectZonaEnvio");
  const grupoEnvio = document.getElementById("grupoEnvioDomicilio");
  const grupoRetiro = document.getElementById("grupoRetiroTienda");
  const grupoHorarioLocal = document.getElementById("grupoHorarioLocal");

  if (!select) return;

  const zona = select.value;
  let totalProductos = 0;
  carrito.forEach((p) => (totalProductos += p.precio));

  tarifaACoordinar = false;

  if (zona === "retiro") {
    zonaSeleccionadaTexto = "Retiro Presencial en Tienda (Tondela)";
    costoEnvioActual = 0;
    esRetiroEnTienda = true;
    esEntregaLocal = false;

    if (grupoEnvio) grupoEnvio.style.display = "none";
    if (grupoRetiro) grupoRetiro.style.display = "block";
    if (grupoHorarioLocal) grupoHorarioLocal.style.display = "none";
  } else {
    esRetiroEnTienda = false;
    if (grupoEnvio) grupoEnvio.style.display = "block";
    if (grupoRetiro) grupoRetiro.style.display = "none";

    if (zona === "tondela") {
      zonaSeleccionadaTexto = "Tondela y Cercanías";
      costoEnvioActual = totalProductos >= 20 ? 0 : 2.0;
      esEntregaLocal = true;
    } else if (zona === "viseu") {
      zonaSeleccionadaTexto = "Viseu y Alrededores";
      costoEnvioActual = totalProductos >= 40 ? 0 : 3.5;
      esEntregaLocal = true;
    } else if (zona === "ctt") {
      zonaSeleccionadaTexto = "Resto de Portugal Continental (vía CTT)";
      costoEnvioActual = totalProductos >= 60 ? 0 : 5.5;
      esEntregaLocal = false;
    } else if (zona === "islas") {
      zonaSeleccionadaTexto = "Islas de Portugal (Madeira y Azores)";
      costoEnvioActual = 0;
      tarifaACoordinar = true;
      esEntregaLocal = false;
    } else if (zona === "europa") {
      zonaSeleccionadaTexto = "Otros Países de Europa";
      costoEnvioActual = 0;
      tarifaACoordinar = true;
      esEntregaLocal = false;
    }

    if (grupoHorarioLocal) {
      grupoHorarioLocal.style.display = esEntregaLocal ? "flex" : "none";
    }
  }

  renderizarModalContenido();
}

function abrirModalResumen() {
  if (carrito.length === 0) {
    alert("El carrito está vacío. Añade algunos productos antes de pedir.");
    return;
  }
  reproducirSonidoAperturaCaja();
  actualizarCostoEnvio();
  document.getElementById("orderModal").style.display = "flex";
}

function renderizarModalContenido() {
  const container = document.getElementById("orderSummaryContent");
  container.innerHTML = "";

  if (carrito.length === 0) {
    container.innerHTML = "<p>El carrito está vacío.</p>";
    document.getElementById("orderModal").style.display = "none";
    return;
  }

  const resumen = {};
  let totalProductos = 0;

  carrito.forEach((p) => {
    if (resumen[p.nombre]) {
      resumen[p.nombre].cantidad += 1;
      resumen[p.nombre].subtotal += p.precio;
    } else {
      resumen[p.nombre] = {
        id: p.id,
        cantidad: 1,
        precioUnitario: p.precio,
        subtotal: p.precio,
      };
    }
    totalProductos += p.precio;
  });

  for (const item in resumen) {
    const row = document.createElement("div");
    row.classList.add("summary-item");
    row.innerHTML = `
      <div>
        <span><strong>${resumen[item].cantidad}x</strong> ${item}</span>
        <button class="btn-remove-item" onclick="eliminarProductoDelCarrito(${resumen[item].id})">🗑️ Quitar 1</button>
      </div>
      <span>€${resumen[item].subtotal.toFixed(2)}</span>
    `;
    container.appendChild(row);
  }

  // Subtotal Productos
  const subtotalRow = document.createElement("div");
  subtotalRow.classList.add("total-row");
  subtotalRow.style.fontSize = "1rem";
  subtotalRow.style.color = "#cccccc";
  subtotalRow.innerHTML = `
    <span>Productos:</span>
    <span>€${totalProductos.toFixed(2)}</span>
  `;
  container.appendChild(subtotalRow);

  // Costo Envío
  const envioRow = document.createElement("div");
  envioRow.classList.add("total-row");
  envioRow.style.fontSize = "1rem";
  envioRow.style.color = "#cccccc";

  let textoEnvio = "";
  if (esRetiroEnTienda) {
    textoEnvio = "<strong style='color:#25d366;'>0,00€ (Gratis)</strong>";
  } else if (tarifaACoordinar) {
    textoEnvio =
      "<strong style='color:#ffe600;'>A calcular en WhatsApp</strong>";
  } else {
    textoEnvio =
      costoEnvioActual === 0
        ? "<strong style='color:#25d366;'>¡GRATIS!</strong>"
        : `€${costoEnvioActual.toFixed(2)}`;
  }

  envioRow.innerHTML = `
    <span>Envío (${zonaSeleccionadaTexto}):</span>
    <span>${textoEnvio}</span>
  `;
  container.appendChild(envioRow);

  // Total General
  const totalGeneral = totalProductos + costoEnvioActual;
  const totalRow = document.createElement("div");
  totalRow.classList.add("total-row");

  const textoTotalFinal = tarifaACoordinar
    ? `€${totalProductos.toFixed(2)} + Envío`
    : `€${totalGeneral.toFixed(2)}`;

  totalRow.innerHTML = `
    <span>Total a pagar:</span>
    <span>${textoTotalFinal}</span>
  `;
  container.appendChild(totalRow);
}

function eliminarProductoDelCarrito(id) {
  reproducirSonidoPop();
  const index = carrito.findIndex((p) => p.id === id);
  if (index !== -1) {
    carrito.splice(index, 1);
    actualizarContador();
    actualizarCostoEnvio();
  }
}

function cerrarModalResumen() {
  document.getElementById("orderModal").style.display = "none";
}

function enviarPedidoWhatsApp() {
  const nombre = document.getElementById("inputNombre")
    ? document.getElementById("inputNombre").value.trim()
    : "";
  const apellido = document.getElementById("inputApellido")
    ? document.getElementById("inputApellido").value.trim()
    : "";
  const codigoPais = document.getElementById("selectCodigoPais")
    ? document.getElementById("selectCodigoPais").value
    : "+351";
  const numTelefono = document.getElementById("inputTelefono")
    ? document.getElementById("inputTelefono").value.trim()
    : "";
  const email = document.getElementById("inputEmail")
    ? document.getElementById("inputEmail").value.trim()
    : "";

  if (!nombre || !apellido || !numTelefono) {
    alert(
      "Por favor, completa tu Nombre, Apellido y Teléfono antes de continuar.",
    );
    return;
  }

  const telefonoCompleto = `${codigoPais} ${numTelefono}`;
  const nombreCompleto = `${nombre} ${apellido}`;

  let direccion = "";
  let codigoPostal = "";
  let ciudad = "";
  let hora = "";
  let ampm = "PM";
  let horarioRetiro = "";

  if (!esRetiroEnTienda) {
    direccion = document.getElementById("inputDireccion")
      ? document.getElementById("inputDireccion").value.trim()
      : "";
    codigoPostal = document.getElementById("inputCodigoPostal")
      ? document.getElementById("inputCodigoPostal").value.trim()
      : "";
    ciudad = document.getElementById("inputCiudad")
      ? document.getElementById("inputCiudad").value.trim()
      : "";

    if (!direccion || !codigoPostal || !ciudad) {
      alert(
        "Por favor, completa la Dirección, Código Postal y Ciudad para coordinar el envío.",
      );
      return;
    }

    if (esEntregaLocal) {
      hora = document.getElementById("inputHora")
        ? document.getElementById("inputHora").value.trim()
        : "";
      ampm = document.getElementById("selectAmPm")
        ? document.getElementById("selectAmPm").value
        : "PM";
    }
  } else {
    horarioRetiro = document.getElementById("inputHorarioRetiro")
      ? document.getElementById("inputHorarioRetiro").value.trim()
      : "";
    if (!horarioRetiro) {
      alert(
        "Por favor, indícanos el día y horario aproximado en que pasarás a retirar.",
      );
      return;
    }
  }

  reproducirSonidoVictoria();

  // CODIFICACIÓN UNICODE SEGURA DE EMOJIS PARA WHATSAPP
  const emoUser = String.fromCodePoint(0x1f464);
  const emoPin = String.fromCodePoint(0x1f40c);
  const emoStore = String.fromCodePoint(0x1f3ea);
  const emoCart = String.fromCodePoint(0x1f6d2);
  const emoBox = String.fromCodePoint(0x1f4e6);
  const emoMoney = String.fromCodePoint(0x1f4b0);
  const emoCard = String.fromCodePoint(0x1f4b3);
  const emoClip = String.fromCodePoint(0x1f4ce);

  let mensaje = "¡Hola *ya!* Quisiera confirmar el siguiente pedido:\n\n";
  mensaje += `${emoUser} *DATOS DEL CLIENTE:*\n`;
  mensaje += `• *Nombre:* ${nombreCompleto}\n`;
  mensaje += `• *Teléfono:* ${telefonoCompleto}\n`;
  if (email) mensaje += `• *Email:* ${email}\n`;

  if (!esRetiroEnTienda) {
    mensaje += `\n${emoPin} *DATOS DE ENVÍO (${zonaSeleccionadaTexto}):*\n`;
    mensaje += `• *Dirección:* ${direccion}\n`;
    mensaje += `• *Código Postal:* ${codigoPostal}\n`;
    mensaje += `• *Ciudad:* ${ciudad}\n`;
    if (esEntregaLocal && hora) {
      mensaje += `• *Preferencia Horaria (Local):* ${hora} ${ampm}\n`;
    }
  } else {
    mensaje += `\n${emoStore} *MODALIDAD:* Retiro Presencial en Tienda (Tondela)\n`;
    mensaje += `• *Horario estimado:* ${horarioRetiro}\n`;
  }

  mensaje += `\n${emoCart} *DETALLE DEL PEDIDO:*\n`;
  let totalProductos = 0;
  const resumen = {};

  carrito.forEach((p) => {
    if (resumen[p.nombre]) {
      resumen[p.nombre].cantidad += 1;
      resumen[p.nombre].subtotal += p.precio;
    } else {
      resumen[p.nombre] = {
        cantidad: 1,
        precioUnitario: p.precio,
        subtotal: p.precio,
      };
    }
    totalProductos += p.precio;
  });

  for (const item in resumen) {
    mensaje += `• *${resumen[item].cantidad}x ${item}* - €${resumen[item].subtotal.toFixed(2)}\n`;
  }

  const totalGeneral = totalProductos + costoEnvioActual;
  let textoEnvioWA = "";
  if (tarifaACoordinar) {
    textoEnvioWA = "A calcular / coordinar por WhatsApp";
  } else {
    textoEnvioWA =
      costoEnvioActual === 0 ? "¡GRATIS!" : `€${costoEnvioActual.toFixed(2)}`;
  }

  mensaje += `\n${emoBox} *Envío:* ${textoEnvioWA}`;
  mensaje += `\n${emoMoney} *Total a pagar:* ${tarifaACoordinar ? `€${totalProductos.toFixed(2)} + Envío` : `€${totalGeneral.toFixed(2)}`}`;
  mensaje += `\n\n${emoCard} *Datos para el Pago:*`;
  mensaje += `\n- MB WAY: +351 927 797 956`;
  mensaje += `\n- IBAN: PT50 0007 0000 0064 7452 9822 3`;
  mensaje += `\n\n${emoClip} *Adjunto aquí el comprobante de pago para coordinar la entrega. ¡Muchas gracias!*`;

  setTimeout(() => {
    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
    cerrarModalResumen();
  }, 400);
}

// Inicializar la tienda y cargar el idioma
renderizarProductos();
renderizarCarrusel();
mostrarSeccion("portada");
cambiarIdioma(idiomaActual);
