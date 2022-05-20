var jugando = false;
var palabrasSecretas = ['ALURA','HTML','CANVAS','ARRAY','LOOP','OBJETO','WEB','CONSOLE','PUSH','LENGTH','GITHUB','COMPUTADORA'];
const letras = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
var letrasErradas = [];
var letrasUsadas = [];
var palabraSecreta;
var pantallaInicio = document.querySelector("#inicio");
var pantallaAgregarPalabra = document.querySelector("#agregar-palabra");
var pantallaJuego = document.querySelector("#juego");
var palabraOculta = document.querySelector("#palabra-secreta");
var guiones = document.querySelector("#guiones");
var selectorDePalabra = document.querySelector("#palabra");


function elegirPalabraSecreta(){
    palabraSecreta = palabrasSecretas[Math.round(Math.random() * (palabrasSecretas.length - 1))];
    return palabraSecreta;
}

elegirPalabraSecreta();
console.log(palabraSecreta);


var errores = 0;
;

function juegoNuevo(){
    jugando = true;
    console.log("inicio de juego");
    elegirPalabraSecreta();
    for (let index = 0; index < palabraSecreta.length; index++) {
        const element = palabraSecreta[index];
        selectorDePalabra.innerHTML +=  generadorHTMLLetra('');
    }
        
}

function generadorHTMLLetra(letra){
    return `<div class="letra row"><span>${letra}</span><div></div></div>`;
}



// Array.from(palabraSecreta)

function adivinarLetra(inputLetra){
    let letraEncontrada = false;
    for (let index = 0; index < palabraSecreta.length; index++) {
        if(palabraSecreta[index] == inputLetra.toUpperCase()){
            document.getElementsByClassName("letra")[index].firstElementChild.innerText = palabraSecreta[index];
            letraEncontrada = true;
        }
    }
    return letraEncontrada;
}

document.addEventListener("keyup",function(event){
    if(!jugando && !/[a-zA-Z]/.test(event.key) && event.key != "Enter" && letrasUsadas.indexOf(event.key) >= 0){
        return false;
    }
    letrasUsadas.push(event.key)
    if (!adivinarLetra(event.key)){
        letrasErradas.toUpperCase.push(event.key);
        // dibujarLetraErrada(event.key)
        // dibujar
    }
    console.log(event.key);
});
