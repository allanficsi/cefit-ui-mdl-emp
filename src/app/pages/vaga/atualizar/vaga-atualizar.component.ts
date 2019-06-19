import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Vaga } from '../../../model/vaga/vaga';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { DialogService } from '../../../services/shared/dialog.service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { VagaService } from '../../../services/vaga/vaga.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ResponseApi } from '../../../model/response-api';
import { startWith, map } from 'rxjs/operators';
import { CadastroUnico } from 'src/app/model/cadastro-unico/cadastro-unico';
import { Cbo } from 'src/app/model/trabalhador/cbo';
import { CboService } from 'src/app/services/trabalhador/cbo.service';
import { VagaAgendamento } from 'src/app/model/vaga/vaga-agendamento';
import { Parametro } from 'src/app/model/geral/parametro';
import { ParametroService } from './../../../services/geral/parametro.service';
import { Empregador } from './../../../model/empregador/empregador';
import { EmpregadorService } from './../../../services/empregador/empregador.service';
import { ModalEmpregadorComponent } from '../../geral/modal-empregador/modal-empregador.component';
import { Auditoria } from '../../../model/auditoria';
import { Trabalhador } from '../../../model/trabalhador/trabalhador';
import { TrabalhadorService } from '../../../services/trabalhador/trabalhador.service';
import { VagaDia } from 'src/app/model/vaga/vaga-dia';
import { element } from '@angular/core/src/render3/instructions';


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
  listaVagaAgendamento = [];

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
              dialogService: DialogService) {
    super(router, route, dialog, Vaga, service, mensagem, dialogService);
  }

  iniciarPaginaInserir() {
    this.objetoAtualiza.tipoVaga = "I";
    this.objetoAtualiza.tipoDescricaoVaga = "G";
    this.flagSelecionarTodosAgenda = true;
  }

  iniciarPaginaAlterar() {
    let vaga: Vaga = new Vaga();
    vaga.codigo = +this.codigo;

    // GET VAGA COM O CODIGO
    this.service.get(vaga).subscribe((responseApi:ResponseApi) => {      
      this.objetoAtualiza = responseApi.data;
      this.objetoAtualiza.dataInicio = new Date(this.objetoAtualiza.dataInicio);

      if(this.objetoAtualiza.dataFim != null) {
        this.objetoAtualiza.dataFim = new Date(this.objetoAtualiza.dataFim);
      } else {
        this.objetoAtualiza.dataFim = null;
      }
      
      // Nominal
      if(this.objetoAtualiza.tipoDescricaoVaga == 'N') {
        this.trabalhador = this.objetoAtualiza.trabalhadorEntity;
      }
      
      // Freguesia
      if(this.objetoAtualiza.tipoDescricaoVaga == 'F') {
        this.objetoAtualiza.listaVagaDia.forEach(elementVagaDia => {
          this.listaDia.forEach(elementDia => {
            if(elementVagaDia.codigoDia == elementDia.valor) {
              elementDia.fgSelecionada = true;
            }
          });
        });
      }

      this.cbo = this.objetoAtualiza.cboEntity;
      this.empregador = this.objetoAtualiza.empregadorEntity;
      this.listaVagaAgendamento = this.objetoAtualiza.listaVagaAgendamentoOrdenada;

      this.carregarVagaAgendamento();

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

    this.popularTrabalhador();
    this.popularCbo();
    this.iniciarVagaAgendamento();

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

  iniciarVagaAgendamento() {
    // Recuperando os horarios default da agenda
    let hor1, hor2, hor3, hor4;
    
    let parametro = new Parametro();
    parametro.nome = "HORARIO_AGENDA_VAGA";

    this.parametroService.get(parametro).subscribe((responseApi:ResponseApi) => {
        parametro = responseApi.data;
        hor1 = parametro.valor.split(',')[0];
        hor2 = parametro.valor.split(',')[1];
        hor3 = parametro.valor.split(',')[2];
        hor4 = parametro.valor.split(',')[3];

        this.listaVagaAgendamento = [];

        this.listaDia.forEach(element => {
          let vagaAgendamento = new VagaAgendamento();
          vagaAgendamento.flagAtivo = true;
          vagaAgendamento.numeroDia = element.valor;
          vagaAgendamento.nomeDia = element.nome;
          vagaAgendamento.numeroHora1 = hor1;
          vagaAgendamento.numeroHora2 = hor2;
          vagaAgendamento.numeroHora3 = hor3;
          vagaAgendamento.numeroHora4 = hor4;
          this.listaVagaAgendamento.push(vagaAgendamento);
        });
    } , err => {
      this.mensagem.tratarErro(err);  
    });
  }

  carregarVagaAgendamento() {
    if(this.listaVagaAgendamento != null && typeof this.listaVagaAgendamento !== 'undefined') {
      for (let i = 0; i < this.listaVagaAgendamento.length; i++) {
        for (let j = 0; j < this.listaDia.length; j++) {
          if(this.listaVagaAgendamento[i].numeroDia == this.listaDia[j].valor) {
            this.listaVagaAgendamento[i].nomeDia = this.listaDia[j].nome;
          }
        }
      }
    }
  }

  popularCbo() {
    let cbo = new Cbo();

    this.cboService.pesquisar(cbo)
                .subscribe((responseApi:ResponseApi) => {
      this.listaCbo = responseApi['data'];
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  popularTrabalhador() {
    let trabalhador: Trabalhador = new Trabalhador();
    trabalhador.situacaoIngresso = TrabalhadorService.APROVADO;
    trabalhador.situacao = TrabalhadorService.SITUACAO_ATIVA;

    this.trabalhadorService.pesquisar(trabalhador)
                .subscribe((responseApi:ResponseApi) => {
      this.listaTrabalhador = responseApi['data'];
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  selecionarDiaAgenda(index) {
    if(!this.listaVagaAgendamento[index].flagAtivo) {
      this.listaVagaAgendamento[index].numeroHora1 = null;
      this.listaVagaAgendamento[index].numeroHora2 = null;
      this.listaVagaAgendamento[index].numeroHora3 = null;
      this.listaVagaAgendamento[index].numeroHora4 = null;
    }
  }

  selecionarTodosAgenda() {
    this.listaVagaAgendamento.forEach(element => {
      if(this.flagSelecionarTodosAgenda) {
        element.flagAtivo = true;
        element.numeroHora1 = null;
        element.numeroHora2 = null;
        element.numeroHora3 = null;
        element.numeroHora4 = null;
      } else {
        element.flagAtivo = false;
      }
    });

    if(this.flagSelecionarTodosAgenda) {
      this.iniciarVagaAgendamento();
    }
  }

  pesquisarEmpregador() {
    if(this.filtroEmpregador != null && this.filtroEmpregador.length >= 3) {
      let empregador = new Empregador();
      empregador.situacao = EmpregadorService.SITUACAO_ATIVA;
      empregador.filtroGenerico = this.filtroEmpregador;

      this.empregadorService.pesquisar(empregador)
          .subscribe((responseApi:ResponseApi) => {
        this.listaEmpregador = responseApi['data'];

        if(this.listaEmpregador.length > 1) {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.width = '900px';
          dialogConfig.height = '450px';
          dialogConfig.data = {listaResultado: this.listaEmpregador};

          this.dialog.open(ModalEmpregadorComponent, dialogConfig)
                                  .afterClosed().subscribe((data) => {
            
            this.empregador = data;

          });
        } else {
          this.empregador = this.listaEmpregador[0];
        }
      } , err => {
      this.mensagem.tratarErro(err);
      });
    } else {
      this.mensagem.tratarErroPersonalizado("","Informe pelo menos 3 caracteres para selecionar o empregador.");
    }
  }

  replicarHorario(index) {
    let hor1 = this.listaVagaAgendamento[index].numeroHora1;
    let hor2 = this.listaVagaAgendamento[index].numeroHora2;
    let hor3 = this.listaVagaAgendamento[index].numeroHora3;
    let hor4 = this.listaVagaAgendamento[index].numeroHora4;

    this.listaVagaAgendamento.forEach(element => {
      element.numeroHora1 = hor1;
      element.numeroHora2 = hor2;
      element.numeroHora3 = hor3;
      element.numeroHora4 = hor4;
    });
  }

  limparAllHorario() {
    this.listaVagaAgendamento.forEach(element => {
      element.numeroHora1 = null;
      element.numeroHora2 = null;
      element.numeroHora3 = null;
      element.numeroHora4 = null;
    });
  }

  selecionarCaracteristica() {
    this.trabalhador = new Trabalhador();
    this.trabalhador.cadastroUnico = new CadastroUnico();

    this.listaDia.forEach(element => {
      element.fgSelecionada = false;
    });
  }

  completarInserir() {
    this.objetoAtualiza.auditoria = new Auditoria();
    this.objetoAtualiza.auditoria.codigoUsuarioInclusao = this.getCodigoUsuarioLogado();
    this.objetoAtualiza.auditoria.dataInclusao = new Date();
    this.objetoAtualiza.situacao = VagaService.SITUACAO_ABERTA;

    if(this.listaVagaAgendamento != null && this.listaVagaAgendamento.length > 0) {
      this.objetoAtualiza.listaVagaAgendamento = this.listaVagaAgendamento;
    }

    if(this.trabalhador != null && typeof this.trabalhador.codigo != 'undefined') {
      this.objetoAtualiza.codigoTrabalhador = this.trabalhador.codigo;
    }

    if(this.cbo != null && typeof this.cbo.codigo != 'undefined') {
      this.objetoAtualiza.codigoCbo = this.cbo.codigo;
    }

    if(this.empregador != null && typeof this.empregador.codigo != 'undefined') {
      this.objetoAtualiza.codigoEmpregador = this.empregador.codigo;
    }

    this.objetoAtualiza.listaVagaDia = [];
    this.listaDia.forEach(element => {
      if(typeof element.fgSelecionada != 'undefined' && element.fgSelecionada) {
        let vagaDia = new VagaDia();
        vagaDia.codigoDia = element.valor;
        this.objetoAtualiza.listaVagaDia.push(vagaDia);
      }
    });
  }

  completarAlterar() {
    
    this.objetoAtualiza.auditoria.codigoUsuarioAlteracao = this.getCodigoUsuarioLogado();
    this.objetoAtualiza.auditoria.dataAlteracao = new Date();

    if(this.listaVagaAgendamento != null && this.listaVagaAgendamento.length > 0) {
      this.objetoAtualiza.listaVagaAgendamento = this.listaVagaAgendamento;
    }

    if(this.trabalhador != null && typeof this.trabalhador.codigo != 'undefined') {
      this.objetoAtualiza.codigoTrabalhador = this.trabalhador.codigo;
    }

    if(this.cbo != null && typeof this.cbo.codigo != 'undefined') {
      this.objetoAtualiza.codigoCbo = this.cbo.codigo;
    }

    if(this.empregador != null && typeof this.empregador.codigo != 'undefined') {
      this.objetoAtualiza.codigoEmpregador = this.empregador.codigo;
    }

    this.objetoAtualiza.listaVagaDia = [];
    this.listaDia.forEach(element => {
      if(typeof element.fgSelecionada != 'undefined' && element.fgSelecionada) {
        let vagaDia = new VagaDia();
        vagaDia.codigoDia = element.valor;
        this.objetoAtualiza.listaVagaDia.push(vagaDia);
      }
    });

    console.log(this.objetoAtualiza);
  }

  validarInserir() {

    if(this.objetoAtualiza.descricao == null || this.objetoAtualiza.descricao == '') {
      this.mensagem.tratarErroPersonalizado("", "O campo Descrição é obrigatório.");
      return false;
    }

    if(this.cbo == null || (typeof this.cbo.codigo == 'undefined')) {
      this.mensagem.tratarErroPersonalizado("", "O campo CBO é obrigatório.");
      return false;
    }

    // Regras nominal e freguesia
    if(this.objetoAtualiza.tipoDescricaoVaga == 'N'
            && (this.trabalhador == null || typeof this.trabalhador.codigo == 'undefined')) {
      this.mensagem.tratarErroPersonalizado("", "O campo Funcionário é obrigatório.");
      return false;
    } else {
      if(this.objetoAtualiza.tipoDescricaoVaga == 'F') {
        let flag = false;
        this.listaDia.forEach(element => {
          if(typeof element.fgSelecionada != 'undefined' && element.fgSelecionada == true) {
            flag = true;
          }
        });

        if(!flag) {
          this.mensagem.tratarErroPersonalizado("", "Selecione pelo menos um dia da semana quando for freguesia.");
          return false;
        } 
      }
    }


    if(this.objetoAtualiza.dataInicio == null || (this.objetoAtualiza.dataInicio.toString() == '')) {
      this.mensagem.tratarErroPersonalizado("", "O campo Data Início é obrigatório.");
      return false;
    }

    if(this.empregador == null) {
      this.mensagem.tratarErroPersonalizado("", "O campo Empregador é obrigatório.");
      return false;
    }

    return true;
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