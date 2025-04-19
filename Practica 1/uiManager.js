import { registrarDestino, calcularCosto, obtenerViajes, DESTINOS, TRANSPORTES } from './viajesManager.js';

// Elementos del DOM
const obtenerElementos = () => ({
  form: document.getElementById('viaje-form'),
  destinoSelect: document.getElementById('destino'),
  fechaInput: document.getElementById('fecha'),
  transporteSelect: document.getElementById('transporte'),
  personasInput: document.getElementById('personas'),
  resultadoDiv: document.getElementById('resultado'),
  itinerarioDiv: document.getElementById('itinerario'),
  modoOscuroBtn: document.getElementById('modo-oscuro'),
  limpiarBtn: document.getElementById('limpiar')
});

// Inicializar opciones
const inicializarOpciones = () => {
  const { destinoSelect, transporteSelect } = obtenerElementos();
  
  // Llenar destinos
  Object.keys(DESTINOS).forEach(destino => {
    const option = document.createElement('option');
    option.value = destino;
    option.textContent = destino.charAt(0).toUpperCase() + destino.slice(1);
    destinoSelect.appendChild(option);
  });
  
  // Llenar transportes
  Object.keys(TRANSPORTES).forEach(transporte => {
    const option = document.createElement('option');
    option.value = transporte;
    option.textContent = transporte.charAt(0).toUpperCase() + transporte.slice(1);
    transporteSelect.appendChild(option);
  });
};

// Mostrar itinerario
const mostrarItinerario = () => {
  const { itinerarioDiv } = obtenerElementos();
  const viajes = obtenerViajes();
  
  if (viajes.length === 0) {
    itinerarioDiv.innerHTML = '<p>No hay viajes registrados aún.</p>';
    return;
  }
  
  itinerarioDiv.innerHTML = viajes.map((viaje, index) => `
    <div class="viaje-card">
      <h3>Viaje #${index + 1}</h3>
      <p><strong>Destino:</strong> ${viaje.destino}</p>
      <p><strong>Fecha:</strong> ${viaje.fecha}</p>
      <p><strong>Transporte:</strong> ${viaje.transporte}</p>
      <p><strong>Personas:</strong> ${viaje.personas}</p>
      <p><strong>Costo estimado:</strong> $${viaje.costo}</p>
    </div>
  `).join('');
};

// Manejar envío del formulario
const manejarSubmit = (e) => {
  e.preventDefault();
  const { destinoSelect, fechaInput, transporteSelect, personasInput, resultadoDiv } = obtenerElementos();
  
  const destino = destinoSelect.value;
  const fecha = fechaInput.value;
  const transporte = transporteSelect.value;
  const personas = parseInt(personasInput.value) || 1;
  
  if (!destino || !fecha || !transporte) {
    resultadoDiv.textContent = 'Por favor complete todos los campos';
    return;
  }
  
  const viaje = registrarDestino(destino, fecha, transporte, personas);
  
  resultadoDiv.innerHTML = `
    <p>Viaje a ${destino} registrado para el ${fecha}</p>
    <p>Costo estimado: $${viaje.costo} (${personas} persona${personas !== 1 ? 's' : ''})</p>
  `;
  
  mostrarItinerario();
};

// Alternar modo oscuro
const alternarModoOscuro = () => {
  document.body.classList.toggle('modo-oscuro');
  localStorage.setItem('modoOscuro', document.body.classList.contains('modo-oscuro'));
};

// Limpiar viajes
const limpiarViajes = () => {
  const { resultadoDiv } = obtenerElementos();
  limpiarViajes();
  resultadoDiv.textContent = '';
  mostrarItinerario();
};

// Inicializar UI
const inicializarUI = () => {
  const { form, modoOscuroBtn, limpiarBtn } = obtenerElementos();
  
  inicializarOpciones();
  
  // Verificar modo oscuro guardado
  if (localStorage.getItem('modoOscuro') === 'true') {
    document.body.classList.add('modo-oscuro');
  }
  
  // Event listeners
  form.addEventListener('submit', manejarSubmit);
  modoOscuroBtn.addEventListener('click', alternarModoOscuro);
  limpiarBtn.addEventListener('click', limpiarViajes);
  
  mostrarItinerario();
};

export { inicializarUI };