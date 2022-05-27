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
    "BUCLE",
    "SCRIPT",
    "CLASS",
    "KEY",
    "JSON",
    "IMAGEN",
    "DEL",
    "ADD",
    "SPRINT",
    "SWITCH",
    "MODAL",
    "FUNCTION",
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
var fraseFelicitacion;
var fraseDerrota;

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
    localStorageToPalabrasSecretas();

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
        !/[a-zA-Z\u00F1\u00D1]/.test(tecla) ||
        tecla.length > 1 ||
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
            fraseDerrota;
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
    elegirMensajeDerrota();
    const mensajeModalPerdedor = document
        .getElementById("modal")
        .getElementsByClassName("modal-body")[0]
        .getElementsByTagName("p")[0];
    mensajeModalPerdedor.innerHTML =
        fraseDerrota + "<br>LA PALABRA ERA <b>" + palabraSecreta + "</b>";
    myModal.show();
}

function mostrarGanador() {
    elegirFelicitacion();
    const mensajeModalGanador = document
        .getElementById("modal-ganaste")
        .getElementsByClassName("modal-body")[0]
        .getElementsByTagName("p")[0];
    mensajeModalGanador.innerHTML =
        fraseFelicitacion + "<br> LA PALABRA ERA <b>" + palabraSecreta + "</b>";
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

function elegirFelicitacion() {
    let frasesDeFelicitacion = [
        "¡¡¡EXCELENTE TRABAJO!!!",
        "¡¡¡LO HICISTE MUY BIEN!!!",
        "¡¡¡SOS INCREIBLE!!!",
        "¡¡¡SOS BRILLANTE!!!",
        "¡¡¡MUY BUEN TRABAJO!!!",
        "¡¡¡SOS SORPRENDENTE!!!",
        "¡¡¡INCREIBLE!!!",
    ];
    fraseFelicitacion =
        frasesDeFelicitacion[Math.round(Math.random() * (frasesDeFelicitacion.length - 1))];
    return fraseFelicitacion;
}

function elegirMensajeDerrota() {
    let frasesDeDerrota = [
        "LA PRÓXIMA TENDRÁS MÁS SUERTE",
        "SEGUÍ INTENTÁNDOLO",
        "NO BAJES LOS BRAZOS",
        "ESTA ERA MUY DIFICIL",
        "INTENTÁ EMPEZAR CON VOCALES",
        "PERSISTE Y LO LOGRARÁS",
        "MÁS SUERTE PARA LA PRÓXIMA",
    ];
    fraseDerrota = frasesDeDerrota[Math.round(Math.random() * (frasesDeDerrota.length - 1))];
    return fraseDerrota;
}

function localStorageToPalabrasSecretas(){
    for (let key = 0;  key < localStorage.length; key++) {
        const element = localStorage[key].toUpperCase();
        if(!palabrasSecretas.includes(element)) {
            palabrasSecretas.push(element);
        }
    }
}