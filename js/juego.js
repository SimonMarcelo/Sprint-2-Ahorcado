var jugando = false;
var palabrasSecretas = [
    "ALURA",
    "HTML",
    "CANVAS",
    "ARRAY",
    "LOOP",
    "OBJETO",
    "WEB",
    "CONSOLE",
    "PUSH",
    "LENGTH",
    "GITHUB",
    "ORACLE",
];
var myModal = new bootstrap.Modal(document.getElementById("modal"), {});
var myModal2 = new bootstrap.Modal(document.getElementById("modal-ganaste"), {});
var letrasEquivocadas = [];
var letrasUsadas = [];
var palabraSecreta;
const cantidadDeErrores = 9;
var pantallaInicio = document.querySelector("#inicio");
var pantallaAgregarPalabra = document.querySelector("#agregar-palabra");
var pantallaJuego = document.querySelector("#juego");
var palabraOculta = document.querySelector("#palabra-secreta");
var selectorDePalabra = document.querySelector("#palabra");

var palabraSecretaArray = [];

function elegirPalabraSecreta() {
    palabraSecreta = palabrasSecretas[Math.round(Math.random() * (palabrasSecretas.length - 1))];

    return palabraSecreta;
}

function juegoNuevo() {
    estadoInicial();
    elegirPalabraSecreta();
    for (let index = 0; index < palabraSecreta.length; index++) {
        const element = palabraSecreta[index];
        palabraSecretaArray.push({ letra: element, estado: false });
        selectorDePalabra.innerHTML += generadorHTMLLetra("");
    }
}

function generadorHTMLLetra(letra) {
    return `<div class="letra row"><span>${letra}</span><div></div></div>`;
}

function adivinarLetra(inputLetra) {
    let letraEncontrada = false;
    for (let index = 0; index < palabraSecreta.length; index++) {
        if (palabraSecreta[index] == inputLetra.toUpperCase()) {
            document.getElementsByClassName("letra")[index].firstElementChild.innerText =
                palabraSecreta[index];
            letraEncontrada = true;
            palabraSecretaArray[index]["estado"] = true;
        }
    }
    return letraEncontrada;
}

document.addEventListener("hidden.bs.modal", function (event) {
    juegoNuevo();
    mostrarJugar();
});

document.addEventListener("keyup", function (event) {
    let tecla = event.key;
    if (
        !jugando ||
        !/[a-zA-Z]/.test(tecla) ||
        tecla == "Enter" ||
        letrasUsadas.indexOf(tecla) >= 0
    ) {
        return false;
    }
    letrasUsadas.push(tecla);
    let adivinaLetra = adivinarLetra(tecla);
    if (!adivinaLetra && letrasEquivocadas.indexOf(tecla) < 0) {
        letrasEquivocadas.push(tecla);
        imprimirArrayayEnH1();
        mostrarParte(letrasEquivocadas.length - 1);
        if (revisarSiPerdio()) {
            mostrarPerdedor();
        }
    } else if (adivinaLetra && revisarSiGano()) {
        mostrarGanador();
    }
});

function imprimirArrayayEnH1() {
    let erradas = document.querySelector("#letras-erradas");
    var span = document.createElement("span");
    span.appendChild(document.createTextNode(letrasEquivocadas[letrasEquivocadas.length - 1]));
    span.setAttribute("class", "ps-3");
    erradas.appendChild(span);
}

function revisarSiGano() {
    let resultado = palabraSecretaArray.filter((letra) => letra.estado == false);
    return resultado.length == 0;
}

function revisarSiPerdio() {
    return letrasEquivocadas.length > cantidadDeErrores;
}

function mostrarParte(parte) {
    let dibujo = document.querySelector("svg").children[parte];
    dibujo.classList.remove("no-display");
}

function ocultarDibujo() {
    let dibujo = document.querySelector("svg").children;
    // dibujo.classList.add("no-display");
    for (let index = 0; index < dibujo.length; index++) {
        const element = dibujo[index];
        element.classList.add("no-display");
    }
}

function mostrarPerdedor() {
    const mensajeModalPerdedor = document
        .getElementById("modal")
        .getElementsByClassName("modal-body")[0]
        .getElementsByTagName("p")[0];
    mensajeModalPerdedor.innerHTML = "LA PALABRA ERA " + palabraSecreta;
    myModal.show();
}

function mostrarGanador() {
    const mensajeModalGanador = document
        .getElementById("modal-ganaste")
        .getElementsByClassName("modal-body")[0]
        .getElementsByTagName("p")[0];
    mensajeModalGanador.innerHTML = "¡¡¡HICISTE UN EXCELENTE TRABAJO!!! <br> LA PALABRA ERA <b>" + palabraSecreta + "</b>";
    myModal2.show();
}

function estadoInicial() {
    let erradas = document.querySelector("#letras-erradas");
    erradas.innerHTML = "";
    jugando = true;
    selectorDePalabra.innerHTML = "";
    letrasUsadas = [];
    letrasEquivocadas = [];
    palabraSecretaArray = [];
    ocultarDibujo();
}
