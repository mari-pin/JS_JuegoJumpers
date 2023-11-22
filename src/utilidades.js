/* esta funcion si el digito es menor de 10 le pone un cero a la izquierda */

function ponerleDigitos(d) {
  return (d < 10) ? '0' + d.toString() : d.toString();
}


//inserta el div despues del elemento con id= score
function insertAfter(newNode, existingNode) {
  existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}
export{ponerleDigitos, insertAfter};