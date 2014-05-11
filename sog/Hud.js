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
    
    this.posicao_elementos = -200;
    this.tamanho_texto = 40;
    this.diferenca_tamanho_texto = 100;
    this.aceleracao = 20;
    this.evento = "Pausado";
    this.tocarEvento = false;
    
    
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
        this.animarPause();
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
    
    this.animarPause = function(){
        if(this.tocarEvento && this.posicao_elementos+50<((this.canvasWidth/2)-this.diferenca_tamanho_texto)){
            this.posicao_elementos +=0.5*this.aceleracao;
        }else if(!this.tocarEvento && this.posicao_elementos+200>0){
            this.posicao_elementos -=0.5*this.aceleracao;
        }
        
        this.context.font = 'italic '+this.tamanho_texto+'pt Times Roman';
        this.context.fillStyle = 'white';
        this.context.lineWidth = 2;
        this.context.strokeStyle = 'black';

        this.context.strokeText(this.evento, this.posicao_elementos, this.canvasHeight/2);
        this.context.fillText(this.evento, this.posicao_elementos, this.canvasHeight/2);
    };
    
    this.Pausar = function(){
        this.pausado = true;
        this.evento = "Pausado";
        this.diferenca_tamanho_texto = 50;
        this.tocarEvento = true;
    };
    this.Continuar = function(){
        this.pausado = false;
        this.evento = "Começou";
        this.diferenca_tamanho_texto = 50;
        this.tocarEvento = false;
    };
    
    this.fimDeJogo = function(){
        this.evento = "Você Perdeu!";
        this.diferenca_tamanho_texto = 100;
        this.tocarEvento = true;
    };
    
    this.comecar = function(){
        this.evento = "Começar!";
        this.diferenca_tamanho_texto = 50;
        this.tocarEvento = true;
    };
    
    this.venceuJogo = function(){
        this.evento = "Parabéns você venceu!";
        this.diferenca_tamanho_texto = 205;
        this.tocarEvento = true;
    };
}