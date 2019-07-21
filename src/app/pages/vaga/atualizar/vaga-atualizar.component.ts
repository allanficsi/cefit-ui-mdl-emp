import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CadastroUnico } from 'src/app/model/cadastro-unico/cadastro-unico';
import { Parametro } from 'src/app/model/geral/parametro';
import { Cbo } from 'src/app/model/trabalhador/cbo';
import { VagaAgendamento } from 'src/app/model/vaga/vaga-agendamento';
import { VagaDia } from 'src/app/model/vaga/vaga-dia';
import { CboService } from 'src/app/services/trabalhador/cbo.service';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { Auditoria } from '../../../model/auditoria';
import { ResponseApi } from '../../../model/response-api';
import { Trabalhador } from '../../../model/trabalhador/trabalhador';
import { Vaga } from '../../../model/vaga/vaga';
import { DialogService } from '../../../services/shared/dialog.service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { TrabalhadorService } from '../../../services/trabalhador/trabalhador.service';
import { VagaService } from '../../../services/vaga/vaga.service';
import { ModalEmpregadorComponent } from '../../geral/modal-empregador/modal-empregador.component';
import { Empregador } from './../../../model/empregador/empregador';
import { EmpregadorService } from './../../../services/empregador/empregador.service';
import { ParametroService } from './../../../services/geral/parametro.service';
import { ExtensaoEndereco } from 'src/app/model/cadastro-unico/extensao-endereco';
import { CadastroUnicoService } from 'src/app/services/cadastro-unico/cadastro-unico.service';


@Component({
  selector: 'app-vaga-atualizar',
  templateUrl: './vaga-atualizar.component.html',
  styleUrls: ['./vaga-atualizar.component.css']
})
export class VagaAtualizarComponent extends AptareCrudController<Vaga, {new(): Vaga}>{ 

  flagSelecionarTodosAgenda: boolean;
  filtroEmpregador: string;
  arrayDiaSelecionado = [];

  trabalhador: Trabalhador;
  empregador: Empregador;
  cbo: Cbo;
  listaTrabalhador = [];
  listaEmpregador = [];
  listaCbo = [];
  listaDirecionamento = [];
  listaEndereco = [];

  vagaDia: VagaDia;
  listaVagaDia = [];

  myControlTrabalhador: FormControl = new FormControl();
  filteredOptionsTrabalhador: Observable<Trabalhador[]>;

  myControlCbo: FormControl = new FormControl();
  filteredOptionsCbo: Observable<Cbo[]>;

  constructor(router: Router,
              route: ActivatedRoute,  
              dialog: MatDialog,                   
              service: VagaService,
              mensagem: MensagemService,
              private trabalhadorService: TrabalhadorService,
              private empregadorService: EmpregadorService,
              private cboService: CboService,
              private parametroService: ParametroService,
              private cadastroUnicoService: CadastroUnicoService,
              dialogService: DialogService) {
    super(router, route, dialog, Vaga, service, mensagem, dialogService);
  }

  iniciarPaginaInserir() {
    this.objetoAtualiza.tipoVaga = "I";
    this.objetoAtualiza.tipoDescricaoVaga = "G";
    this.flagSelecionarTodosAgenda = true;
    this.objetoAtualiza.direcionamento = null;

    this.vagaDia = new VagaDia();

    this.popularCbo();
    this.pesquisarEmpregador();
  }

  iniciarPaginaAlterar() {
    let vaga: Vaga = new Vaga();
    vaga.codigo = +this.codigo;

    this.vagaDia = new VagaDia();
    this.listaVagaDia = [];

    // GET VAGA COM O CODIGO
    this.service.get(vaga).subscribe((responseApi:ResponseApi) => {      
      this.objetoAtualiza = responseApi.data;
      this.objetoAtualiza.dataInicio = new Date(this.objetoAtualiza.dataInicio);

      if(this.objetoAtualiza.dataLimite != null) {
        this.objetoAtualiza.dataLimite = new Date(this.objetoAtualiza.dataLimite);
      } else {
        this.objetoAtualiza.dataLimite = null;
      }

      if(this.objetoAtualiza.dataFim != null) {
        this.objetoAtualiza.dataFim = new Date(this.objetoAtualiza.dataFim);
      } else {
        this.objetoAtualiza.dataFim = null;
      }
      
      // Nominal ou freguesia
      if(this.objetoAtualiza.tipoDescricaoVaga == 'N' || this.objetoAtualiza.tipoDescricaoVaga == 'F') {
        this.trabalhador = this.objetoAtualiza.trabalhadorEntity;
      }
      
      // Freguesia
      if(this.objetoAtualiza.tipoDescricaoVaga == 'F') {
        this.listaVagaDia = this.objetoAtualiza.listaVagaDia;
      } else {
        // Geral e Nominal
        this.vagaDia = this.objetoAtualiza.listaVagaDia[0];
        this.vagaDia.data = new Date(this.vagaDia.data);
      }

      this.cbo = this.objetoAtualiza.cboEntity;

      console.log(this.objetoAtualiza.empregador);
      this.empregador = this.objetoAtualiza.empregador;

      let cadastroUnico = new CadastroUnico();
      cadastroUnico.codigo = this.empregador.codigoCadastroUnico;
      this.cadastroUnicoService.get(cadastroUnico)
                            .subscribe((responseApi:ResponseApi) => {

          let objCun: CadastroUnico = responseApi.data;

          // Endereco
          for(let i = 0; i < objCun.listaEndereco.length; i++) {

            let eex: ExtensaoEndereco = new ExtensaoEndereco();

            if(objCun.listaEndereco[i].correio != null) {
              eex.logradouro = objCun.listaEndereco[i].correio.logradouro;
              eex.bairro = objCun.listaEndereco[i].correio.bairro;
              eex.localidade = objCun.listaEndereco[i].correio.localidade;
              eex.uf = objCun.listaEndereco[i].correio.uf;
            } else {
              eex.logradouro = objCun.listaEndereco[i].extensaoEndereco.logradouro;
              eex.bairro = objCun.listaEndereco[i].extensaoEndereco.bairro;
              eex.localidade = objCun.listaEndereco[i].extensaoEndereco.localidade;
              eex.uf = objCun.listaEndereco[i].extensaoEndereco.uf;
            }

            objCun.listaEndereco[i].extensaoEndereco = eex;
            this.listaEndereco.push(objCun.listaEndereco[i]);
          }

      });


    } , err => {
      this.mensagem.tratarErro(err);  
    });
  }

  displayFnTrabalhador(trabalhador?: Trabalhador): string | undefined {
    return trabalhador ? trabalhador.cadastroUnico.nome : undefined;
  }

  displayFnCbo(cbo?: Cbo): string | undefined {
    return cbo ? cbo.nome : undefined;
  }

  private _filterTrabalhador(nome: string): Trabalhador[] {
    const filterValue = nome.toLowerCase();

    return this.listaTrabalhador.filter(option => option.cadastroUnico.nome.toLowerCase().indexOf(filterValue) > -1);
  }

  private _filterCbo(nome: string): Cbo[] {
    const filterValue = nome.toLowerCase();

    return this.listaCbo.filter(option => option.nome.toLowerCase().indexOf(filterValue) > -1);
  }

  setListasStaticas() {
    super.setListasStaticas();

    this.popularDirecionamento();
    ///this.popularTrabalhador();
    //this.iniciarVagaAgendamento();

    // Autocomplete profissional
    this.filteredOptionsTrabalhador = this.myControlTrabalhador.valueChanges
    .pipe(
      startWith<string | Trabalhador>(''),
      map(value => typeof value === 'string' ? value : value.cadastroUnico.nome),
      map(nome => nome ? this._filterTrabalhador(nome) : this.listaTrabalhador.slice())
    );

    // Autocomplete cbo
    this.filteredOptionsCbo = this.myControlCbo.valueChanges
    .pipe(
      startWith<string | Cbo>(''),
      map(value => typeof value === 'string' ? value : value.nome),
      map(nome => nome ? this._filterCbo(nome) : this.listaCbo.slice())
    );
  }

  popularDirecionamento() {
    this.listaDirecionamento = [
      { nome:"ATENDIMENTO", valor : 1},
      { nome:"CONVOCAÇÃO NÃO VISÍVEL AO ATENDIMENTO", valor : 2},
      { nome:"INDIFERENTE", valor : 3}
    ]
  }

  selecionarOcupacao() {
    this.popularTrabalhador();
  }

  popularCbo() {
    let cbo = new Cbo();
    cbo.tipo = this.objetoAtualiza.tipoVaga;
    cbo.flagAtivo = "S";

    this.cboService.pesquisar(cbo)
                .subscribe((responseApi:ResponseApi) => {
      this.listaCbo = responseApi['data'];
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  popularTrabalhador() {
    if(this.cbo != null && (typeof this.cbo.codigo != 'undefined') && (typeof this.cbo.codigo != 'undefined')) {
      let trabalhador: Trabalhador = new Trabalhador();
      trabalhador.situacaoIngresso = TrabalhadorService.APROVADO;
      trabalhador.situacao = TrabalhadorService.SITUACAO_ATIVA;
      trabalhador.codigoCbo = this.cbo.codigo;
      
      this.trabalhadorService.pesquisar(trabalhador)
                  .subscribe((responseApi:ResponseApi) => {
        this.listaTrabalhador = responseApi['data'];
      } , err => {
        this.mensagem.tratarErro(err);
      });
    }else{
      this.listaTrabalhador = [];
    }
  }

  pesquisarEmpregador() {

      this.listaEndereco = [];

      let empregador = new Empregador();
      empregador.situacao = EmpregadorService.SITUACAO_ATIVA;
      empregador.codigo = this.getCodigoEmpregadorLogado();
      empregador.filtroGenerico = this.filtroEmpregador;

      // Realizando consulta do empregador
      this.empregadorService.pesquisar(empregador)
          .subscribe((responseApi:ResponseApi) => {
        this.listaEmpregador = responseApi['data'];

        // Se retornar varios empregadores, abrir modal com lista de empregadores
        if(this.listaEmpregador.length > 1) {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.width = '900px';
          dialogConfig.height = '450px';
          dialogConfig.data = {listaResultado: this.listaEmpregador};

          this.dialog.open(ModalEmpregadorComponent, dialogConfig)
                                  .afterClosed().subscribe((data) => {
            
            this.empregador = data;

            // Ao selecionar o empregador (close modal), get no cun com lista de enderecos
            let cadastroUnico = this.empregador.cadastroUnico;
            this.cadastroUnicoService.get(cadastroUnico)
                                  .subscribe((responseApi:ResponseApi) => {

                let objCun: CadastroUnico = responseApi.data;
                
                for(let i = 0; i < objCun.listaEndereco.length; i++) {

                  let eex: ExtensaoEndereco = new ExtensaoEndereco();

                  if(objCun.listaEndereco[i].correio != null) {
                    eex.logradouro = objCun.listaEndereco[i].correio.logradouro;
                    eex.bairro = objCun.listaEndereco[i].correio.bairro;
                    eex.localidade = objCun.listaEndereco[i].correio.localidade;
                    eex.uf = objCun.listaEndereco[i].correio.uf;
                  } else {
                    eex.logradouro = objCun.listaEndereco[i].extensaoEndereco.logradouro;
                    eex.bairro = objCun.listaEndereco[i].extensaoEndereco.bairro;
                    eex.localidade = objCun.listaEndereco[i].extensaoEndereco.localidade;
                    eex.uf = objCun.listaEndereco[i].extensaoEndereco.uf;
                  }

                  objCun.listaEndereco[i].extensaoEndereco = eex;
                  this.listaEndereco.push(objCun.listaEndereco[i]);
                }

            });

          });
        } else {
          // Se retornar somente um empregador, ja selecionar e pesquisar o cadastro unico com lista de enderecos
          this.empregador = this.listaEmpregador[0];

          let cadastroUnico = new CadastroUnico();
          cadastroUnico.codigo = this.empregador.codigoCadastroUnico;
          this.cadastroUnicoService.get(cadastroUnico)
                                .subscribe((responseApi:ResponseApi) => {

              let objCun: CadastroUnico = responseApi.data;
              // Endereco
              for(let i = 0; i < objCun.listaEndereco.length; i++) {

                let eex: ExtensaoEndereco = new ExtensaoEndereco();

                if(objCun.listaEndereco[i].correio != null) {
                  eex.logradouro = objCun.listaEndereco[i].correio.logradouro;
                  eex.bairro = objCun.listaEndereco[i].correio.bairro;
                  eex.localidade = objCun.listaEndereco[i].correio.localidade;
                  eex.uf = objCun.listaEndereco[i].correio.uf;
                } else {
                  eex.logradouro = objCun.listaEndereco[i].extensaoEndereco.logradouro;
                  eex.bairro = objCun.listaEndereco[i].extensaoEndereco.bairro;
                  eex.localidade = objCun.listaEndereco[i].extensaoEndereco.localidade;
                  eex.uf = objCun.listaEndereco[i].extensaoEndereco.uf;
                }

                objCun.listaEndereco[i].extensaoEndereco = eex;
                this.listaEndereco.push(objCun.listaEndereco[i]);
              }

          });
          
        }
      } , err => {
      this.mensagem.tratarErro(err);
      });
  }

  // replicarHorario(index) {
  //   let hor1 = this.listaVagaAgendamento[index].numeroHora1;
  //   let hor2 = this.listaVagaAgendamento[index].numeroHora2;
  //   let hor3 = this.listaVagaAgendamento[index].numeroHora3;
  //   let hor4 = this.listaVagaAgendamento[index].numeroHora4;

  //   this.listaVagaAgendamento.forEach(element => {
  //     element.numeroHora1 = hor1;
  //     element.numeroHora2 = hor2;
  //     element.numeroHora3 = hor3;
  //     element.numeroHora4 = hor4;
  //   });
  // }

  // limparAllHorario() {
  //   this.listaVagaAgendamento.forEach(element => {
  //     element.numeroHora1 = null;
  //     element.numeroHora2 = null;
  //     element.numeroHora3 = null;
  //     element.numeroHora4 = null;
  //   });
  // }

  selecionarCaracteristica() {
    this.trabalhador = new Trabalhador();
    this.trabalhador.cadastroUnico = new CadastroUnico();

    this.vagaDia = new VagaDia();
    this.listaVagaDia = [];

    this.listaDia.forEach(element => {
      element.fgSelecionada = false;
    });
  }

  completarInserir() {
    this.objetoAtualiza.auditoria = new Auditoria();
    this.objetoAtualiza.auditoria.codigoUsuarioInclusao = this.getCodigoUsuarioLogado();
    this.objetoAtualiza.auditoria.dataInclusao = new Date();
    this.objetoAtualiza.flagControleExibicao = VagaService.STATUS_ABERTA;

    if(this.trabalhador != null && typeof this.trabalhador.codigo != 'undefined') {
      this.objetoAtualiza.codigoTrabalhador = this.trabalhador.codigo;
    }

    if(this.cbo != null && typeof this.cbo.codigo != 'undefined') {
      this.objetoAtualiza.codigoCbo = this.cbo.codigo;
    }

    if(this.empregador != null && typeof this.empregador.codigo != 'undefined') {
      this.objetoAtualiza.codigoEmpregador = this.empregador.codigo;
    }

    this.completarFormalInformal();

    this.objetoAtualiza.listaVagaDia = [];

    if(this.objetoAtualiza.tipoVaga == 'I') {
      if(this.objetoAtualiza.tipoDescricaoVaga == 'F') {
        this.listaVagaDia.forEach(element => {
          this.objetoAtualiza.listaVagaDia.push(element);
        });
      } else {
        this.objetoAtualiza.listaVagaDia.push(this.vagaDia);
      }
    }
  }

  completarAlterar() {
    
    this.objetoAtualiza.auditoria.codigoUsuarioAlteracao = this.getCodigoUsuarioLogado();
    this.objetoAtualiza.auditoria.dataAlteracao = new Date();

    // if(this.listaVagaAgendamento != null && this.listaVagaAgendamento.length > 0) {
    //   this.objetoAtualiza.listaVagaAgendamento = this.listaVagaAgendamento;
    // }

    if(this.trabalhador != null && typeof this.trabalhador.codigo != 'undefined') {
      this.objetoAtualiza.codigoTrabalhador = this.trabalhador.codigo;
    }

    if(this.cbo != null && typeof this.cbo.codigo != 'undefined') {
      this.objetoAtualiza.codigoCbo = this.cbo.codigo;
    }

    if(this.empregador != null && typeof this.empregador.codigo != 'undefined') {
      this.objetoAtualiza.codigoEmpregador = this.empregador.codigo;
    }

    this.completarFormalInformal();

    this.objetoAtualiza.listaVagaDia = [];

    if(this.objetoAtualiza.tipoVaga == 'I') {
      
      if(this.objetoAtualiza.tipoDescricaoVaga == 'F') {
        this.listaVagaDia.forEach(element => {
          this.objetoAtualiza.listaVagaDia.push(element);
        });
      } else {
        this.objetoAtualiza.listaVagaDia.push(this.vagaDia);
      }
    }
  }

  adicionarDiaFreguesia() {

    if(this.vagaDia == null || this.vagaDia.data == null || 
       this.vagaDia.horarioEntrada == "" || typeof this.vagaDia.horarioEntrada == "undefined") {
          this.mensagem.tratarErroPersonalizado("", "Preencha todos os campos com * para adicionar um dia para a freguesia.");
          return false;   
    }
    else{
      if(this.vagaDia.horarioEntrada.length < 4 || this.vagaDia.horarioSaida.length < 4) {
        this.mensagem.tratarErroPersonalizado("", "O campo horário deve ter no mínimo 4 dígitos. ex: 08:00.");
        return false;
      }
    }

    let dataAtual: Date = new Date();
    dataAtual.setHours(0);
    dataAtual.setMinutes(0);
    dataAtual.setSeconds(0);
    dataAtual.setMilliseconds(0);
    let dataVaga: Date = new Date(this.vagaDia.data);

    if(dataVaga.getTime() < dataAtual.getTime()) {
      this.mensagem.tratarErroPersonalizado("", "A Data do Serviço não pode ser menor que a Data de Hoje.");
      return false;
    }

    if(this.vagaDia.horarioEntrada != "" && typeof this.vagaDia.horarioEntrada != "undefined"
       && this.vagaDia.horarioSaida != "" && typeof this.vagaDia.horarioSaida != "undefined") {

        let numeroIni: number = parseInt(this.vagaDia.horarioEntrada);
        let numeroFim: number = parseInt(this.vagaDia.horarioSaida);

        if(numeroIni > numeroFim) {
          this.mensagem.tratarErroPersonalizado("", "O campo Entrada deve ser menor que o campo Saída.");
          return false;   
        }
    }

    let retorno: boolean = true;

    if(this.listaVagaDia != null) {
      this.listaVagaDia.forEach(element => {
        if(new Date(element.data).toDateString() === new Date(this.vagaDia.data).toDateString()) {
          this.mensagem.tratarErroPersonalizado("", "Esta data já foi adicionada na lista.");
          retorno = false;    
        }
      });
    }

    if(retorno) {
      let obj = new VagaDia();
      obj.data = new Date(this.vagaDia.data);
      obj.horarioEntrada = this.vagaDia.horarioEntrada;
      obj.horarioSaida = this.vagaDia.horarioSaida;

      this.listaVagaDia.push(obj);
      this.vagaDia = new VagaDia();
    }
    
  }

  removerDiaFreguesia(index) {
    this.listaVagaDia.splice(index,1);
  }

  selecionarEndereco(codigoEndereco) {
    this.objetoAtualiza.codigoEndereco = codigoEndereco;
  }

  validarInserir() {

    if(this.cbo == null || (typeof this.cbo.codigo == 'undefined')) {
      this.mensagem.tratarErroPersonalizado("", "O campo Ocupação é obrigatório.");
      return false;
    }

    if(this.objetoAtualiza.descricao == null || this.objetoAtualiza.descricao == '') {
      this.mensagem.tratarErroPersonalizado("", "O campo Descrição é obrigatório.");
      return false;
    }

    // Regras nominal e freguesia
    if(this.objetoAtualiza.tipoVaga == 'I' && (this.objetoAtualiza.tipoDescricaoVaga == 'N' || this.objetoAtualiza.tipoDescricaoVaga == 'F')
            && (this.trabalhador == null || typeof this.trabalhador.codigo == 'undefined')) {
      this.mensagem.tratarErroPersonalizado("", "O campo Trabalhador é obrigatório.");
      return false;
    }

    if(this.objetoAtualiza.tipoVaga == 'I') {
      if(this.objetoAtualiza.tipoDescricaoVaga == 'F') {
        // Freguesia
        if(this.listaVagaDia == null || this.listaVagaDia.length <= 1) {
          this.mensagem.tratarErroPersonalizado("", "É necessário informar pelo menos dois dias para a freguesia.");
          return false;
        }
      } else {
        // Nominal ou Geral
        if(this.vagaDia == null || this.vagaDia.data == null || 
           this.vagaDia.horarioEntrada == "" || typeof this.vagaDia.horarioEntrada == "undefined" ||
           this.vagaDia.horarioSaida == "" || typeof this.vagaDia.horarioSaida == "undefined")
        {
          this.mensagem.tratarErroPersonalizado("", "É necessário informar os dados com * para a Data do Serviço.");
          return false;
        }
        else
        {
          if(this.vagaDia.horarioEntrada.length < 4 || this.vagaDia.horarioSaida.length < 4) {
            this.mensagem.tratarErroPersonalizado("", "O campo horário deve ter no mínimo 4 dígitos. ex: 08:00.");
            return false;
          }
        }
      }
    }    

    if(this.empregador == null) {
      this.mensagem.tratarErroPersonalizado("", "O campo Empregador é obrigatório.");
      return false;
    }

    if(this.objetoAtualiza.codigoEndereco == null) {
      this.mensagem.tratarErroPersonalizado("", "É necessário selecionar o endereço que o serviço será realizado.");
      return false;
    }

    return true;
  }

  completarFormalInformal(){

    if (this.objetoAtualiza.tipoVaga == 'F') {
      this.objetoAtualiza.tipoDescricaoVaga = null;
      this.objetoAtualiza.listaVagaDia = [];
    } else {
      //TRABALHADOR INFORMAL
      this.objetoAtualiza.dataLimite = null;
      this.objetoAtualiza.direcionamento = null;
    }
  }

  validarAlterar() {
    return this.validarInserir();
  }

  voltar() {
    this.back('vaga-pesquisar');
  }

  completarPosInserir() {
    this.router.navigate(['vaga-pesquisar']);
  }

  completarPosAlterar() {
    this.router.navigate(['vaga-pesquisar']);
  }

}
