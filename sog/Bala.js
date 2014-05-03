/* 
 * Objeto Bala.
 */
function Bala(){
    this.velocidade = 3;
    this.dano = 10;
    this.pausado = true;
    this.imagem = ARQUIVOS.bala;
    
    this.Update = function(){
        if(!this.pausado && this.saiuDaTela()===false){
            this.y +=this.velocidade;
        }
    };
    
    this.setaDirecao = function(direcao){
        this.velocidade = this.velocidade*direcao;
    };
    
    this.saiuDaTela = function(){
        if(this.y<0 || (this.y+this.height)>this.canvasHeight 
                || this.x<0 || (this.x+this.width)>this.canvasWidth)
            return true;
        else
            return false;
    };
    
    this.Draw = function(){
        this.context.drawImage(this.imagem, this.x, this.y);
        this.context.drawImage(this.imagem, this.x, this.y);
    };
    
    this.Load = function(context,cWidth,cHeight){
        this.context = context;
        this.canvasWidth = cWidth;
        this.canvasHeight = cHeight;
        this.pausado = false;
    };
    this.Pausar = function(){ this.pausado = true; };
    this.Continuar = function(){ this.pausado = false; };
}
Bala.prototype = new Desenho();