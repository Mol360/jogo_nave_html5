/**
 * Objeto base para carregar imagens.
 */
function Arquivos() {
    this.total_imagens = 13;
    this.imagens_carregadas = 0;
    
    
    this.nave_jogador = new Image();
    this.fundo_espaco = new Image();
    
    //Imagens
    this.nave_jogador.src = "imgs/nave_player.png";
    this.fundo_espaco.src = "imgs/fundo_paralax_menor.png";
    
    this.nave_jogador.ARQUIVOS = this;
    this.fundo_espaco.ARQUIVOS = this;
    
    this.nave_jogador.onload = function(){this.ARQUIVOS.carregouImagem();};
    this.fundo_espaco.onload = function(){this.ARQUIVOS.carregouImagem();};
    
    
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