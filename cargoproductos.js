// Función para cargar y mostrar los productos
function loadProducts() {
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const container = document.getElementById('product-container');
            container.innerHTML = ''; // Limpiar el contenedor
            products.forEach(product => {
                container.innerHTML += `
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p class="price">$${product.price}</p>
                        <a href="${product.link}" target="_blank" class="btn">Comprar en MercadoLibre</a>
                    </div>
                `;
            });
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
}

// Iniciar la carga de productos cuando la página esté lista
window.onload = loadProducts;
