/* 
 * Controla toda a lógica do jogo.
 */
function ControladorDoJogo(){
    this.naves_inimigas = [];
    this.qtd_naves_inimigas = 0;
    this.pausado = true;
    this.jogador = "";
    this.context = "";
    this.canvasWidth = "";
    this.canvasHeight = "";
    
    this.qtd_naves_colunas = 5;
    this.qtd_naves_linhas = 4;
    
    this.Load = function(context,cWidth,cHeight){
        this.context = context;
        this.canvasWidth = cWidth;
        this.canvasHeight = cHeight;
        // Inicializa o objeto Jogador.
        this.jogador = new Jogador();
        this.jogador.Load(this.context,this.canvasWidth,this.canvasHeight);
        this.jogador.nave.x = (this.canvasWidth/2)-(this.jogador.nave.imagem.width/2);
        this.jogador.nave.y = this.canvasHeight-(this.jogador.nave.imagem.height);
        
        this.criarNavesInimigas();
        
        this.pausado = false;
    };
    this.Draw = function(){
        this.jogador.Draw();
        for(var i =0; i<this.naves_inimigas.length;i++)
            for(var ib =0; ib<this.naves_inimigas[i].length;ib++)
                this.naves_inimigas[i][ib].Draw();
    };
    this.Update = function(){
        if(!this.pausado){
            if(this.jogador.nave.estaVivo()){
                this.jogador.Update();
                
                for(var i =0; i<this.naves_inimigas.length;i++)
                    for(var ib =0; ib<this.naves_inimigas[i].length;ib++)
                        this.naves_inimigas[i][ib].Update();
            }
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
        for(var i =0; i<this.naves_inimigas.length;i++)
            for(var ib =0; ib<this.naves_inimigas[i].length;ib++)
                this.naves_inimigas[i][ib].Pausar();
    };
    this.Continuar = function(){
        this.pausado = false;
        this.jogador.nave.Continuar();
        for(var i =0; i<this.naves_inimigas.length;i++)
            for(var ib =0; ib<this.naves_inimigas[i].length;ib++)
                this.naves_inimigas[i][ib].Continuar();
    };
    
    this.criarNavesInimigas = function(){
        var imagens = [ARQUIVOS.nave_inimigo1,ARQUIVOS.nave_inimigo2];
        var cont=0;
        
        for(var i=0;i<this.qtd_naves_colunas;i++){
            var arr_inimigos_coluna = [];
            if(cont>(imagens.length-1))
                cont=0;
            for(var ib=0;ib<this.qtd_naves_linhas;ib++){
                var nave_nova = new Nave();
                nave_nova.Load(this.context,this.canvasWidth,this.canvasHeight);
                nave_nova.imagem = imagens[cont];
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