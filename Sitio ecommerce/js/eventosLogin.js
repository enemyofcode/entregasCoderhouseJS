/* Elementos pagina login */

const email = document.querySelector("#email");
const contrasena = document.querySelector("#contrasena");
const btnLogin = document.querySelector("#btn-login");
const menuNavegacion = document.querySelector('.nav-menu')
const linkRegistroNav = document.querySelector(".nav-menu li:nth-child(3) a")
let ingresoDatos = true;

const usuarioLogin = {
  email, contrasena
};

// Validación de campo requerido
const insertarValidacion = (campo) => {
  const validacion = document.createElement("div");
  validacion.classList.add("error");
  validacion.innerHTML = "Campo requerido";
  //quise hacerlo con un append pero me lo insertaba dentro del mismo input
  campo.insertAdjacentElement("afterend", validacion);
}

//Insertar elemento en la barra de navegación una vez logueado
const loginActivo = ()=> {
  const textoBienvenida = document.createElement('li');
  textoBienvenida.innerHTML = '<a style="color:yellow">Bienvenido usuario</a>'
  menuNavegacion.appendChild(textoBienvenida)
}

  btnLogin.addEventListener("click", (e) => {
    //Usando el operador ternario
    (email.value == "")
    ? (insertarValidacion(email), ingresoDatos = false, e.preventDefault())
    : usuarioLogin.email = email.value;

    //Usando el operador ternario
    (contrasena.value == "") 
    ? (insertarValidacion(contrasena), ingresoDatos = false, e.preventDefault()) 
    : usuarioLogin.contrasena = contrasena.value;


  //Valido que los datos ingresados en el form sean correctos para mandar info al localStorage
  if(ingresoDatos) {
    localStorage.setItem("emailUsuario", JSON.stringify(usuarioLogin.email));
    Toastify({
      text: "Login exitoso!",
      duration: 3000,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
    
    //Elimino el link de registro de la navegación una vez logueado
    linkRegistroNav.remove()
  
    //Inserto un nuevo item en la nav bar al loguearme
    loginActivo(); 
    e.preventDefault() 
  } // Cierre if
     console.log(localStorage.getItem('emailUsuario')) ;
}); // Cierre Listener click


/* Disclaimer: luego tendría que hacer un refactor para que la validación
me la muestre una sola vez y no me la duplique el evento click */ 

/* Disclaimer2: Tambien hacer una redireccion al home al loguearse correctamente */