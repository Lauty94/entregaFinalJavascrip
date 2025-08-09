const container = document.getElementById('parks-container');
const filtroZona = document.getElementById('filter-zona');
const filtroRodado = document.getElementById('filter-rodado');
const filtroPuntuacion = document.getElementById('filter-puntuacion');

let parksData = [];

fetch('./skateparks.json')
  .then(res => res.json())
  .then(data => {
    parksData = data;
    renderParks(data);
  })
  .catch(err => console.error('Error al cargar skateparks:', err));

// Función para renderizar las cards
function renderParks(lista) {
  container.innerHTML = '';
  lista.forEach(park => {
    const card = `
      <div class="col-md-4">
        <div class="card h-100">
          <img src="${park.img}" alt="${park.nombre}" class="card-img-top">
          <div class="card-body text-center d-flex flex-column">
            <a href="${park.url}" class="btn btn-dark w-100 mb-2">${park.nombre}</a>
            <p class="card-text">${park.descripcion}</p>
            <small class="text-muted">Zona: ${park.zona} | Rodado: ${park.rodado} | ⭐ ${park.puntuacion}</small>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += card;
  });
}

// Filtrar por zona, rodado y puntuación
function aplicarFiltros() {
  let filtrados = parksData;

  if (filtroZona.value) {
    filtrados = filtrados.filter(p => p.zona === filtroZona.value);
  }

  if (filtroRodado.value) {
    filtrados = filtrados.filter(p => p.rodado === filtroRodado.value);
  }

  if (filtroPuntuacion.value) {
    filtrados = filtrados.filter(p => p.puntuacion >= Number(filtroPuntuacion.value));
  }

  renderParks(filtrados);
}

// Eventos
[filtroZona, filtroRodado, filtroPuntuacion].forEach(select => {
  select.addEventListener('change', aplicarFiltros);
});
