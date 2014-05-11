/**
 * Objeto central do hud do jogo.
 */
function Hud() {
    this.canvas = "";
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.context = "";
    this.pausado = false;
    this.pontos = 0;
    this.vida_total = 0;
    this.vida = 0;
    this.tamanho_barra_vida = 250;
    
    
    this.Load = function(context,cWidth,cHeight){
        this.context = context;
        this.canvasWidth = cWidth;
        this.canvasHeight = cHeight;
    };
    
    this.Update = function(pontos,vida){
        this.pontos = pontos;
        this.vida = vida;
    };
    
    this.Draw = function(){
        this.pegaBarraVida();
        this.pegaPontos();
    };
    
    this.pegaPontos = function(){
        this.context.font = 'italic 15pt Times Roman';
        this.context.fillStyle = '#76CCFA';
        this.context.lineWidth = 2;
        this.context.strokeStyle = 'black';

        this.context.strokeText('Pontos : '+this.pontos, this.canvasWidth-130, 30);
        this.context.fillText('Pontos : '+this.pontos, this.canvasWidth-130, 30);
    };
    
    this.pegaBarraVida = function(){
        this.pegaBarra(this.tamanho_barra_vida,25,this.vida,this.vida_total,10,10);
    };
    
    this.pegaBarra = function(tamanho_px,altura_px,andamento,total,px,py){
        var tamanho = (tamanho_px*andamento)/total;
        var grd = this.context.createLinearGradient(px,py,tamanho+200,0);
        grd.addColorStop(0,"#76CCFA");
        grd.addColorStop(1,"white");

        this.context.fillStyle = grd;
        this.context.fillRect(px,py,tamanho,altura_px);
    };
}