/* Elementos pagina registro */

const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const contrasena = document.querySelector("#contrasena");
const repetirContrasena = document.querySelector("#repetir-contrasena");
const email = document.querySelector("#email");
const telefono = document.querySelector("#telefono");
const btnEnviar = document.querySelector("#btn-registro");
let ingresoDatos = true;
const registroUsuario = {nombre, apellido,email,telefono}


// Validación de campo requerido
const insertarValidacion = (campo) => {
  const validacion = document.createElement("div");
  validacion.classList.add("error");
  validacion.innerHTML = "Campo requerido";
  //quise hacerlo con un append pero me lo insertaba dentro del mismo input
  campo.insertAdjacentElement("afterend", validacion);
}

btnEnviar.addEventListener("click", (e) => {
  //Aca no aplique ternario porque iba a ser un bardo
  if (nombre.value == "") {
    insertarValidacion(nombre);
    e.preventDefault();
    ingresoDatos = false;
  } else if (nombre.value.length < 4) {
    const validacionCaracteres = document.createElement("div");
    validacionCaracteres.classList.add("error");
    validacionCaracteres.innerHTML =
      "La longitud del campo debe ser mayor a 4 caracteres";
    nombre.insertAdjacentElement("afterend", validacionCaracteres);
    ingresoDatos = false;
    e.preventDefault();
  } else registroUsuario.nombre = nombre.value;

  
  //Ternario
  (apellido.value == "")
  ? (insertarValidacion(apellido), ingresoDatos = false, e.preventDefault())
  : registroUsuario.apellido = apellido.value;

  if (contrasena.value == "" || contrasena.value.length < 6) {
    const validacion = document.createElement("div");
    validacion.classList.add("error");
    //Cambie el texto de la validacion , por eso no uso la funcion
    validacion.innerHTML = "Campo requerido o caracteres insuficientes";
    contrasena.insertAdjacentElement("afterend", validacion);
    ingresoDatos = false;
    e.preventDefault();
  }

  if (repetirContrasena.value == "" || contrasena.value != repetirContrasena.value) {
    const validacion = document.createElement("div");
    validacion.classList.add("error");
    validacion.innerHTML =
      "Campo requerido o no coincide con el campo contrasena";
    repetirContrasena.insertAdjacentElement("afterend", validacion);
    ingresoDatos = false;
    e.preventDefault();
  }

  if (email.value == "" || !email.value.includes("@")) {
    const validacion = document.createElement("div");
    validacion.classList.add("error");
    validacion.innerHTML = "Campo requerido o email inválido";
    email.insertAdjacentElement("afterend", validacion);
    ingresoDatos = false;
    e.preventDefault();
  } else registroUsuario.email = email.value;

  //Ternario
  (telefono.value == "") ?
    (insertarValidacion(telefono),ingresoDatos = false, e.preventDefault())
    : registroUsuario.telefono = telefono.value
  
  
  //Valido que los datos ingresados en el form sean correctos para mandar info al localStorage
  if(ingresoDatos) {
    e.preventDefault()
    localStorage.setItem('usuarioRegistro', JSON.stringify(registroUsuario))
    Swal.fire({
      title: '¡Registro Exitoso!',
      text: 'Tu cuenta ha sido creada con éxito. Ahora puedes disfrutar de todas nuestras funcionalidades y servicios.',
      icon: 'success',
      confirmButtonText: 'OK' }).then((result) => {
        if (result.isConfirmed) {
          console.log("El usuario presionó OK");
          window.location.href = "../paginas/index.html"; 
        }
    });
  }

  }); // Cierre Listener del botón de registro

  console.log(localStorage.getItem('usuarioRegistro'))
  
  /* Disclaimer: luego tendría que hacer un refactor para que la validación
me la muestre una sola vez y no me la duplique el evento */ 