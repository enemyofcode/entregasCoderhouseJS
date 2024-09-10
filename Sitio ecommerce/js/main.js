const contenedorCarrito = document.querySelector('.contenedor-carrito')
const carritoContador = document.querySelector('.contador-carrito')

//Array de Objetos
let productosEnCarrito = []

function cargarProductos() {
    const grillaProductos = document.querySelector('.grilla-productos')
    fetch('../data/productos.json')
        .then(response => response.json())
        .then(productos => {
            productos.forEach(prod => {
                const contenedor = document.createElement('div')
                contenedor.classList.add('producto')
                contenedor.innerHTML = `
                    <img src="${prod.imagen}" />
                    <h3>${prod.titulo}</h3>
                    <p>${prod.precio}</p>
                    <button class="btn-agregar-carrito">Agregar al carrito</button>
                `
                grillaProductos.appendChild(contenedor)
            })
            agregarProductosCarrito()
            mostrarContenedorCarrito()
            borrarCarrito(productosEnCarrito)
            cerrarCarrito(contenedorCarrito)
            comprar(productosEnCarrito)
        })
}

document.addEventListener('DOMContentLoaded', ()=>{
    cargarProductos();
    cargarCarritoPersistido();
    cargarEstadoBotones();
})

function cargarCarritoPersistido() {
    const productosGuardados = JSON.parse(localStorage.getItem('productos'));
    if (productosGuardados && productosGuardados.length > 0) {
        productosEnCarrito = productosGuardados;
        carritoContador.textContent = productosEnCarrito.length;
        actualizarListadoCarrito();
        calcularTotal(productosEnCarrito);
    }
}

if (!localStorage.getItem('alertaMostrada')) {
    // Muestro la alerta de terminos y condiciones
    Swal.fire({
      html: 'Para operar en nuestro sitio debe aceptar los <b>terminos y condiciones</b>',
      confirmButtonText: 'Acepto',
      icon: 'info',
      toast: true,
      confirmButtonColor: '#156ec4',
      position: 'bottom',
      customClass: {
        container: 'contenedor-sweetalert'
      }
    }).then(() => {
      // Guardo el check cuando se acepta para que se muestre una sola vez
      localStorage.setItem('alertaMostrada', 'true');
    });
  }

  function agregarProductosCarrito() {
    const contenedorProducto = document.querySelectorAll('.producto')
    contenedorProducto.forEach(contenedorProd => {
        contenedorProd.addEventListener('click', (e) => {
            if(e.target.classList.contains('btn-agregar-carrito')) {
                const nuevoProducto = {
                    nombreProducto: contenedorProd.querySelector('h3').textContent,
                    precioProducto: parseInt(contenedorProd.querySelector('p').textContent.slice(1).replace(/[.]/g, ''))
                }

                productosEnCarrito.push(nuevoProducto)
                carritoContador.textContent++;

                // Remuevo el botón de agregar y agrego el botón de "Agregado"
                e.target.classList.remove('btn-agregar-carrito')
                e.target.classList.add('btn-agregado-carrito')
                e.target.remove()
                contenedorProd.append(botonAgregadoAlCarrito())
           
                // Agrego los productos al contenedor del carrito
                const listadoProductosCarrito = document.querySelector('.productos-carrito')
                listadoProductosCarrito.innerHTML = ''

                productosEnCarrito.forEach(producto => {
                    const productoLista = document.createElement('li')
                    productoLista.innerHTML = `${producto.nombreProducto} - ${producto.precioProducto}
                    <button class="borrar-producto" ><span> x</span></button>`
                    listadoProductosCarrito.appendChild(productoLista)
                })

                console.log(productosEnCarrito)
                calcularTotal(productosEnCarrito) 

                //agrego productos al storage
                localStorage.setItem('productos',JSON.stringify(productosEnCarrito))

                //agregar estado de botones al storage
               enviarEstadoBotones();
            }     
        })
    })
}

  function botonAgregadoAlCarrito() {
        const btnAgregado = document.createElement('button')
        btnAgregado.classList.add('btn-agregado-carrito')
        btnAgregado.textContent = 'Agregado ✔'
        btnAgregado.style.color = 'black'
        btnAgregado.style.backgroundColor = '#90EE90'
        return btnAgregado
  }

function mostrarContenedorCarrito() {
    const carritoImg = document.querySelector('.carrito-compras img')
    carritoImg.addEventListener('click', ()=> {
        const contenedorCarrito = document.querySelector('.contenedor-carrito')
        if(carritoContador.textContent > 0) {
            contenedorCarrito.classList.toggle('ocultar')
        }
    })
}

/* Este listener por algun motivo para borrar los productos , hay que clickear en el borde derecho del boton
debe ser un tema de estilos.
Solo me falta reiniciar el estado de los botones en la grilla de
productos al eliminar productos del carrito pero la logica está 👀
Los estilos del carrito son horribles btw 😂 */

contenedorCarrito.addEventListener('click', (e) => {
    if (e.target.classList.contains('borrar-producto')) {
        const index = e.target.getAttribute('data-index')
        productosEnCarrito.splice(index, 1)
        //Actualizo el local storage
        localStorage.setItem('productos', JSON.stringify(productosEnCarrito));
        // Elimino el producto de la lista
        e.target.parentElement.remove()
        carritoContador.textContent = productosEnCarrito.length
        actualizarListadoCarrito()
        calcularTotal(productosEnCarrito)
        console.log('Array actualizado:', productosEnCarrito)
        if(carritoContador.textContent == 0) {
            contenedorCarrito.classList.toggle('ocultar')
        }    

        //Envio el estado de los botones de los productos al localstorage
        enviarEstadoBotones();
    }
})

function actualizarListadoCarrito() {
    const listadoProductosCarrito = document.querySelector('.productos-carrito')
    listadoProductosCarrito.innerHTML = ''

    productosEnCarrito.forEach((producto, index) => {
        const productoLista = document.createElement('li')
        productoLista.style.listStyleType = 'none'
        productoLista.innerHTML = `${producto.nombreProducto} - ${producto.precioProducto}
        <button class="borrar-producto" data-index="${index}"><span> x</span></button>`
        listadoProductosCarrito.appendChild(productoLista)
    })
}

function calcularTotal(productosEnCarrito) {
    let total = productosEnCarrito.reduce((acc,item) => {
        return acc+= item.precioProducto
    },0)
    let contenedorTotal = document.querySelector('.total')
    contenedorTotal.textContent = `Total: $${total}`;
}

function cerrarCarrito(contenedorCarrito) {
    const btnCerrarCarrito = document.querySelector('#cerrar-carrito')
    btnCerrarCarrito.addEventListener('click',()=> {
        contenedorCarrito.classList.toggle('ocultar')
    })
}

function borrarCarrito(productosEnCarrito) {
    const btnBorrarCarrito = document.querySelector('#borrar-carrito');
    btnBorrarCarrito.addEventListener('click', () => {
        carritoContador.textContent = 0;
        localStorage.removeItem('productos');
        productosEnCarrito.splice(0, productosEnCarrito.length); // Vacía el array sin perder referencia

        Swal.fire({
            confirmButtonText: 'Aceptar',
            icon: 'success',
            html: `Su carrito ha sido eliminado exitosamente`,
        });

        contenedorCarrito.classList.toggle('ocultar');
        const listadoProductosCarrito = document.querySelectorAll('.productos-carrito');
        listadoProductosCarrito.forEach(prod => {
            prod.innerHTML = ''; // Vacía los elementos hijos
        });

        const tot = document.querySelector('.total');
        tot.textContent = 'Total:';
    });
}

function comprar(productosEnCarrito) {
    const btnComprar = document.querySelector('#comprar');
    btnComprar.addEventListener('click', () => {
        const detallesProductos = productosEnCarrito.map(producto => 
            `<div>
                <strong>Producto:</strong> ${producto.nombreProducto}<br>
                <strong>Precio:</strong> $${producto.precioProducto}
            </div>`
        ).join('<br>');

        // Calcular el total
        const total = productosEnCarrito.reduce((acc, producto) => acc + producto.precioProducto, 0);

        Swal.fire({
            confirmButtonText: 'Aceptar',
            icon: 'success',
            html: `
                Gracias por su compra <br><br>
                ${detallesProductos}
                <br><br><hr>
                <strong>Total:</strong> $${total}
            `,
        }).then(()=>{
             //Borro la variable productos del localstorage una vez procesada la compra y reinicio el array de productos
                localStorage.removeItem('productos')
                productosEnCarrito = []  
                location.reload()
        });
    });
}

function enviarEstadoBotones() {
    let estadoBtns = document.querySelectorAll('.producto button')
    let arrayBtns = []
    estadoBtns.forEach(btn => {
        arrayBtns.push(btn.classList)
    })
    localStorage.setItem('EstadoBotones',JSON.stringify(arrayBtns))
}


function cargarEstadoBotones() {
    let arrayBtns = JSON.parse(localStorage.getItem('EstadoBotones'))
    let estadoBtns = document.querySelectorAll('.producto button')
    estadoBtns.forEach(btn => {
        console.log('1' + btn)
    })
}