/**
 * Objeto Nave.
 */
function Nave(){
    this.velocidade = 3;
    this.vida = 100;
    this.pausado = true;
    
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
    
    this.irParaEsquerda = function(){
        if(!this.pausado && this.x>0)
            this.x -=this.velocidade;
        else if(this.x<0)
            this.x=0;
    };
    this.irParaDireita = function(){
        if(!this.pausado && this.x<(this.canvasWidth-this.imagem.width))
            this.x +=this.velocidade;
        else if(this.x>(this.canvasWidth-this.imagem.width))
            this.x =(this.canvasWidth-this.imagem.width);
    };
    this.irParaCima = function(){
        if(!this.pausado && this.y>0)
            this.y -=this.velocidade;
        else if(this.y<0)
            this.y=0;
    };
    this.irParaBaixo = function(){
        if(!this.pausado && this.y<(this.canvasHeight-this.imagem.height))
            this.y +=this.velocidade;
        else if(this.y>(this.canvasHeight-this.imagem.height))
            this.y =(this.canvasHeight-this.imagem.height);
    };
    this.Atirar = function(){};
    
    this.Pausar = function(){ this.pausado = true; };
    this.Continuar = function(){ this.pausado = false; };
}
// Adiciona os métodos do objeto base Desenho ao objeto Nave.
Nave.prototype = new Desenho();
