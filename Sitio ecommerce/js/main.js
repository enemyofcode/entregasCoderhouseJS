const carrito = document.querySelectorAll('.carrito-compras')
const contenedorProducto = document.querySelectorAll('.producto')
const imagen = document.querySelector('.producto img')
const nombre = document.querySelector('.producto h3')
const precio = document.querySelector('.producto p')
const precios = document.querySelectorAll('.producto p')
const carritoContador = document.querySelector('.contador-carrito')
const btnVaciarCarrito = document.querySelector('.btn-vaciar-carrito')
/* let botonesProductoAgregado = document.querySelectorAll('.btn-producto-agregado') */

//Calculo precios stock
let totalStock = 0;
let total = precios.forEach(item => {
     totalStock += parseInt(item.textContent.slice(1).replace(/[.]/g, ''))
})
console.log('Total de stock es de $' + totalStock)


let carritoDeCompras = [];

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
        //Muestro el boton de vaciar carrito si hay al menos un producto cargado
        if(carritoContador.textContent > 0) {
            btnVaciarCarrito.classList.remove('btn-vaciar-carrito')
        }
        
        //Remuevo el boton una vez agregado el producto al carrito
        e.target.remove()
        //Agrego boton con otro estilo luego que un producto es agregado
        const agregado = document.createElement('button')
        agregado.style.backgroundColor = 'green';
        agregado.classList.add('btn-producto-agregado')
        agregado.style.borderRadius = '6px';
        agregado.style.color = 'white'
        agregado.textContent = 'Agregado';
        producto.appendChild(agregado)
        
        //Muestro carrito
        console.log(carritoDeCompras)
    }
    })
})

btnVaciarCarrito.addEventListener('click', ()=> {
    carritoDeCompras = [];
    carritoContador.textContent = 0;
    //Escondo el boton cuando se vacia el carrito
    btnVaciarCarrito.classList.add('btn-vaciar-carrito')
    let botonesProductoAgregado = document.querySelectorAll('.btn-producto-agregado')
    //Reinicio el estado de los botones
    botonesProductoAgregado.forEach(item => {
        item.classList.remove('btn-producto-agregado')
        item.style = '';
        item.textContent = 'Agregar al carrito'
        item.classList.add('btn-agregar-carrito')
    })
    console.log(carritoDeCompras)
})


//Work in progress carrito de compras... 
// Proximos pasos , ver como inserto una tabla con los elementos que voy agregando al carrito aunque es un poco complejo

//Nota: Los eventos , modificacion del DOM y storage estan implementadas en las paginas de login/registro




