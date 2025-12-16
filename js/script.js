let cart = [];
let totalPrice = 0;

const cards = document.querySelectorAll('.card');

cards.forEach(card => {

    const button = card.querySelector('button');
    const titleProduct = card.querySelector('h4').textContent;
    const priceProduct = parseFloat(card.querySelector('.price').textContent);

    button.addEventListener('click', () => {
        const product = {
            title: titleProduct,
            price: priceProduct,
            count: 1,
        };

        console.log(product);
        cart.push(product);
        totalPrice += parseFloat(product.price);

        localStorage.setItem('productos', JSON.stringify(cart));
        localStorage.setItem('total', totalPrice.toString());

        document.querySelector('.count').textContent = cart.length;
    });
});


function handleCart() {
    const cart = JSON.parse(localStorage.getItem('productos')) || [];

    const total = JSON.parse(localStorage.getItem('total')) || 0;

    const carritoProduct = document.getElementById('itemProducts');

    if (cart.length === 0) {
        carritoProduct.innerHTML = '<p>El carrito está vacío</p>';
        return;
    }

    const tabla = document.createElement('table');
    tabla.classList.add('name-class-tabla');

    let encabezado = `
      <thead>

            <td>Nombre del Producto</td>
            <td>Precio</td>
            <td>Cantidad</td>

      </thead>
   `;

    let cuerpo = '<tbody>';

    cart.forEach(producto => {
        cuerpo += `
         <tr>
            <td>${producto.title}</td>
            <td>$${producto.price}</td>
            <td>${producto.count}</td>
         </tr>
      `;
    });

    cuerpo += '</tbody>';

    tabla.innerHTML = encabezado + cuerpo;

    carritoProduct.appendChild(tabla);
}


function limpiarCarrito() {

    if (confirm('¿Estás seguro de vaciar el carrito?')) {
        cart = [];
        totalPrice = 0;
        document.querySelector('.count').textContent = 0;
        localStorage.removeItem('productos');
        localStorage.removeItem('total');
        location.reload();
    }

}

document.addEventListener('DOMContentLoaded', handleCart);