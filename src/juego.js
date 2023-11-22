import { randomJumper, JUMPER_UP, JUMPER_DOWN } from './lib/jumpers_randomizer';
import { ponerleDigitos, insertAfter } from './utilidades';
import JUMPERS_DATA from './lib/jumpers_data';
import { start, stop } from './lib/loop';


let puntuacion = 0;
let score = document.getElementById('score');
let crash = document.getElementsByClassName('crash');
let jumpers = document.getElementsByClassName('jumper');
let bomberos = document.getElementsByClassName('firemen');

let nodo = score;
let partida = false;
let posicionBombero = 0;

const POSICION_AMBULANCIA = 22;
const POSICION_JUMPER_BOMBERO1 = 5;
const POSICION_JUMPER_BOMBERO2 = 13;
const POSICION_JUMPER_BOMBERO3 = 19;

//contador
let contadorTicks = 0;
let muñecos = [];

function crearMuñeco(top, left, order, existingNode) {
  let div = document.createElement("div");
  div.className = "jumper";
  div.style.top = `${top}%`;
  div.style.left = `${left}%`;
  div.style.backgroundImage = `url('sprites/rescued_man-${ponerleDigitos(order)}.png')`;
  insertAfter(div, existingNode);
  return div;

}
function crearMuñecos() {

  for (let i = 0; i < JUMPERS_DATA.length; i++) {
    nodo = crearMuñeco(JUMPERS_DATA[i].top, JUMPERS_DATA[i].left, i + 1, nodo);
  }

}

function esconderMuñecos() {
  for (let i = 0; i < jumpers.length; i++) {
    jumpers[i].classList.remove('active');
  }
}
function comprobarCrashPorJumper(posicionJumper, posicionBomberoCorrecta, maximoPosicionJumper, posicionCrash) {
  //si esta a punto de caerse y el bombero no esta debajo aparece el crash
  if (muñecos[posicionJumper] == maximoPosicionJumper && posicionBombero != posicionBomberoCorrecta) {
    crash[posicionCrash].classList.add('active');

    esconderMuñecos();
    stop();
    partida = false;
  }
}

function comprobarSiHaLLegadoAlaAmbulancia(posicionJumper) {
  //posicionAmbulancia = cuando el jumper llega a la ambulancia
  if (muñecos[posicionJumper] == POSICION_AMBULANCIA) {//compruba si ha llegado a la ambulancia
    puntuacion = puntuacion + 1;
    score.textContent = puntuacion;
    //borra el muñeco de la pantalla xk ha llegado a la ultima posicion del juego
    muñecos.splice(posicionJumper, 1);

  }

}

function comprobarCrash() {
  for (let i = 0; i < muñecos.length; i++) {

    //parametros comprobar ceash jumper
    /* i = posicion del jumper
        posicionBomberoCorrecta = en k posicion debe estar el bombero para coger al jumper
        maximoPosicionJumper = limite en el k si el bombero no  debajo de el se cae
        posicionCrash = el crash k se activa si se cae */
    comprobarCrashPorJumper(i, 0, POSICION_JUMPER_BOMBERO1, 0);
    comprobarCrashPorJumper(i, 1, POSICION_JUMPER_BOMBERO2, 1);
    comprobarCrashPorJumper(i, 2, POSICION_JUMPER_BOMBERO3, 2);
    comprobarSiHaLLegadoAlaAmbulancia(i);
  }

}

function comprobarSiHayQueAñadirJumperNuevo() {
  // hay k comprobar si hay k añadir un jumper nuevo
  let resultado = randomJumper(contadorTicks);
  if (resultado == JUMPER_UP) {
    muñecos.push(0);
  } else if (resultado == JUMPER_DOWN) {
    muñecos.push(1);
  }
}
function hacerMovimientoJumpers() {
  for (let i = 0; i < muñecos.length; i++) {
    jumpers[muñecos[i]].classList.add('active')
    contadorTicks++;
    if (muñecos[i] == 0) {
      muñecos[i] = 2;
    } else if (muñecos[i] == 1) {
      muñecos[i] = 3;

    } else {
      muñecos[i] = muñecos[i] + 1;

    }
  }
}
function tick() {
  comprobarCrash();

  if (partida == true) {
    comprobarSiHayQueAñadirJumperNuevo();
    esconderMuñecos();
    hacerMovimientoJumpers();
  }

}
function comenzarPartida() {

  if (!partida) { //si no hay una partida en marcha
    partida = true;
    start(tick);


  } else if (partida) {
    partida = false;
    stop();

  }
}

function moverIzquierda() {
  if (partida) {
    if (posicionBombero > 0) {// los bomberos se moveran a la izquierda salvo k esten en la posicion de la izquierda k se quedaran en el sitio

      bomberos[posicionBombero].classList.remove('active');
      posicionBombero--;
      bomberos[posicionBombero].classList.add('active');

    }
  }
}

function moverDerecha() {
  if (partida) {
    if (posicionBombero < 2) {
      bomberos[posicionBombero].classList.remove('active');
      posicionBombero++;
      bomberos[posicionBombero].classList.add('active');

    }

  }
  
}


export {
  crearMuñecos,
  esconderMuñecos,
  comprobarCrash, 
  comprobarSiHayQueAñadirJumperNuevo,
  hacerMovimientoJumpers,
  moverDerecha, 
  moverIzquierda,
  comenzarPartida,
  bomberos
}