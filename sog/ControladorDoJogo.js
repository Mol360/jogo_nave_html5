/* 
 * Controla toda a lógica do jogo.
 */
function ControladorDoJogo(){
    this.naves_inimigas = [];
    this.qtd_naves_inimigas = 0;
    this.pausado = true;
    this.jogador = "";
    this.hud = "";
    this.context = "";
    this.canvasWidth = "";
    this.canvasHeight = "";
    
    this.qtd_naves_colunas = 5;
    this.qtd_naves_linhas = 4;
    
    this.contador_movimentacao_linhas = 0;
    this.limite_passos_horizontal = 7;
    this.contador_passos_horizontal = 0;
    this.limite_passos_vertical = 2;
    this.contador_passos_vertical = 0;
    this.mover_vertical = false;
    this.direcao_vertical = 1;
    this.direcao_linhas = [];
    
    this.precisaoTiroInimigo = 60;
    
    this.Load = function(context,cWidth,cHeight){
        this.context = context;
        this.canvasWidth = cWidth;
        this.canvasHeight = cHeight;
        // Inicializa o objeto Jogador.
        this.jogador = new Jogador();
        this.jogador.Load(this.context,this.canvasWidth,this.canvasHeight);
        this.jogador.nave.x = (this.canvasWidth/2)-(this.jogador.nave.imagem.width/2);
        this.jogador.nave.y = this.canvasHeight-(this.jogador.nave.imagem.height);
        
        this.hud = new Hud();
        this.hud.Load(this.context,this.canvasWidth,this.canvasHeight);
        this.hud.vida_total = this.jogador.nave.vida;
        
        this.criarNavesInimigas();
        
        this.pausado = false;
    };
    this.Draw = function(){
        this.jogador.Draw();
        for(var i =0; i<this.naves_inimigas.length;i++)
            for(var ib =0; ib<this.naves_inimigas[i].length;ib++)
                this.naves_inimigas[i][ib].Draw();
        this.hud.Draw();
    };
    this.Update = function(){
        this.hud.Update(this.jogador.pontos,this.jogador.nave.vida);
        if(!this.pausado){
            if(this.jogador.nave.estaVivo()){
                this.jogador.Update();
                
                for(var i =0; i<this.naves_inimigas.length;i++)
                    for(var ib =0; ib<this.naves_inimigas[i].length;ib++)
                        this.naves_inimigas[i][ib].Update();
                
                this.verificarColisaoJogadorInimigos();
                this.verificarColisaoInimigosJogador();
                this.verificarTiroInimigos();
                this.moverInimigos();
                this.verificaPosicaoJogador();
            }
            if(!this.jogador.nave.estaVivo())
                this.hud.fimDeJogo();
            else if(this.todosMortos())
                this.hud.venceuJogo();
        }
    };
    
    this.todosMortos = function(){
        if(this.qtd_naves_inimigas===0)
            return true;
        else
            return false;
    };
    this.Reset = function(){};
    this.Pausar = function(){
        this.pausado = true;
        this.jogador.nave.Pausar();
        this.hud.Pausar();
        for(var i =0; i<this.naves_inimigas.length;i++)
            for(var ib =0; ib<this.naves_inimigas[i].length;ib++)
                this.naves_inimigas[i][ib].Pausar();
    };
    this.Continuar = function(){
        this.pausado = false;
        this.jogador.nave.Continuar();
        this.hud.Continuar();
        for(var i =0; i<this.naves_inimigas.length;i++)
            for(var ib =0; ib<this.naves_inimigas[i].length;ib++)
                this.naves_inimigas[i][ib].Continuar();
    };
    
    this.verificaPosicaoJogador = function(){
        if(!this.pausado && this.jogador.estaVivo()){
            var maior_indice = [0,0];
            for(var i =0; i<this.naves_inimigas.length;i++){
                for(var ib =this.naves_inimigas[i].length-1; ib>=0;ib--){
                    if(this.naves_inimigas[i][ib] !== undefined && this.naves_inimigas[i][ib].estaVivo()){
                        if(ib>maior_indice[1])
                            maior_indice = [i,ib]
                        break;
                    }
                }
            }
            if(this.naves_inimigas[maior_indice[0]][maior_indice[1]].estaVivo() && this.jogador.nave.y<=(this.naves_inimigas[maior_indice[0]][maior_indice[1]].y+this.naves_inimigas[maior_indice[0]][maior_indice[1]].imagem.height))
                this.jogador.nave.y = this.naves_inimigas[maior_indice[0]][maior_indice[1]].y+this.jogador.nave.imagem.height;
        }
    };
    
    this.verificarColisaoJogadorInimigos = function(){
        if(!this.pausado){
            for(var i =0; i<this.naves_inimigas.length;i++){
                for(var ib =0; ib<this.naves_inimigas[i].length;ib++){
                    if(this.naves_inimigas[i][ib].estaVivo()){
                        for(var ic=0; ic<this.jogador.nave.balas.length;ic++){
                            if(this.Colidiu(this.naves_inimigas[i][ib],this.jogador.nave.balas[ic])){
                                //this.naves_inimigas[i].splice(ib,1);
                                this.naves_inimigas[i][ib].tomarDano(this.jogador.nave.balas[ic]);
                                this.jogador.nave.balas.splice(ic,1);
                                if(!this.naves_inimigas[i][ib].estaVivo()){
                                    this.qtd_naves_inimigas--;
                                    this.jogador.pontos +=10;
                                }
                                break
                            }
                        }
                    }
                }
            }
        }
    };
    
    this.verificarColisaoInimigosJogador = function(){
        if(!this.pausado){
            for(var i =0; i<this.naves_inimigas.length;i++){
                for(var ib =0; ib<this.naves_inimigas[i].length;ib++){
                    for(var ic =0; ic<this.naves_inimigas[i][ib].balas.length;ic++){                        
                        if(this.Colidiu(this.jogador.nave,this.naves_inimigas[i][ib].balas[ic])){
                            this.jogador.tomarDano(this.naves_inimigas[i][ib].balas[ic]);
                            this.naves_inimigas[i][ib].balas.splice(ic,1);
                            break
                        }
                    }
                }
            }
        }
    };
    
    this.Colidiu = function(nave,bala){
        if(bala.x >= nave.x && bala.x <= (nave.x+nave.imagem.width)){
            if(bala.y >= nave.y && bala.y <= (nave.y+nave.imagem.height)){
                return true;
            }
        }
        return false;
    };
    
    
    this.moverInimigos = function(){
        if(!this.pausado && INIMIGOS_EVENTOS.mover){
            for(var i =0; i<this.naves_inimigas.length;i++){
                if(!this.mover_vertical){
                    if(this.naves_inimigas[i][this.contador_movimentacao_linhas] !== undefined){
                       this.naves_inimigas[i][this.contador_movimentacao_linhas].x +=this.direcao_linhas[this.contador_movimentacao_linhas]*this.naves_inimigas[i][this.contador_movimentacao_linhas].imagem.width;
                    }
                }else{
                    for(var ib =0; ib<this.naves_inimigas[i].length;ib++){
                        if(this.naves_inimigas[i][ib] !== undefined)
                            this.naves_inimigas[i][ib].y +=this.direcao_vertical*this.naves_inimigas[i][ib].imagem.height;
                    }
                    this.direcao_linhas[i] = this.direcao_linhas[i]*-1;
                }
            }
            INIMIGOS_EVENTOS.mover = false;
            if(!this.mover_vertical){
                this.contador_movimentacao_linhas++;
                if(this.contador_movimentacao_linhas>this.qtd_naves_linhas){
                    this.contador_movimentacao_linhas = 0;
                    this.contador_passos_horizontal++;
                    if(this.contador_passos_horizontal>=this.limite_passos_horizontal){
                        this.contador_passos_horizontal = 0;
                        this.mover_vertical = true;
                    }
                }
            }else{
                this.contador_passos_vertical++;
                if(this.contador_passos_vertical>=this.limite_passos_vertical){
                    this.direcao_vertical = this.direcao_vertical*-1;
                    this.contador_passos_vertical = 0;
                }
                this.mover_vertical = false;
            }
        }
    };
    
    this.verificarTiroInimigos = function(){
        if(!this.pausado && INIMIGOS_EVENTOS.atirar){
            var atirou = false;
            for(var i =0; i<this.naves_inimigas.length;i++){
                if(this.naves_inimigas[i].length>0){
                    for(var ib = this.naves_inimigas[i].length-1; ib>=0;ib--){
                        if(this.naves_inimigas[i][ib]!==undefined && this.naves_inimigas[i][ib].estaVivo()){
                            if(this.estaNaMira(this.jogador.nave,this.naves_inimigas[i][ib])){
                                this.naves_inimigas[i][ib].Atirar();
                            }
                            break;
                        }
                    }
                }
            }
            INIMIGOS_EVENTOS.atirar = false;
        }
    };
    
    this.estaNaMira = function(nave,naveInimiga){
        if(nave.x-(nave.width/2) > naveInimiga.x-this.precisaoTiroInimigo && nave.x-(nave.width/2) < (naveInimiga.x+naveInimiga.width)+this.precisaoTiroInimigo){
            return true;
        }
        return false;
    };
    
    this.criarNavesInimigas = function(){
        var imagens = [ARQUIVOS.nave_inimigo1,ARQUIVOS.nave_inimigo2];
        var cont=0;
        
        for(var i=0;i<this.qtd_naves_colunas;i++){
            this.direcao_linhas.push(1);
            var arr_inimigos_coluna = [];
            if(cont>(imagens.length-1))
                cont=0;
            for(var ib=0;ib<this.qtd_naves_linhas;ib++){
                var nave_nova = new Nave();
                nave_nova.Load(this.context,this.canvasWidth,this.canvasHeight);
                nave_nova.imagem = imagens[cont];
                nave_nova.audio_tiro = ARQUIVOS.audio_tiro;
                nave_nova.audio_explosao = ARQUIVOS.audio_explosao;
                nave_nova.x = i*60+10;
                nave_nova.y = 50+(ib*60+10);
                nave_nova.setaDirecaoNasBalas(1);
                arr_inimigos_coluna.push(nave_nova);
                this.qtd_naves_inimigas++;
            }
            this.naves_inimigas.push(arr_inimigos_coluna);
            cont++;
        }
    };
}