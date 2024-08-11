/* Elementos pagina registro */

const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const contrasena = document.querySelector("#contrasena");
const repetirContrasena = document.querySelector("#repetir-contrasena");
const email = document.querySelector("#email");
const telefono = document.querySelector("#telefono");
const btnEnviar = document.querySelector("#btn-registro");

const registroUsuario = { nombre, apellido, email, telefono };

const eliminarMensajesError = () => {
  const errores = document.querySelectorAll('.error');
  errores.forEach(error => error.remove());
};

const validacionNombreApellido = (dato, selector) => {
  if (dato.length == 0 || dato.length <= 3) {
    const contenedorMsjError = document.createElement('span');
    contenedorMsjError.classList.add('error');
    contenedorMsjError.innerHTML = 'La longitud del campo debe ser mayor a 3 caracteres';
    selector.insertAdjacentElement("afterend", contenedorMsjError);
    return false;
  } else {
    return true;
  }
};

const validacionLongitudContrasenas = (dato, selector) => {
  if (dato.length < 6) {
    const contenedorMsjError = document.createElement('span');
    contenedorMsjError.classList.add('error');
    contenedorMsjError.innerHTML = 'La longitud del campo debe ser mayor a 6 caracteres';
    selector.insertAdjacentElement('afterend', contenedorMsjError);
    return false;
  } else {
    return true;
  }
};

const validacionEmail = (dato, selector) => {
  if (!dato.includes('.com')) {
    const contenedorMsjError = document.createElement('span');
    contenedorMsjError.classList.add('error');
    contenedorMsjError.innerHTML = 'El email debe contener el dominio .com';
    selector.insertAdjacentElement('afterend', contenedorMsjError);
    return false;
  } else {
    return true;
  }
};

const validacionTelefono = (dato,selector)=> {
  if(dato.length != 10) {
    const contenedorMsjError = document.createElement('span');
    contenedorMsjError.classList.add('error');
    contenedorMsjError.innerHTML = 'El telefono debe contener 10 caracteres';
    selector.insertAdjacentElement('afterend', contenedorMsjError);
    return false;
  } else {
    return true;
  }
}

const validacionMatcheoContrasenas = (datoContrasena,datoRepetir,selector) => {
  if(datoContrasena!=datoRepetir) {
    const contenedorMsjError = document.createElement('span');
    contenedorMsjError.classList.add('error');
    contenedorMsjError.innerHTML = 'Las contraseñas no coinciden';
    selector.insertAdjacentElement('afterend', contenedorMsjError);
    return false;
  } else {
    return true;
  }
}

btnEnviar.addEventListener('click', (e) => {
  e.preventDefault();
  eliminarMensajesError(); // Elimino mensajes de error anteriores

  let esValido = true;

  esValido &= validacionNombreApellido(nombre.value, nombre);
  esValido &= validacionNombreApellido(apellido.value, apellido);
  esValido &= validacionLongitudContrasenas(contrasena.value, contrasena);
  esValido &= validacionLongitudContrasenas(repetirContrasena.value, repetirContrasena);
  esValido &= validacionEmail(email.value, email);
  esValido &= validacionTelefono(telefono.value,telefono)
  esValido &= validacionMatcheoContrasenas(contrasena.value,repetirContrasena.value,repetirContrasena)

  if (esValido) {
    // Actualizo el objeto registroUsuario con los valores ingresados en el form
    registroUsuario.nombre = nombre.value;
    registroUsuario.apellido = apellido.value;
    registroUsuario.email = email.value;
    registroUsuario.telefono = telefono.value;
    localStorage.setItem('usuario', JSON.stringify(registroUsuario))
  
    // Muestro mensaje de éxito con SweetAlert
    Swal.fire({
      title: '¡Registro Exitoso!',
      text: 'Tu cuenta ha sido creada con éxito. Ahora puedes disfrutar de todas nuestras funcionalidades y servicios.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("El usuario presionó OK");
        window.location.href = "../paginas/index.html"; // Redirijo a la página principal
      }
    });
  }
});
