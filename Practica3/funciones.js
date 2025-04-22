// Array de productos con imágenes
const productos = [
    { 
        nombre: 'Laptop', 
        precio: 1200, 
        categoria: 'Electrónicos',
        imagen: 'https://m.media-amazon.com/images/I/71TPda7cwUL._AC_SL1500_.jpg'
    },
    { 
        nombre: 'Smartphone', 
        precio: 800, 
        categoria: 'Electrónicos',
        imagen: 'https://m.media-amazon.com/images/I/71xb2xkN5qL._AC_SL1500_.jpg'
    },
    { 
        nombre: 'Auriculares', 
        precio: 80, 
        categoria: 'Accesorios',
        imagen: 'https://m.media-amazon.com/images/I/61CqYq+xwNL._AC_SL1500_.jpg'
    },
    { 
        nombre: 'Teclado', 
        precio: 50, 
        categoria: 'Accesorios',
        imagen: 'https://m.media-amazon.com/images/I/71gLngs+5jL._AC_SL1500_.jpg'
    },
    { 
        nombre: 'Mouse', 
        precio: 30, 
        categoria: 'Accesorios',
        imagen: 'https://m.media-amazon.com/images/I/61lnzTv2a0L._AC_SL1500_.jpg'
    },
    { 
        nombre: 'Tablet', 
        precio: 250, 
        categoria: 'Electrónicos',
        imagen: 'https://m.media-amazon.com/images/I/61XDeaOrrKL._AC_SL1500_.jpg'
    },
    { 
        nombre: 'Cargador', 
        precio: 25, 
        categoria: 'Accesorios',
        imagen: 'https://i.ebayimg.com/images/g/EewAAOSw88BlTGiY/s-l1600.webp'
    },
    { 
        nombre: 'Monitor', 
        precio: 350, 
        categoria: 'Electrónicos',
        imagen: 'https://m.media-amazon.com/images/I/81QpkIctqPL._AC_SL1500_.jpg'
    },
    // 5 productos adicionales < $100
    { 
        nombre: 'Mousepad', 
        precio: 15, 
        categoria: 'Accesorios',
        imagen: 'https://m.media-amazon.com/images/I/71MZi5l+1QL._AC_SL1500_.jpg'
    },
    { 
        nombre: 'Fundas para celular', 
        precio: 20, 
        categoria: 'Accesorios',
        imagen: 'https://m.media-amazon.com/images/I/71wXeJZ1bVL._AC_SL1500_.jpg'
    },
    { 
        nombre: 'Cable USB', 
        precio: 12, 
        categoria: 'Accesorios',
        imagen: 'https://m.media-amazon.com/images/I/61pBvlYVPxL._AC_SL1500_.jpg'
    },
    { 
        nombre: 'Adaptador', 
        precio: 18, 
        categoria: 'Accesorios',
        imagen: 'https://m.media-amazon.com/images/I/61xKwak5+LL._AC_SL1500_.jpg'
    },
    { 
        nombre: 'Soporte para laptop', 
        precio: 35, 
        categoria: 'Accesorios',
        imagen: 'https://m.media-amazon.com/images/I/71S8U9VzLTL._AC_SL1500_.jpg'
    }
];

// Elementos del DOM
const productsContainer = document.getElementById('products-container');
const filterBtn = document.getElementById('filter-btn');
const toggleModeBtn = document.getElementById('toggle-mode');

// Variable para controlar el estado del filtro
let showingEconomic = false;

// Función para mostrar productos
function mostrarProductos(products) {
    productsContainer.innerHTML = '';
    
    products.forEach(producto => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        // Añadir clase 'economic' si el precio es menor a 100
        if (producto.precio < 100) {
            productCard.classList.add('economic');
        }
        
        productCard.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image" onerror="this.src='https://via.placeholder.com/300x200?text=Imagen+no+disponible'">
            <div class="product-info">
                <h4>${producto.nombre}</h4>
                <p class="product-price">$${producto.precio}</p>
                <p class="product-category">${producto.categoria}</p>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
}

// Función para alternar entre mostrar todos o solo los económicos
function toggleEconomicProducts() {
    showingEconomic = !showingEconomic;
    
    if (showingEconomic) {
        const economicProducts = productos.filter(p => p.precio < 100);
        mostrarProductos(economicProducts);
        filterBtn.textContent = 'Mostrar todos los productos';
    } else {
        mostrarProductos(productos);
        filterBtn.textContent = 'Mostrar productos < $100';
    }
}

// Event Listeners
filterBtn.addEventListener('click', toggleEconomicProducts);

toggleModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    toggleModeBtn.textContent = isDark ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
});

// Inicialización
mostrarProductos(productos);

function mostrarProductos(products) {
    productsContainer.innerHTML = '';
    
    products.forEach(producto => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        if (producto.precio < 100) {
            productCard.classList.add('economic');
        }
        
        productCard.innerHTML = `
            <div class="product-image-container">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image" 
                     onerror="this.src='https://via.placeholder.com/300x200?text=Imagen+no+disponible'">
            </div>
            <div class="product-info">
                <h4>${producto.nombre}</h4>
                <p class="product-price">$${producto.precio}</p>
                <p class="product-category">${producto.categoria}</p>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
}