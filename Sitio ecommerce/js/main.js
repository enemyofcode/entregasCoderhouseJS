const carrito = document.querySelectorAll('.carrito-compras')
const contenedorProducto = document.querySelectorAll('.producto');
const imagen = document.querySelector('.producto img')
const nombre = document.querySelector('.producto h3')
const precio = document.querySelector('.producto p');
const precios = document.querySelectorAll('.producto p')
const carritoContador = document.querySelector('.contador-carrito')

//Calculo precios stock
let totalStock = 0;
let total = precios.forEach(item => {
     totalStock += parseInt(item.textContent.slice(1).replace(/[.]/g, ''))
})
console.log('Total de stock es de $' + totalStock)


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
        e.target.remove()
        //Agrego boton con otro estilo luego que un producto es agregado
        const agregado = document.createElement('button')
        agregado.style.backgroundColor = 'green';
        agregado.style.borderRadius = '6px';
        agregado.style.color = 'white'
        agregado.textContent = 'Agregado';
        producto.appendChild(agregado)
        
        //Muestro carrito
        console.log(carritoDeCompras)
    }
    })
})

//Work in progress carrito de compras... 
// Proximos pasos , ver como inserto una tabla con los elementos que voy agregando al carrito

//Nota: Los eventos , modificacion del DOM y storage estan implementadas en las paginas de login/registro




