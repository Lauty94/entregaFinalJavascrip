const container = document.getElementById('parks-container');
const filtroZona = document.getElementById('filter-zona');
const filtroRodado = document.getElementById('filter-rodado');
const filtroPuntuacion = document.getElementById('filter-puntuacion');

let parksData = [];

// Cargar JSON
fetch('../scripts/skateparks.json')
  .then(res => {
    if (!res.ok) throw new Error('No se pudo cargar skateparks.json');
    return res.json();
  })
  .then(data => {
    parksData = data;
    renderParks(parksData);
  })
  .catch(err => {
    console.error('Error al cargar skateparks.json:', err);
    container.innerHTML = `<div class="col-12"><p class="text-danger">No se pudieron cargar los parks. Revisa la ruta o inicia un servidor local.</p></div>`;
  });

// Renderiza lista de parks
function renderParks(list) {
  container.innerHTML = '';
  if (!list.length) {
    container.innerHTML = `<div class="col-12"><p class="text-muted">No hay skateparks para mostrar.</p></div>`;
    return;
  }

  list.forEach(park => {
    // Columna contenedora
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6';

    // Card horizontal (bootstrap)
    col.innerHTML = `
      <div class="card mb-3 h-100">
        <div class="row g-0 align-items-center">
          <div class="col-4">
            <a href="${park.url || '#'}">
              <img src="${park.img}" class="img-fluid rounded-start" alt="${park.nombre}">
            </a>
          </div>
          <div class="col-8">
            <div class="card-body">
              <h5 class="card-title mb-1"><a href="${park.url || '#'}" class="text-dark text-decoration-none">${park.nombre}</a></h5>
              <p class="card-text mb-2">${park.descripcion}</p>
              <p class="card-text"><small class="text-body-secondary">Zona: ${park.zona} • Rodado: ${park.rodado} • ⭐ ${park.puntuacion}</small></p>
            </div>
          </div>
        </div>
      </div>
    `;

    container.appendChild(col);
  });
}

// Renderiza solo 1 park por id (útil para "mostrar un park en particular")
function renderParkById(id) {
  const park = parksData.find(p => Number(p.id) === Number(id));
  if (!park) {
    container.innerHTML = `<div class="col-12"><p class="text-muted">Park con id ${id} no encontrado.</p></div>`;
    return;
  }
  renderParks([park]);
}

// Filtrado: zona, rodado y puntuación mínima
function aplicarFiltros() {
  let filtrados = [...parksData];

  if (filtroZona && filtroZona.value) {
    filtrados = filtrados.filter(p => p.zona.toLowerCase() === filtroZona.value.toLowerCase());
  }

  if (filtroRodado && filtroRodado.value) {
    filtrados = filtrados.filter(p => p.rodado && p.rodado.toLowerCase() === filtroRodado.value.toLowerCase());
  }

  if (filtroPuntuacion && filtroPuntuacion.value) {
    const min = Number(filtroPuntuacion.value);
    filtrados = filtrados.filter(p => Number(p.puntuacion) >= min);
  }

  renderParks(filtrados);
}

// Listeners filtros (si los selects existen)
[filtroZona, filtroRodado, filtroPuntuacion].forEach(s => {
  if (s) s.addEventListener('change', aplicarFiltros);
});

// Export para poder llamar desde consola (opcional)
window.renderParkById = renderParkById;
window.renderParks = () => renderParks(parksData);