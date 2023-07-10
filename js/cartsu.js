const mensajesPartida = document.getElementById('resultado');
const ataques = ["Fuego", "Agua", "Hielo"];
const sectionMensajes = document.getElementById('mensajes');

const sectionBaraja = document.getElementById('seleccionar-baraja');

const sectionCarta = document.getElementById('seleccionar-carta');
const sectionReiniciar = document.getElementById('reiniciar-juego');
const botonBaraja = document.getElementById('boton-baraja');
const botonAtacar = document.getElementById('boton-atacar');
const botonReiniciar = document.getElementById('boton-reiniciar');

const contenedorCartas = document.getElementById('seleccionar-ataque');

let opcionDeCartas;
let vidasEnemigo = 3;
let vidasJugador = 3;
let partidaTerminada = false;
let cartaEnemigo;

class cartaAtaque {
    constructor(cantidad, foto, tipo, ataque, gana) {
        this.cantidad = cantidad
        this.foto = foto
        this.tipo = tipo
        this.ataque = ataque
        this.gana = gana //Se debe indicar a qué cartas puede vencer la nueva carta que se cree
    }
}
cartaFuego = new cartaAtaque(0, 'images/fuego.png', 'Fuego', 'ataque-fuego', ['Hielo']);
cartaAgua = new cartaAtaque(0, 'images/agua.png', 'Agua', 'ataque-agua', ['Fuego', 'Tierra']);
cartaHielo = new cartaAtaque(0, 'images/hielo.png', 'Hielo', 'ataque-hielo', ['Agua']);
cartaTierra = new cartaAtaque(0, 'images/tierra.png', 'Tierra', 'ataque-tierra', ['Fuego']);
cartaAire = new cartaAtaque(0, 'images/aire.png', 'Aire', 'ataque-aire', ['Fuego', 'Agua']);


let arregloCartas = [cartaFuego, cartaAgua, cartaHielo, cartaTierra];

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
    barajaCreada = true;
    let max = 4;
    let min = 2;
    do {
        arregloCartas.forEach(function(carta) {
            carta.cantidad = Math.floor(Math.random() * (max - min + 1) + min);
        });
    } while (sumarCartas() != 11);
    arregloCartas.forEach(carta => console.log("tienes " + carta.cantidad + " de " + carta.tipo));
    actualizarVidas();
    actualizarCartas();
    sectionCarta.style.display = 'block';
    sectionBaraja.style.display = 'none';
}

function sumarCartas() { //Función que suma la cantidad de cartas en total sumando todos los elementos
    let total = 0;
    arregloCartas.forEach(function(carta) {
        total = carta.cantidad + total;
    });
    return (total);
}

function batalla() {
    let resultado;
    if (partidaTerminada == true) {
        alert('La partida terminó. Reinicia para volver a intentar');
    } else {
        arregloCartas.forEach((carta) => { //Recorre el arreglo cartas asignando cada objeto carta a la variable carta
            let ataqueJugador = document.getElementById(carta.ataque); //Accede al doc para asignar 
            if (ataqueJugador.checked) {
                if (carta.cantidad > 0) {
                    carta.cantidad -= 1;
                    actualizarCartas();
                    ataqueEnemigo();
                    if (carta.tipo == arregloCartas[cartaEnemigo].tipo) {
                        console.log('Empate');
                        resultado = 'Empate';
                    } else {
                        carta.gana.forEach((pierde) => {
                            if (arregloCartas[cartaEnemigo].tipo == pierde) {
                                resultado = 'Ganaste';
                                vidasEnemigo -= 1;
                            } else {
                                vidasJugador -= 1;
                                resultado = 'Perdiste';
                            }

                        });
                    }
                    if (vidasEnemigo == 0 || vidasJugador == 0) {
                        partidaTerminada = true;
                        sectionReiniciar.style.display = 'block';
                    }
                    crearMensaje(carta.tipo, arregloCartas[cartaEnemigo].tipo, resultado);
                    actualizarVidas();
                } else {
                    alert('no te quedan más cartas de ' + carta.tipo);
                }
            }
        });
    }

}

function ataqueEnemigo() {
    let max = arregloCartas.length - 1;
    const min = 0;
    cartaEnemigo = Math.floor(Math.random() * (max - min + 1) + min);
}

function actualizarCartas() {
    contenedorCartas.innerHTML = ``;
    arregloCartas.forEach((carta) => {
        opcionDeCartas = `
        <div class="carta">
            <input id=${carta.ataque} class="input-ataque" type="radio" name="ataques" />
            <label for=${carta.ataque} class="select-ataque">
                <img src=${carta.foto} alt=${carta.tipo}>
                <h2>${carta.cantidad}</h2>
            </label>
        </div>
        `
        contenedorCartas.innerHTML += opcionDeCartas;
    });
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

function crearMensaje(ataqueJugador, ataqueEnemigo, resultado) {
    mensajesPartida.innerHTML = "Atacaste con " + ataqueJugador + " y el enemigo atacó con " + ataqueEnemigo + ": " + resultado
    sectionMensajes.appendChild(mensajesPartida);
    if (partidaTerminada) {
        mensajesPartida.innerHTML = "La partida terminó " + resultado + "!!"
    }
}
window.addEventListener('load', iniciarJuego);