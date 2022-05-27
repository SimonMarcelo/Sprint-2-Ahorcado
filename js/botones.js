var palabraIngresada = document.querySelector(".input-text");
function ocultarPantallas() {
    pantallaInicio.classList.add("no-display");
    pantallaAgregarPalabra.classList.add("no-display");
    pantallaJuego.classList.add("no-display");
}

function agregar(palabraIngresada) {
    if (palabraIngresada != "" && /[a-zA-Z\u00F1\u00D1]/.test(palabraIngresada)) {
        localStorage.setItem(localStorage.length,palabraIngresada.toUpperCase());
    }
    else{
        alert("La palabra ingresada no debe:\n- Contener números\n- Estar vacía\n");
    }
}

function mostrarInicio() {
    ocultarPantallas();
    pantallaInicio.classList.remove("no-display");
}

function mostrarAgregarPalabra() {
    ocultarPantallas();
    pantallaAgregarPalabra.classList.remove("no-display");
}

function mostrarJugar() {
    ocultarPantallas();
    pantallaJuego.classList.remove("no-display");
}

var nuevoJuego = document.querySelector("#boton-iniciar-juego");
nuevoJuego.addEventListener("click", function () {
    mostrarJugar();
    juegoNuevo();
});

var agregarPalabra = document.querySelector("#boton-agregar-palabra");
agregarPalabra.addEventListener("click", function () {
    mostrarAgregarPalabra();
    palabraIngresada.value = "";
});

var guardarYEmpezar = document.querySelector("#boton-guardar-y-empezar");
guardarYEmpezar.addEventListener("click", function () {
    agregar(palabraIngresada.value);
    mostrarJugar();
    juegoNuevo();
});

var cancelar = document.querySelector("#boton-cancelar");
cancelar.addEventListener("click", function () {
    mostrarInicio();
});

var nuevoJuego = document.querySelector("#boton-nuevo-juego");
nuevoJuego.addEventListener("click", function () {
    mostrarJugar();
    juegoNuevo();
});

var desistir = document.querySelector("#boton-desistir");
var imagenDerrota = document.querySelector("#imagen-derrota");
desistir.addEventListener("click", function () {
    mostrarPerdedor();
});


