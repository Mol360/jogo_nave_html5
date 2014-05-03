// Objeto do jogador.
function Jogador(){
    this.nave = new Nave();
    this.pontos = 0;
    this.dano = 100;
    this.ULTIMA_TECLA = {
                espaco:false,
                esquerda:false,
                cima:false,
                direita:false,
                baixo:false
              };
    
    this.Load = function(context,cWidth,cHeight){
        this.context = context;
        this.canvasWidth = cWidth;
        this.canvasHeight = cHeight;
        
        this.nave.imagem = ARQUIVOS.nave_jogador;
        this.nave.audio_tiro = ARQUIVOS.audio_tiro;
        this.nave.audio_explosao = ARQUIVOS.audio_explosao;
        this.nave.Load(context,this.canvasWidth,this.canvasHeight);
        this.nave.dano = this.dano;
    };
    
    this.pegaEntrada = function(){
        if(TECLAS_ESTADO.esquerda && this.nave.estaVivo())
            this.nave.irParaEsquerda();
        if(TECLAS_ESTADO.direita && this.nave.estaVivo())
            this.nave.irParaDireita();
        if(TECLAS_ESTADO.cima && this.nave.estaVivo())
            this.nave.irParaCima();
        if(TECLAS_ESTADO.baixo && this.nave.estaVivo())
            this.nave.irParaBaixo();
        if(TECLAS_ESTADO.espaco && this.nave.estaVivo()){
            this.nave.Atirar();
            TECLAS_ESTADO.espaco = false;
        }
    };
    
    this.tomarDano = function(bala){
        this.nave.tomarDano(bala);
        this.pontos -=10;
    };
    
    this.estaVivo = function(){return this.nave.estaVivo();};
    
    this.Update = function(){
        this.pegaEntrada();
        this.nave.Update();
    };
    
    this.Draw = function(){
        this.nave.Draw();
    };
}
