// Controlador de entrada.
TECLAS = {
    32: "espaco",
    37: "esquerda",
    38: "cima",
    39: "direita",
    40: "baixo"
  };
TECLAS_ESTADO = {
    espaco:false,
    esquerda:false,
    cima:false,
    direita:false,
    baixo:false
  };
document.onkeydown = function(e) {
  var tecla = (e.keyCode) ? e.keyCode : e.charCode;
  if (TECLAS[tecla]) {
    e.preventDefault();
    TECLAS_ESTADO[TECLAS[tecla]] = true;
  }
}
document.onkeyup = function(e) {
  var tecla = (e.keyCode) ? e.keyCode : e.charCode;
  if (TECLAS[tecla]) {
    e.preventDefault();
    TECLAS_ESTADO[TECLAS[tecla]] = false;
  }
}