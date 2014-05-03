/**
 * Objeto Nave.
 */
function Nave(){
    this.velocidade = 3;
    this.vida = 100;
    this.pausado = true;
    this.balas = [new Bala()];
    this.direcaoBalas = -1;
    this.limiteDeTiros = 5;
    this.dano = 10;
    
    this.Draw = function(){
        if(this.estaVivo()){
            this.context.drawImage(this.imagem, this.x, this.y);
            this.context.drawImage(this.imagem, this.x, this.y);
        }
        
        for(var i=0;i<this.balas.length;i++)
            this.balas[i].Draw();
    };
    
    this.Update = function(){
        if(!this.pausado){
            for(var i=0;i<this.balas.length;i++){
                if(this.balas[i].saiuDaTela())
                   this.balas.splice(i,1); 
                else{
                   this.balas[i].Update();
               }
            }
        }
    };
    
    this.Load = function(context,cWidth,cHeight){
        this.context = context;
        this.canvasWidth = cWidth;
        this.canvasHeight = cHeight;
        this.pausado = false;
        
        this.balas[0].Load(context,cWidth,cHeight);
        this.balas[0].x = -10000;
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
    
    this.Atirar = function(){
        if(this.estaVivo() && !this.pausado && this.balas.length<this.limiteDeTiros){
            var bala = new Bala();
            bala.Load(this.context,this.canvasWidth,this.canvasHeight);
            bala.x = (this.x)+(this.imagem.width/2)-((bala.imagem.width/2));
            if(this.direcaoBalas == 1)
                bala.y = (this.y)+(this.imagem.height+bala.height);
            else
                bala.y = (this.y)-((bala.height));
            bala.setaDirecao(this.direcaoBalas);
            bala.dano = this.dano;
            this.balas.push(bala);
        }
    };
    
    this.tomarDano = function(bala){
        this.vida = this.vida - bala.dano;
    };
    
    this.Pausar = function(){ this.pausado = true; };
    this.Continuar = function(){ this.pausado = false; };
    
    this.setaDirecaoNasBalas = function(direcao){this.direcaoBalas = direcao;};
}
// Adiciona os métodos do objeto base Desenho ao objeto Nave.
Nave.prototype = new Desenho();
