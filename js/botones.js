var palabraIngresada = document.querySelector("textarea");

function agregar(palabraIngresada){
    if (!palabrasSecretas.includes(palabraIngresada.toUpperCase()) && palabraIngresada!=""){
        palabrasSecretas.push(palabraIngresada.toUpperCase());
    }
}

function mostrarInicio(){
    pantallaInicio.classList.remove("no-display");
    pantallaAgregarPalabra.classList.add("no-display");
    pantallaJuego.classList.add("no-display");
}

function mostrarAgregarPalabra(){
    pantallaInicio.classList.add("no-display");
    pantallaAgregarPalabra.classList.remove("no-display");
    pantallaJuego.classList.add("no-display");
}

function mostrarJugar(){
    pantallaInicio.classList.add("no-display");
    pantallaAgregarPalabra.classList.add("no-display");
    pantallaJuego.classList.remove("no-display");
}

var nuevoJuego = document.querySelector("#boton-iniciar-juego");
nuevoJuego.addEventListener("click",function(){
    mostrarJugar();
    juegoNuevo();
});

var agregarPalabra = document.querySelector("#boton-agregar-palabra");
agregarPalabra.addEventListener("click",function(){
    mostrarAgregarPalabra();
    palabraIngresada.value = "";
});

var guardarYEmpezar = document.querySelector("#boton-guardar-y-empezar");
guardarYEmpezar.addEventListener("click",function(){
    agregar(palabraIngresada.value);
    mostrarJugar();
    juegoNuevo();
});

var cancelar = document.querySelector("#boton-cancelar");
cancelar.addEventListener("click",function(){
    mostrarInicio();
});

// var nuevoJuego = document.querySelector("#boton-nuevo-juego");
// var letrasDeLaPalabra = document.querySelector("#palabra-secreta").innerHTML;
// var guiones = document.querySelector("#guiones");
// nuevoJuego.addEventListener("click",function(){
//     elegirPalabraSecreta();
    // window.location.reload("Refresh");
    // letrasDeLaPalabra.value =  letrasDePalabraSecreta.replaceAll("a","*");
    // guiones.value = letrasDePalabraSecreta.replaceAll(letras,"_");
    // letrasDeLaPalabra.value = palabraSecreta;
    // }
    
// });

var desistir = document.querySelector("#boton-desistir");
var imagenDerrota = document.querySelector("#imagen-derrota");
desistir.addEventListener("click",function(){
    imagenDerrota.classList.remove("no-display");
});

