const carrito = document.querySelectorAll('.carrito-compras')
const contenedorProducto = document.querySelectorAll('.producto');
const imagen = document.querySelector('.producto img')
const nombre = document.querySelector('.producto h3')
const precio = document.querySelector('.producto p');
const precios = document.querySelectorAll('.producto p')
const carritoContador = document.querySelector('.contador-carrito')

const carritoDeCompras = [];

let producto = {
    imagen , nombre , precio
};


contenedorProducto.forEach(producto => {
    producto.addEventListener('click', (e) => {
         if(e.target.classList.contains('btn-agregar-carrito')) {
        console.log(producto)
        carritoDeCompras.push({
            imagen: producto.querySelector('img').src,
            nombre: producto.querySelector('h3').textContent,
            precio: producto.querySelector('p').textContent 
        })
        carritoContador.textContent++;
        //Remuevo el boton una vez agregado el producto al carrito
        console.log(e.target.remove())
        console.log(carritoDeCompras)
    }
    })
})

//Work in progress carrito de compras... 
// Proximos pasos , ver como inserto una tabla con los elementos que voy agregando al carrito

//Nota: Los eventos , modificacion del DOM y storage estan implementadas en las paginas de login/registro




