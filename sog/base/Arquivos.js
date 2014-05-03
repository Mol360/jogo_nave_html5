/**
 * Objeto base para carregar imagens.
 */
function Arquivos() {
    this.total_imagens = 8;
    this.imagens_carregadas = 0;
    
    
    this.nave_jogador = new Image();
    this.nave_inimigo1 = new Image();
    this.nave_inimigo2 = new Image();
    this.fundo_espaco = new Image();
    this.bala = new Image();
    
    //Imagens
    this.nave_jogador.src = "imgs/nave_player.png";
    this.nave_inimigo1.src = "imgs/nave_inimigo1.png";
    this.nave_inimigo2.src = "imgs/nave_inimigo2.png";
    this.fundo_espaco.src = "imgs/fundo_paralax_menor.png";
    this.bala.src = "imgs/tiro_player.png";
    
    //Áudios
    this.audio_tiro = new Audio("audio/laser.wav");
    this.audio_explosao = new Audio("audio/explosion.wav");
    this.audio_fundo = new Audio("audio/audio_fundo_jogo.mp3");
    
    this.nave_jogador.ARQUIVOS = this;
    this.fundo_espaco.ARQUIVOS = this;
    this.bala.ARQUIVOS = this;
    
    this.audio_tiro.ARQUIVOS = this;
    this.audio_explosao.ARQUIVOS = this;
    this.audio_fundo.ARQUIVOS = this;
    
    this.nave_jogador.onload = function(){this.ARQUIVOS.carregouImagem();};
    this.nave_inimigo1.ARQUIVOS = this;
    this.nave_inimigo2.ARQUIVOS = this;
    this.fundo_espaco.onload = function(){this.ARQUIVOS.carregouImagem();};
    this.bala.onload = function(){this.ARQUIVOS.carregouImagem();};
    
    //Audio tiro jogador
    this.audio_tiro.load();
    this.audio_tiro.volume = .12;
    this.audio_tiro.onloadeddata = function(){this.ARQUIVOS.carregouImagem();};
    
    //Audio explosao jogador
    this.audio_explosao.load();
    this.audio_explosao.volume = .12;
    this.audio_explosao.onloadeddata = function(){this.ARQUIVOS.carregouImagem();};
    
    //Audio fundo jogo
    this.audio_fundo.load();
    this.audio_fundo.volume = .22;
    this.audio_fundo.onloadeddata = function(){this.ARQUIVOS.carregouImagem();};
    
    
    this.carregouImagem = function(){
        this.imagens_carregadas++;
    };
    
    this.Carregou = function(){
        if(this.total_imagens == this.imagens_carregadas)
            return true;
        else
            return false;
    };
};
var ARQUIVOS = new Arquivos();