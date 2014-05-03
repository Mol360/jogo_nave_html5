/**
 * Objeto que será responsável por tratar a imagem de fundo do jogo.
 */
function Espaco() {
    this.imagem = ARQUIVOS.fundo_espaco;
    this.velocidade = 1; // Variável responsável pela velocidade que o espaço irá se movimentar.
    
    this.Draw = function() {
        this.context.drawImage(this.imagem, this.x, this.y);
        this.context.drawImage(this.imagem, this.x, this.y - this.canvasHeight) ;
    };
    
    this.Update = function(){
        this.y += this.velocidade;
        if (this.y >= this.canvasHeight)
                this.y = 0;
    };
    
    this.Load = function(context,cWidth,cHeight){
        this.context = context;
        this.canvasWidth = cWidth;
        this.canvasHeight = cHeight;
    };
}
// Adiciona os métodos do objeto base Desenho ao objeto Espaco.
Espaco.prototype = new Desenho();