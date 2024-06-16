// Simulacion de un sitio de Ecommerce de Juegos de mesa

//Simulacion de una pantalla de login

let nombreUsuario = prompt("Ingrese nombre de usuario").toLowerCase();
while (nombreUsuario === "" || nombreUsuario.length < 6) {
  nombreUsuario = prompt(
    "El nombre de usuario ingresado es invalido." +
      "\n Vuelva a ingresarlo nuevamente"
  );
}

let contrasena;
do {
  contrasena = prompt(
    "Ingrese su contrasena. Debe tener 6 caracteres como minimo"
  );
} while (contrasena === "" || contrasena.length < 6);

let iniciarSesion = confirm("Desea proceder con el inicio de sesion ?");
if (iniciarSesion === true) {
  alert("Bienvenido " + nombreUsuario);
} else {
  alert("Se ha cancelado el inicio de su sesion");
}

//Productos en Stock

let producto1 = "7 Wonders Duel";
let precioProducto1 = 66000;

let producto2 = "Catan";
let precioProducto2 = 80000;

let producto3 = "Splendor";
let precioProducto3 = 55000;

let producto4 = "Harmonies";
let precioProducto4 = 120000;

//Aca hice trampita con un array , pero no se me ocurrio otro escenario donde escribir un For
let valoresJuegos = [60000, 80000, 55000, 12000];
let totalStock = 0;
for (let i = 0; i < 4; i++) {
  totalStock += valoresJuegos[i];
}
console.log("El total del stock es de $" + totalStock);

// Declaracion de funciones

let solicitarMetodoPago = function () {
  let metodoPago = parseInt(prompt("Ingrese 1 para debito o 2 para credito"));
  while (metodoPago != 1 && metodoPago != 2) {
    alert("Metodo de pago invalido. Ingreselo nuevamente");
    metodoPago = parseInt(prompt("Ingrese 1 para debito o 2 para credito"));
  }
  console.log("Metodo de pago seleccionado " + metodoPago);
  return metodoPago;
};

let procesarCompra = function () {
  let confirmarCompra = confirm("Quiere procesar la compra ?");
  if (confirmarCompra === true) {
    alert("Su compra ha sido procesada exitosamente");
  } else {
    alert("La operacion ha sido cancelada");
  }
};

let validacionProducto = function (seleccionarProducto) {
  if (
    seleccionarProducto !== NaN &&
    seleccionarProducto > 0 &&
    seleccionarProducto <= 4
  ) {
    console.log("Producto seleccionado " + seleccionarProducto);
    solicitarMetodoPago();
    procesarCompra();
  }
};

// Fin declaracion de funciones

if (iniciarSesion === true) {
  let seleccionarProducto = parseInt(
    prompt(
      "Seleccione opcion del 1 a 4" +
        "\nNuestros productos disponibles son: \n" +
        "1. " +
        producto1 +
        " $" +
        precioProducto1 +
        "\n2. " +
        producto2 +
        " $" +
        precioProducto2 +
        "\n3." +
        producto3 +
        " $" +
        precioProducto3 +
        "\n4." +
        producto4 +
        " $" +
        precioProducto4
    )
  );
  switch (seleccionarProducto) {
    case 1:
      alert(
        "Has seleccionado el producto " +
          producto1 +
          " cuyo valor es de " +
          precioProducto1
      );
      break;

    case 2:
      alert(
        "Has seleccionado el producto " +
          producto2 +
          " cuyo valor es de " +
          precioProducto2
      );
      break;

    case 3:
      alert(
        "Has seleccionado el producto " +
          producto3 +
          " cuyo valor es de " +
          precioProducto3
      );
      break;

    case 4:
      alert(
        "Has seleccionado el producto " +
          producto4 +
          " cuyo valor es de " +
          precioProducto4
      );
      break;
    default:
      alert(
        "El producto ingresado es inexistente. La operacion ha sido abortada"
      );
  } // fin del switch

  validacionProducto(seleccionarProducto);
}
