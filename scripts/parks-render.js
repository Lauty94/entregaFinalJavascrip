const container = document.getElementById('parks-container');
const filtroZona = document.getElementById('filter-zona');
const filtroRodado = document.getElementById('filter-rodado');
const filtroPuntuacion = document.getElementById('filter-puntuacion');

let parksData = [];

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
    container.innerHTML = `<div class="col-12 text-danger">
      No se pudieron cargar los parks. Revisa la ruta o inicia un servidor local.
    </div>`;
  });

function renderParks(list) {
  container.innerHTML = '';
  if (!list.length) {
    container.innerHTML = `<div class="col-12 text-muted">No hay skateparks para mostrar.</div>`;
    return;
  }

  list.forEach(park => {
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6 col-lg-4';

    col.innerHTML = `
      <div class="card h-100">
        <img src="${park.img}" class="card-img-top" alt="${park.nombre}">
        <div class="card-body">
          <h5 class="card-title">${park.nombre}</h5>
          <p class="card-text">${park.descripcion}</p>
          <p class="card-text"><small class="text-muted">
            Zona: ${park.zona} • Rodado: ${park.rodado} • ⭐ ${park.puntuacion}
          </small></p>
          <a href="${park.url}" class="btn btn-dark w-100">Ver más</a>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}

function aplicarFiltros() {
  let filtrados = [...parksData];

  if (filtroZona.value) {
    filtrados = filtrados.filter(p => p.zona.toLowerCase() === filtroZona.value.toLowerCase());
  }

  if (filtroRodado.value) {
    filtrados = filtrados.filter(p => p.rodado.toLowerCase() === filtroRodado.value.toLowerCase());
  }

  if (filtroPuntuacion.value) {
    filtrados = filtrados.filter(p => p.puntuacion >= Number(filtroPuntuacion.value));
  }

  renderParks(filtrados);
}

[filtroZona, filtroRodado, filtroPuntuacion].forEach(select => {
  select.addEventListener('change', aplicarFiltros);
});
