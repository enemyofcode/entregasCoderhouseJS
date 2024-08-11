/* Elementos pagina login */

const email = document.querySelector("#email");
const contrasena = document.querySelector("#contrasena");
const btnLogin = document.querySelector("#btn-login");
const menuNavegacion = document.querySelector('.nav-menu');
const linkRegistroNav = document.querySelector(".nav-menu li:nth-child(3) a");
let ingresoDatos = true;

const usuarioLogin = {
  email: email.value,
  contrasena: contrasena.value
};

const eliminarMensajesError = () => {
  const errores = document.querySelectorAll('.error');
  errores.forEach(error => error.remove());
};

const validacionEmail = (dato, selector) => {
  if (!dato.includes('.com')) {
    const contenedorMsjError = document.createElement('span');
    contenedorMsjError.classList.add('error');
    contenedorMsjError.innerHTML = 'El email debe contener el dominio .com';
    selector.insertAdjacentElement('afterend', contenedorMsjError);
    return false;
  }
  return true;
};

const validacionCampoVacio = (dato, selector) => {
  if (dato.length === 0) {
    const contenedorMsjError = document.createElement('span');
    contenedorMsjError.classList.add('error');
    contenedorMsjError.innerHTML = 'Campo requerido';
    selector.insertAdjacentElement('afterend', contenedorMsjError);
    return false;
  }
  return true;
};

let local = JSON.parse(localStorage.getItem('usuario'));

const validacionEmailRegistrado = (dato, selector) => {
  if (dato !== local.email) {
    Toastify({
      text: "El email ingresado no pertenece a un usuario registrado",
      duration: 3000,
      position: "right",
      gravity: "bottom",
      style: {
        background: "linear-gradient(to right, #ff5f15, #96c93d)",
      },
    }).showToast();
    return false;
  } else {
    return true;
  }
};

btnLogin.addEventListener('click', (e) => {
  e.preventDefault();
  eliminarMensajesError();
  
  if (
    validacionCampoVacio(email.value, email) &&
    validacionCampoVacio(contrasena.value, contrasena) &&
    validacionEmail(email.value, email) &&
    validacionEmailRegistrado(email.value, email)
  ) {
    Toastify({
      text: "Login exitoso!",
      duration: 3000,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  }
});
