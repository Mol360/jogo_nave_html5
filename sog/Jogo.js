/**
 * Objeto central do jogo.
 */
function Jogo() {
    this.canvas = "";
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.context = "";
    this.espaco = "";
    
    this.nave = new Nave();
    
    this.Load = function(){
        this.canvas = document.getElementById('canvas');
        // Verifica se o browser suporta canvas.
        if (this.canvas.getContext) {
            this.context = this.canvas.getContext('2d');
            this.canvasHeight = this.canvas.height;
            this.canvasWidth = this.canvas.width;
            
            // Inicializa o objeto Espaco.
            this.espaco = new Espaco();
            this.espaco.Load(this.context,this.canvasWidth,this.canvasHeight);
            
            this.nave.Load(this.context,this.canvasWidth,this.canvasHeight);
            this.nave.imagem = ARQUIVOS.nave_jogador;
            //this.nave.x = this.canvasWidth/2;
            //this.nave.y = this.canvasHeight/2;

            return true;
        } else {
            return false;
        }
    };
    
    this.Update = function(){
        this.espaco.Update();
        this.nave.Update();
    };
    
    this.Draw = function(){
        this.espaco.Draw();
        this.nave.Draw();
    };
    
    this.Reset = function(){
        
    };
    
    // Start the animation loop
    this.start = function() {
        Looping();
    };
}


/**
 * Inicializa o objeto principal do jogo.
 */
var jogo = new Jogo();
function init() {
    if(jogo.Load())
        jogo.start();
}
window.onload = function(){init();};
/**
 * Objeto que gerencia o Looping do game, ele é passado como callback para ser chamado recursivamente.
 */
function Looping() {
    requestAnimFrame( Looping );
    jogo.Update();
    jogo.Draw();
}
/**
 * Aqui é onde gera o looping do game chamando uma função callback a cada frame.
 */
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame   ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function(callback, element){
                    window.setTimeout(callback, 1000 / 60);
            };
})();