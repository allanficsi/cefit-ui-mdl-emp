export class VariaveisLovService {
    
    public static instance: VariaveisLovService = null;


    constructor() {
      return VariaveisLovService.instance = VariaveisLovService.instance || this;
    }
  
    public static getInstance(){
      if(this.instance == null){
        this.instance = new VariaveisLovService();
      }
      return this.instance;
    }

    public getLista(identificador: string){
       return this[identificador];
    }

    listaBanco = {identificador : 'br.com.aptare.pna.cadastro.service.BancoService', 
                         titulo : 'Banco',
                     resultados : [{nome:'codigo', alias:'Código', tipo:'retorno', campoDestino:'txtCodigoBanco'},
                                   {nome:'nome', alias:'Nome', tipo:'retorno', campoDestino:'txtNomeBanco'}],
                filtrosPesquisa : [{nome:'codigo', alias:'Código', tipo:'variavel', formaPreenchimento:'usuario', tipoDeDado:'numero'},
                                   {nome:'nome', alias:'Nome', tipo:'variavel', formaPreenchimento:'usuario', tipoDeDado:'texto'},
                                   {nome:'flagAtivo', tipo:'fixo', valor:'S'}],
                   filtrosBusca : [{nome:'codigo', tipo:'variavel', campoOrigem:'txtCodigoBanco'}],
                     ordenacoes : [{nome:'nome'}],
                         povoar : 'S',
            tamanhoDivResultado : '298'
                 };


    listaCorreio = {identificador   : 'br.com.aptare.cadastroUnico.CorreioService', 
                           titulo   : 'Endereço',
                       resultados   : [{nome:'cepFormatado', alias:'CEP', tipo:'retorno', campoDestino:'enderecoCep'},
                                       {nome:'logradouro', alias:'Logradouro', tipo:'exibicao'},
                                       {nome:'bairro', alias:'Bairro', tipo:'exibicao'},
                                       {nome:'localidade', alias:'Localidade', tipo:'exibicao'},
                                       {nome:'uf', alias:'UF', tipo:'retorno',}],
                  filtrosPesquisa   : [{nome:'logradouro', alias:'Logradouro', tipo:'variavel', formaPreenchimento:'usuario', tipoDeDado:'texto'},
                                       {nome:'bairro', alias:'Bairro', tipo:'variavel', formaPreenchimento:'usuario', tipoDeDado:'texto'},
                                       {nome:'localidade', alias:'Localidade', tipo:'variavel', formaPreenchimento:'usuario', tipoDeDado:'texto', valor:'FORTALEZA'},
                                       {nome:'uf', alias:'UF', tipo:'variavel', formaPreenchimento:'usuario', tipoDeDado:'texto', valor:'CE'}],
                     filtrosBusca   :  [{nome:'cepFormatado', tipo:'variavel', campoOrigem:'enderecoCep'}],
                       ordenacoes   : [{nome:'logradouro'}, {nome:'bairro'}, {nome:'localidade'}, {nome:'uf'}],
              tamanhoDivResultado   : '248',
                           povoar   : 'N'
                   };

    listaProduto = {identificador   : 'br.com.aptare.pna.cadastro.service.ProdutoService', 
                           titulo   : 'Produto',
                       resultados   : [{nome:'codigo', alias:'Código', tipo:'retorno', campoDestino:'txtCodigoProduto'},
                                      {nome:'nome', alias:'Nome', tipo:'retorno', campoDestino:'txtNomeProduto'},
                                      {nome:'auditoria.dataInclusao', alias:"Data Inclusão", tipo:'exibicao'}],
                  filtrosPesquisa   : [{nome:'nome', alias:'Nome', tipo:'variavel', formaPreenchimento:'usuario', tipoDeDado:'texto'},
                                       {nome:'flagAtivo', tipo:'fixo', valor:'S'}],
                     filtrosBusca   :  [{nome:'codigo', tipo:'variavel', campoOrigem:'txtCodigoProduto'}],
                       ordenacoes   : [{nome:'nome'}],
                           povoar   : 'S',
              tamanhoDivResultado   : '298'
                    };

}
