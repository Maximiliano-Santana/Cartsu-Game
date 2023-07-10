const parrafo = document.getElementById('resultado');
const ataques = ["Fuego", "Agua", "Hielo"];
const sectionMensajes = document.getElementById('mensajes');

const ataqueFuego = document.getElementById('boton-fuego');
const ataqueHielo = document.getElementById('boton-hielo');
const ataqueAgua = document.getElementById('boton-agua');

const sectionBaraja = document.getElementById('seleccionar-baraja');

const sectionCarta = document.getElementById('seleccionar-carta');
const sectionReiniciar = document.getElementById('reiniciar-juego');
const botonBaraja = document.getElementById('boton-baraja');
const botonAtacar = document.getElementById('boton-atacar');
const botonReiniciar = document.getElementById('boton-reiniciar');

let baraja = [0, 0, 0];
let vidasEnemigo = 3;
let vidasJugador = 3;
let barajaCreada = false;
let partidaTerminada = false;
let cartaEnemigo;
let cartaJugador;
let resultadosCadena = ["Perdiste", "Ganaste", "Empate"];
let resultado = 0;

class cartaAtaque {
    constructor(cantidad, foto, tipo) {
        this.cantidad = cantidad
        this.foto = foto
        this.tipo = tipo
    }
}

cartaFuego = new cartaAtaque(0, 'images/fuego.png', 'Fuego');
console.log(cartaFuego);

cartaAgua = new cartaAtaque(0, 'images/Agua.png', 'Agua')

function iniciarJuego() {
    //let nombreJugador = prompt("Escribe tu nombre");
    //alert("Bienvenido a Cartsu. " + "Buena suerte " + nombreJugador);
    botonBaraja.addEventListener('click', crearBaraja);
    botonAtacar.addEventListener('click', batalla);
    botonReiniciar.addEventListener('click', reiniciarPartida);
    sectionReiniciar.style.display = 'none';
    sectionCarta.style.display = 'none';
}



function crearBaraja() {
    if (baraja[0] == 0 && baraja[1] == 0 && baraja[2] == 0 && !partidaTerminada) { //Se comprueba que la partida no esté iniciada y haya terminado
        barajaCreada = true;
        let max = 3;
        let min = 1;
        do { // Se inicia un ciclo para randomizar la cantidad de cartas de cada tipo
            baraja[0] = Math.floor(Math.random() * (max - min + 1) + min);
            baraja[1] = Math.floor(Math.random() * (max - min + 1) + min);
            baraja[2] = Math.floor(Math.random() * (max - min + 1) + min);

        } while (!((baraja[0] + baraja[1] + baraja[2]) == 7)) // Se termina el ciclo cuando el total de cartas es 7 y todas hayan sido aleatorias
        alert("Tu baraja es: 🔥=" + baraja[0] + " | 💧=" + baraja[1] + " | ❄=" + baraja[2]); //Muestra un alert con las cartas que se tienen 
        cartaFuego.cantidad = baraja[0]; 
        actualizarCartas();
        actualizarVidas();
    } else {
        alert("primero reinicia la partida") // Em caso de que la partida haya terminado y se intente elegir más cartas se mostrará esta alerta, la cual ya quedó obsoleta pues la aplicación va actualizando lo que se quiere mostrar
    }
    sectionCarta.style.display = 'block';
    sectionBaraja.style.display = 'none';
}

function batalla() {
    if (barajaCreada && !partidaTerminada) {
        ataqueJugador(); // Aquí el jugador selecciona un ataque y el enemigo responde con otro ataque trayendo las cartas
        /*
        0 = fuego
        1 = agua
        2 = hielo
        */
        if (cartaJugador == cartaEnemigo) {
            resultado = 2;
        } else if (cartaJugador == 0 && cartaEnemigo == 2 || cartaJugador == 1 && cartaEnemigo == 0 || cartaJugador == 2 && cartaEnemigo == 1) {
            vidasEnemigo = vidasEnemigo - 1
            resultado = 1;
            actualizarVidas();
        } else {
            vidasJugador = vidasJugador - 1
            resultado = 0;
            actualizarVidas();
        }
        if (vidasEnemigo <= 0 || vidasJugador <= 0 || baraja[0] == 0 && baraja[1] == 0 && baraja[2] == 0) {
            partidaTerminada = true;
            sectionReiniciar.style.display = 'block';
            if (vidasEnemigo == 0 || vidasJugador > vidasEnemigo) {
                //alert("Felicidades, ganaste la partida");
                resultado = 1;
            } else if (vidasJugador == 0) {
                //alert("Perdiste la partida")
                resultado = 0;
            } else if (vidasEnemigo == vidasJugador) {
                //alert("La partida quedó empatada")
                resultado = 2;
            }
        }
        crearMensaje();
    } else if (barajaCreada == false) {
        alert("primero elige una baraja");
    } else if (partidaTerminada) {
        alert("La partida terminó, puedes reiniciarla si queires volver a jugar")
    }
}

function ataqueJugador() {
    if (ataqueFuego.checked) {
        if (baraja[0] > 0) {
            baraja[0] = baraja[0] - 1;
            cartaJugador = 0;
            actualizarCartas();
            ataqueEnemigo();
        } else {
            alert("No tienes cartas de fuego");
        }
    } else if (ataqueAgua.checked) {
        if (baraja[1] > 0) {

            baraja[1] = baraja[1] - 1;
            cartaJugador = 1;
            actualizarCartas();
            ataqueEnemigo();
        } else {
            alert("No tienes cartas de agua");
        }
    } else if (ataqueHielo.checked) {
        if (baraja[2] > 0) {

            baraja[2] = baraja[2] - 1;
            cartaJugador = 2;
            actualizarCartas();
            ataqueEnemigo();
        } else {
            alert("No tienes cartas de hielo");
        }
    } else {
        alert("Selcciona una carta");
    }
}

function ataqueEnemigo() {
    let min = 0;
    let max = 2;
    cartaEnemigo = Math.floor(Math.random() * (max - min + 1) + min);
}

function actualizarCartas() {
    document.getElementById("cartas-fuego").innerHTML = baraja[0];
    document.getElementById("cartas-agua").innerHTML = baraja[1];
    document.getElementById("cartas-hielo").innerHTML = baraja[2];
}

function actualizarVidas() {
    if (vidasJugador == 3) {
        document.getElementById("vidas-jugador").innerHTML = "❤️❤️❤️";
    } else if (vidasJugador == 2) {
        document.getElementById("vidas-jugador").innerHTML = "❤️❤️";
    } else if (vidasJugador == 1) {
        document.getElementById("vidas-jugador").innerHTML = "❤️";
    } else {
        document.getElementById("vidas-jugador").innerHTML = "❌";
    }
    if (vidasEnemigo == 3) {
        document.getElementById("vidas-enemigo").innerHTML = "❤️❤️❤️";
    } else if (vidasEnemigo == 2) {
        document.getElementById("vidas-enemigo").innerHTML = "❤️❤️";
    } else if (vidasEnemigo == 1) {
        document.getElementById("vidas-enemigo").innerHTML = "❤️";
    } else {
        document.getElementById("vidas-enemigo").innerHTML = "❌";
    }
}

function reiniciarPartida() {
    location.reload();
}

function crearMensaje() {
    parrafo.innerHTML = "Atacaste con " + ataques[cartaJugador] + " y el enemigo atacó con " + ataques[cartaEnemigo] + ": " + resultadosCadena[resultado]
    sectionMensajes.appendChild(parrafo);
    if (partidaTerminada) {
        parrafo.innerHTML = "La partida terminó " + resultadosCadena[resultado] + "!!"
    }
}
window.addEventListener('load', iniciarJuego);