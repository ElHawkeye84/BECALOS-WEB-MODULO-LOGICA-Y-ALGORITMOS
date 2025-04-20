// Array global para almacenar los productos
const listaDeCompras = [];

// Funciones exportadas
export function agregarProducto(producto) {
  if (!producto.trim()) return false;
  if (!listaDeCompras.includes(producto)) {
    listaDeCompras.push(producto);
    return true;
  }
  return false;
}

export function eliminarProducto(producto) {
  const index = listaDeCompras.indexOf(producto);
  if (index !== -1) {
    listaDeCompras.splice(index, 1);
    return true;
  }
  return false;
}

export function mostrarLista() {
  const listaElement = document.getElementById('lista');
  if (listaDeCompras.length === 0) {
    listaElement.innerHTML = '<div class="empty-state">No hay productos en la lista</div>';
  } else {
    listaElement.innerHTML = `
      <h3>📋 Lista de Compras (${listaDeCompras.length})</h3>
      <ul>
        ${listaDeCompras.map(item => `
          <li>
            <span class="producto-text">${item}</span>
            <button class="delete-btn" onclick="eliminarItem('${item}')">
              <span class="material-icons">delete</span>
            </button>
          </li>
        `).join('')}
      </ul>
    `;
  }
}

export function descargarLista() {
  if (listaDeCompras.length === 0) return;
  
  const contenido = listaDeCompras.map((item, index) => 
    `${index + 1}. ${item}`
  ).join('\n');
  
  const blob = new Blob([contenido], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'lista_de_compras.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Funciones globales para los botones
window.agregar = () => {
  const input = document.getElementById('productoInput');
  if (agregarProducto(input.value)) {
    input.value = '';
    mostrarLista();
  }
};

window.eliminarItem = (producto) => {
  if (eliminarProducto(producto)) {
    mostrarLista();
  }
};

window.mostrar = () => {
  mostrarLista();
};

window.descargarLista = () => {
  descargarLista();
};

// Manejar la tecla Enter
document.getElementById('productoInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') agregar();
});