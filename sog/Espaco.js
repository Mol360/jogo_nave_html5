/**
 * Objeto que será responsável por tratar a imagem de fundo do jogo.
 */
function Espaco() {
    this.imagem = ARQUIVOS.fundo_espaco;
    this.audio_fundo = ARQUIVOS.audio_fundo;
    this.velocidade = 1; // Variável responsável pela velocidade que o espaço irá se movimentar.
    
    this.Draw = function() {
        this.context.drawImage(this.imagem, this.x, this.y);
        this.context.drawImage(this.imagem, this.x, this.y - this.canvasHeight) ;
    };
    
    this.Update = function(){
        this.playAudio();
        this.y += this.velocidade;
        if (this.y >= this.canvasHeight)
                this.y = 0;
    };
    
    this.Load = function(context,cWidth,cHeight){
        this.context = context;
        this.canvasWidth = cWidth;
        this.canvasHeight = cHeight;
    };
    
    this.playAudio = function(){
        if(!this.mudo){
            if(this.audio_fundo.currentTime == 0 || this.audio_fundo.ended) {
                this.audio_fundo.play();
            } 
        }else{
            this.audio_fundo.currentTime = 0;
            this.audio_fundo.pause();
        }
    };
    
    this.deixarMudo = function(){this.mudo=true;};
    this.voltarAudio = function(){this.mudo=false;};
}
// Adiciona os métodos do objeto base Desenho ao objeto Espaco.
Espaco.prototype = new Desenho();