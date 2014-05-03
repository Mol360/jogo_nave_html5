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
INIMIGOS_EVENTOS = {atirar:false,mover:false};
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

setInterval(function(){INIMIGOS_EVENTOS.atirar = true},1000);
setInterval(function(){INIMIGOS_EVENTOS.mover = true},200);