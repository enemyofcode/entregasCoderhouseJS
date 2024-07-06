const stockJuegos = [
  { id: 1, nombreProducto: 'Monopoly', precio: 66000, disponible: true },
  { id: 2, nombreProducto: 'Catan', precio: 80000, disponible: true },
  { id: 3, nombreProducto: 'Splendor', precio: 55000, disponible: false },
  { id: 4, nombreProducto: 'Harmonies', precio: 120000, disponible: true },
 ];
 
 
 //filtro juegos disponibles en stock
 let productosDisponibles = stockJuegos.filter(producto => producto.disponible === true)
 //extraigo la data del array para mostrar al usuario los juegos disponibles en el prompt
 let listaDisponibles = productosDisponibles.map(function(item) {
  return item.nombreProducto + " - $" + item.precio;
 })
 
 
 console.log('Listado disponibles: \n\n' + listaDisponibles.join('\n'));
 //Cálculo del stock disponible con método reduce
 let montoTotalStock = productosDisponibles.reduce((acc,item) => acc+=item.precio,0)
 console.log('Monto de stock total es ' + montoTotalStock)
 
 const metodosDePago = [
  { id: 1, metodo: 'Debito' },
  { id: 2, metodo: 'Credito' },
  { id: 3, metodo: 'Efectivo' }
 ];
 const usuarios = []
 let nombreUsuario;
 let contrasena;
 let iniciarSesion = () => {
  nombreUsuario = prompt('Ingrese nombre de usuario. Este debe tener 6 caracteres minimo');
  validacion(nombreUsuario);
  contrasena = prompt('Ingrese contrasena.Este debe tener 6 caracteres minimo');
  validacion(contrasena)
 };
 function validacion(valor) {
  while (valor === null || valor.length < 6 || valor === '') {
    valor = prompt('Datos suministrados incorrectos, vuelva a ingresarlos. Este debe tener 6 caracteres minimo');
 }
 return valor;
 }
 let productoEncontrado;
 function seleccionarProducto() {
  let productoSeleccionado = prompt('Ingrese producto deseado de nuestro stock \n\n' + listaDisponibles.join('\n'));
  if(productoSeleccionado === null) {
    alert('Proceso de compra abortado') 
  } else {
    productoSeleccionado.toLowerCase();
  //Extraigo el primer caracter para hacer coincidir la busqueda con el producto disponible
  let primerCaracter = productoSeleccionado.slice(0,1).toUpperCase()
  productoSeleccionado = primerCaracter + productoSeleccionado.slice(1)
  
  console.log(productoSeleccionado);
  productoEncontrado = listaDisponibles.find(item => item.includes(productoSeleccionado))
 
  if(productoEncontrado) {
    let confirmarSeleccion = confirm('Usted ha seleccionado el producto ' + productoEncontrado + '\n Desea continuar con el pago ?')
    if(confirmarSeleccion) {
      return confirmarSeleccion
    } else {
      alert('El proceso de pago ha sido cancelado. Cierre el programa y vuelva a ejecutarlo')
      }
    } else {
      alert('El producto ingresado es inexistente o está fuera de stock')
      }
    } // fin else
  } // fin funcion
 
 //Extraigo los metodos de pago para mostrar en el prompt
 let metodosPagoDisponibles = metodosDePago.map(item => item.id + '. ' + item.metodo)
 console.log(metodosPagoDisponibles)
 
 
 function seleccionarMetodoPago() {
  let pagoSeleccionado = Number(prompt('Seleccione metodo de pago ingresando el número de opción correspondiente' + '\n\n' + metodosPagoDisponibles.join('\n')))
   while(pagoSeleccionado <= 0 || pagoSeleccionado > 3 || pagoSeleccionado === null) {
    pagoSeleccionado = Number(prompt('La opción seleccionada no corresponde a un método de pago. Vuelva a ingresar opción \n' + metodosPagoDisponibles.join('\n')))
  }
  return pagoSeleccionado;
 }
 
 
 function procesarCompra() {
  let confirmacionCompra = confirm('Desea procesar su compra?')
  if(confirmacionCompra) {
    alert('Felicidades por su compra del juego ' + productoEncontrado + '. Que lo disfrutes!!!')
  } else {
    alert('Proceso de compra abortado. Cierre el programa y vuelva a ejecutarlo')
  }
 }
 // Inicio flujo de la aplicacion
 iniciarSesion()
 usuarios.push({nombreUsuario,contrasena})
 console.log(usuarios)
 let a = seleccionarProducto()
 if(a) {
  seleccionarMetodoPago()
  procesarCompra()
 }
 
 
 
 