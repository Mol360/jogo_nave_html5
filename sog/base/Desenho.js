/**
 * Objeto base para objetos desenhados na tela.
 */
function Desenho() {
    this.width = 0;
    this.height = 0;
    this.x = 0;
    this.y = 0;
    this.context = "";
    
    this.speed = 0;
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    
    // Define métodos abstratos.
    this.Draw = function() {
    };
    this.Load = function() {
    };
    this.Update = function() {
    };
}
