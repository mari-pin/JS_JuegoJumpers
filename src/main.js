// Tu código aquí
// crear los muñequitos con el create element
// crear un div x cada elemento
// crea un for xa recorrer el array
//1.2******
//añadir la clase DOWN al hacer click en cualquier boton 
//cuando hacemos click en cualquier sitio fuera eliminar la clase DOWN

import { crearMuñecos, bomberos } from './juego';
import { asignarEventos } from './eventos'


// variables globales


function crearPartida() {
  bomberos[0].classList.add('active');
  crearMuñecos();
  asignarEventos();

}
crearPartida();