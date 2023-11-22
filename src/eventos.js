import { moverIzquierda, moverDerecha,comenzarPartida } from "./juego";

function asignarEventos() {
  //funcion para asignar eventos
  //botones 
  let botonStart = document.getElementById('start');
  let botonRigth = document.getElementById('right');
  let botonLeft = document.getElementById('left');


  botonStart.addEventListener('mouseup', function () {
    botonStart.classList.remove('down');
  });
  botonRigth.addEventListener('mouseup', function () {
    botonRigth.classList.remove('down');

  });
  botonLeft.addEventListener('mouseup', function () {
    botonLeft.classList.remove('down');
  });

  botonStart.addEventListener('mousedown', function () {
    botonStart.classList.add('down');
  });
  botonRigth.addEventListener('mousedown', function () {
    botonRigth.classList.add('down');
  });
  botonLeft.addEventListener('mousedown', function () {
    botonLeft.classList.add('down');
  });



  botonStart.addEventListener('click', function () {

    comenzarPartida();
  });
  //si el usuario apreta la tecla "1" = click en el boton start
  document.addEventListener(
    "keyup", //evento soltar la tecla
    (event) => {
      const keyName = event.key;// me dice k tecla se ha pulsado
      if (keyName == 1) {
        comenzarPartida();

      } else if (keyName == 'ArrowLeft') {

        moverIzquierda();

      } else if (keyName == 'ArrowRight') {
        moverDerecha();
      }

    },
    false,
  );
  // si se pulsa el boton izquierda o la flecha izquierda le añade el evento moverse a la izquierda
  botonLeft.addEventListener("click", function () {
    moverIzquierda();
  });
  // si se pulsa el boton derecha o la flecha derecha le añade el evento moverse a la dercha
  botonRigth.addEventListener("click", function () {
    moverDerecha();
  });

}
export {
  asignarEventos
}