/**
 * Objeto Nave.
 */
function Nave(){
    this.vida = 100;
    this.pausado = true;
    this.imagem = new Image();
    this.imagem.src = "imgs/nave_player.png";
    
    this.Draw = function(){
        if(this.estaVivo()){
            this.context.drawImage(this.imagem, this.x, this.y);
            this.context.drawImage(this.imagem, this.x, this.y);
        }
    };
    
    this.Update = function(){
        if(!this.pausado){
        }
    };
    
    this.Load = function(context,cWidth,cHeight){
        this.context = context;
        this.canvasWidth = cWidth;
        this.canvasHeight = cHeight;
        this.pausado = false;
    };
    
    this.estaVivo = function(){
        if(this.vida>0)
            return true;
        else
            false;
    };
    
    this.Pausar = function(){ this.pausado = true; };
    this.Continuar = function(){ this.pausado = false; };
}
// Adiciona os métodos do objeto base Desenho ao objeto Nave.
Nave.prototype = new Desenho();
