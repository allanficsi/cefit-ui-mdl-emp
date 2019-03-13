import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogService } from 'src/app/services/shared/confirm-dialog.service';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { DialogService } from '../../../dialog-service';
import { Acao } from '../../../model/acao/acao';
import { Auditoria } from '../../../model/auditoria';
import { ResponseApi } from '../../../model/response-api';
import { AcaoService } from '../../../services/acao/acao.service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { FormControl } from '@angular/forms';
import { Espaco } from '../../../model/espaco/espaco';
import { Observable } from 'rxjs/Observable';
import { EspacoService } from 'src/app/services/espaco/espaco.service';
import { startWith, map } from 'rxjs/operators';
import { ExtensaoEndereco } from 'src/app/model/cadastro-unico/extensao-endereco';
import { Endereco } from '../../../model/cadastro-unico/endereco';
import { TipoAcao } from '../../../model/acao/tipo-acao';
import { TipoAcaoService } from '../../../services/acao/tipo-acao.service';
import { Agenda } from 'src/app/model/acao/agenda';
import { IMyDateRangeModel } from 'mydaterangepicker';
import { UtilService } from '../../../services/util.service';
import { FeriadoService } from '../../../services/geral/feriado.service';
import { Feriado } from '../../../model/geral/feriado';
import { FeriadoFiltro } from '../../../model/geral/filtro/feriado-filtro';
import { Parametro } from '../../../model/geral/parametro';
import { ParametroService } from '../../../services/geral/parametro.service';
import { Profissional } from '../../../model/profissional/profissional';
import { ModalTipoAcaoComponent } from '../../geral/modal-tipo-acao/modal-tipo-acao.component';
import { ProfissionalService } from 'src/app/services/profissional/profissional.service';
import { AcaoProfissional } from 'src/app/model/acao/acao-profissional';
import { CadastroUnico } from 'src/app/model/cadastro-unico/cadastro-unico';


@Component({
  selector: 'app-acao-atualizar',
  templateUrl: './acao-atualizar.component.html',
  styleUrls: ['./acao-atualizar.component.css']
})
export class AcaoAtualizarComponent extends AptareCrudController<Acao, {new(): Acao}>{

  periodo: any;
  agenda: Agenda;
  listaAgenda = [];

  profissional: Profissional;

  endereco: Endereco;
  capacidade: Number;
  listaEspaco = [];
  listaProfissional = [];
  listaItens = [];
  listaTipoAcao = [];
  listaFeriado = [];

  myControlEspaco: FormControl = new FormControl();
  filteredOptionsEspaco: Observable<Espaco[]>;

  myControlProfissional: FormControl = new FormControl();
  filteredOptionsProfissional: Observable<Profissional[]>;

  constructor(router: Router,
              dialogService: DialogService,
              route: ActivatedRoute,
              dialog: MatDialog,
              service: AcaoService,
              private espacoService: EspacoService,
              private profissionalService: ProfissionalService,
              private feriadoService: FeriadoService,
              private tipoAcaoService: TipoAcaoService,
              private parametroService: ParametroService,
              private _location: Location,
              mensagem: MensagemService,
              confirm: ConfirmDialogService) {
    super(router, route, dialogService, dialog, Acao, service, mensagem, confirm);    
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.objetoAtualiza.listaAcaoProfissional = [];

    // Autocomplete espaco
    this.filteredOptionsEspaco = this.myControlEspaco.valueChanges
      .pipe(
        startWith<string | Espaco>(''),
        map(value => typeof value === 'string' ? value : value.nome),
        map(nome => nome ? this._filterEspaco(nome) : this.listaEspaco.slice())
      );


    // Autocomplete profissional
    this.filteredOptionsProfissional = this.myControlProfissional.valueChanges
      .pipe(
        startWith<string | Profissional>(''),
        map(value => typeof value === 'string' ? value : value.cadastroUnico.nome),
        map(nome => nome ? this._filterProfissional(nome) : this.listaProfissional.slice())
      );
  }

  displayFnEspaco(espaco?: Espaco): string | undefined {
    return espaco ? espaco.nome : undefined;
  }

  displayFnProfissional(profissional?: Profissional): string | undefined {
    return profissional ? profissional.cadastroUnico.nome : undefined;
  }

  private _filterEspaco(nome: string): Espaco[] {
    const filterValue = nome.toLowerCase();

    return this.listaEspaco.filter(option => option.nome.toLowerCase().indexOf(filterValue) > -1);
  }

  private _filterProfissional(nome: string): Profissional[] {
    const filterValue = nome.toLowerCase();

    return this.listaProfissional.filter(option => option.cadastroUnico.nome.toLowerCase().indexOf(filterValue) > -1);
  }

  selecionarEspaco() {
    if(typeof this.objetoAtualiza.espaco !== "undefined" && typeof this.objetoAtualiza.espaco.codigo !== "undefined") {
      
      let espaco: Espaco = new Espaco();
      espaco.codigo = this.objetoAtualiza.espaco.codigo;

      this.espacoService.get(espaco).subscribe((responseApi:ResponseApi) => {
        espaco = responseApi.data;
        this.capacidade = espaco.capacidade;
        this.endereco = espaco.endereco;

        let eex: ExtensaoEndereco = new ExtensaoEndereco();

        if(espaco.endereco.correio != null) {
          eex.logradouro = espaco.endereco.correio.logradouro;
          eex.bairro = espaco.endereco.correio.bairro;
          eex.localidade = espaco.endereco.correio.localidade;
          eex.uf = espaco.endereco.correio.uf;
        } else {
          eex.logradouro = espaco.endereco.extensaoEndereco.logradouro;
          eex.bairro = espaco.endereco.extensaoEndereco.bairro;
          eex.localidade = espaco.endereco.extensaoEndereco.localidade;
          eex.uf = espaco.endereco.extensaoEndereco.uf;
        }

        this.endereco.extensaoEndereco = eex;
        this.listaItens = espaco.listaEspacoItemEspaco;

      } , err => {
        this.listaItens = [];
        this.objetoAtualiza.espaco = new Espaco();
        this.endereco = null;
        this.capacidade = null;
        this.mensagem.tratarErro(err);  
      });
      
    } else {
      this.listaItens = [];
      this.objetoAtualiza.espaco = new Espaco();
      this.endereco = null;
      this.capacidade = null;
    }
  }

  voltar() {
    this._location.back();
  }

  setListasStaticas() {
    this.popularEspaco();
    this.popularProfissional();
    this.popularTipoAcao(null);
  }

  popularEspaco() {
    let espaco: Espaco = new Espaco();
    //espaco.flagAtivo = 'S';

    this.espacoService.pesquisar(espaco)
                .subscribe((responseApi:ResponseApi) => {
      this.listaEspaco = responseApi['data']; 
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  popularProfissional() {
    let profissional: Profissional = new Profissional();
    profissional.flagAtivo = "S";

    this.profissionalService.pesquisar(profissional)
                .subscribe((responseApi:ResponseApi) => {
      this.listaProfissional = responseApi['data'];
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  popularTipoAcao(codigo) {
    let obj: TipoAcao = new TipoAcao();

    this.tipoAcaoService.pesquisar(obj)
                .subscribe((responseApi:ResponseApi) => {
      this.listaTipoAcao = responseApi['data']; 
      if(codigo != null && typeof codigo !== "undefined") {
        for(let i = 0; i < this.listaTipoAcao.length; i++) {
          if(codigo == this.listaTipoAcao[i].codigo) {
            this.objetoAtualiza.tipoAcao = this.listaTipoAcao[i];
          }
        }
      } else {
        this.objetoAtualiza.tipoAcao = null;
      }
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  preparaAddTipoAcao() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '710px';
    dialogConfig.height = '250px';

    this.dialog.open(ModalTipoAcaoComponent, dialogConfig)
                            .afterClosed().subscribe((data) => {
      this.popularTipoAcao(data.codigo);
    });

  }

  iniciarPaginaAlterar() {
    let acao: Acao = new Acao();
    acao.codigo = +this.codigo;

    // GET ACAO COM O CODIGO
    this.service.get(acao).subscribe((responseApi:ResponseApi) => {              
      this.objetoAtualiza = responseApi.data;
    } , err => {
      this.mensagem.tratarErro(err);  
    });
  }

  completarInserir() {
    //this.objetoAtualiza.flagAtivo = 'S';
    this.objetoAtualiza.flagValeRefeicao == null || typeof this.objetoAtualiza.flagValeRefeicao === 'undefined' ? this.objetoAtualiza.flagValeRefeicao = false : ''; 
    this.objetoAtualiza.flagValeTransporte == null || typeof this.objetoAtualiza.flagValeTransporte === 'undefined' ? this.objetoAtualiza.flagValeTransporte = false : ''; 
    this.objetoAtualiza.codigoTipoAcao = this.objetoAtualiza.tipoAcao.codigo;
    this.objetoAtualiza.codigoEspaco = this.objetoAtualiza.espaco.codigo;
    this.objetoAtualiza.auditoria = new Auditoria();
    this.objetoAtualiza.auditoria.codigoUsuarioInclusao = this.getCodigoUsuarioLogado();
    this.objetoAtualiza.auditoria.dataInclusao = new Date();

    if(this.listaAgenda != null && this.listaAgenda.length > 0) {
      this.objetoAtualiza.listaAgenda = this.listaAgenda;
    }
  }

  completarAlterar() {
    this.objetoAtualiza.auditoria = new Auditoria();
    this.objetoAtualiza.auditoria.codigoUsuarioAlteracao = this.getCodigoUsuarioLogado();
    this.objetoAtualiza.auditoria.dataAlteracao = new Date();
  }

  completarPosInserir() {
    this.router.navigate(['acao-pesquisar']);
  }

  completarPosAlterar() {
    this.router.navigate(['acao-pesquisar']);
  }

  validarInserir() {
    //VALIDACAO DE CAMPOS OBRIGATORIOS
    if(this.objetoAtualiza.espaco == null || (typeof this.objetoAtualiza.espaco.codigo == 'undefined')) {
      this.mensagem.tratarErroPersonalizado("", "O campo Espaço é obrigatório.");
      return false;
    }

    if(this.objetoAtualiza.nome == null || this.objetoAtualiza.nome == '') {
      this.mensagem.tratarErroPersonalizado("", "O campo Nome é obrigatório.");
      return false;
    }

    if(this.objetoAtualiza.numeroVagas == null || this.objetoAtualiza.numeroVagas <= 0) {
      this.mensagem.tratarErroPersonalizado("", "O campo Número de Vagas é obrigatório.");
      return false;
    }

    if(this.objetoAtualiza.tipoAcao == null || this.objetoAtualiza.tipoAcao.codigo <= 0) {
      this.mensagem.tratarErroPersonalizado("", "O campo Tipo de Ação é obrigatório.");
      return false;
    }

    return true;
  }

  gerarGridHorarios(event: IMyDateRangeModel) {
    
    if(event.beginDate.year == 0 && event.beginDate.month == 0 && event.beginDate.day == 0
        && event.endDate.year == 0 && event.endDate.month == 0 && event.endDate.day == 0)
    {
      this.listaAgenda = [];
      return;
    }

    // Datas inicio e fim selecionadas
    let dataInicio = new Date(event.beginDate.year, event.beginDate.month-1, event.beginDate.day);
    let dataFim = new Date(event.endDate.year, event.endDate.month-1, event.endDate.day);

    // Recuperando lista de feriados no período
    let feriado = new Feriado();
    feriado.filtro = new FeriadoFiltro();
    feriado.filtro.dataInicio = dataInicio;
    feriado.filtro.dataFim = dataFim;
    
    this.feriadoService.pesquisar(feriado).subscribe((responseApi:ResponseApi) => {

      this.listaFeriado = responseApi.data;
      let listaDatas = UtilService.getInstance().getDiasFromInterval(dataInicio, dataFim);
      this.listaAgenda = [];


      // Recuperando os horarios default da agenda
      let hor1, hor2, hor3, hor4;

      let parametro = new Parametro();
      parametro.nome = "HORARIO_AGENDA_ACAO";

      this.parametroService.get(parametro).subscribe((responseApi:ResponseApi) => {
        parametro = responseApi.data;
        hor1 = parametro.valor.split(',')[0];
        hor2 = parametro.valor.split(',')[1];
        hor3 = parametro.valor.split(',')[2];
        hor4 = parametro.valor.split(',')[3];

        listaDatas.forEach(element => {
          let agenda = new Agenda();
          agenda.dataAgenda = element;
          agenda.flagAtivo = 'S';
          agenda.codigoEspaco = this.objetoAtualiza.codigoEspaco;
          agenda.nrHor1 = hor1;
          agenda.nrHor2 = hor2;
          agenda.nrHor3 = hor3;
          agenda.nrHor4 = hor4;

          // verificando fim de semana
          if(agenda.dataAgenda.getDay() == 6) {
            agenda.fgFds = true;
            agenda.nomeDia = "Sábado";
            agenda.nrHor1 = null;
            agenda.nrHor2 = null;
            agenda.nrHor3 = null;
            agenda.nrHor4 = null;
          } else {
            if(agenda.dataAgenda.getDay() == 0) {
              agenda.fgFds = true;
              agenda.nomeDia = "Domingo";
              agenda.nrHor1 = null;
              agenda.nrHor2 = null;
              agenda.nrHor3 = null;
              agenda.nrHor4 = null;
            } else {
              agenda.fgFds = false;
              agenda.nomeDia = "";
            }
          }

          //verificando feriado
          agenda.fgFeriado = false;
          this.listaFeriado.forEach(elemFer => {
            if(new Date(element).getTime() == new Date(elemFer.dataFeriado).getTime()) {
              agenda.fgFeriado = true;
              agenda.nrHor1 = null;
              agenda.nrHor2 = null;
              agenda.nrHor3 = null;
              agenda.nrHor4 = null;
              agenda.nomeDia = "Feriado";
            }
          });

          agenda.auditoria = new Auditoria();
          agenda.auditoria.codigoUsuarioInclusao = this.getCodigoUsuarioLogado();
          agenda.auditoria.dataInclusao = new Date();

          this.listaAgenda.push(agenda);
        });
      } , err => {
        this.mensagem.tratarErro(err);  
      });

    } , err => {
      this.mensagem.tratarErro(err);  
    });
  }

  replicarHorario(index) {
    let hor1 = this.listaAgenda[index].nrHor1;
    let hor2 = this.listaAgenda[index].nrHor2;
    let hor3 = this.listaAgenda[index].nrHor3;
    let hor4 = this.listaAgenda[index].nrHor4;

    this.listaAgenda.forEach(element => {
      if(!element.fgFds && !element.fgFeriado) {
        element.nrHor1 = hor1;
        element.nrHor2 = hor2;
        element.nrHor3 = hor3;
        element.nrHor4 = hor4;
      }
    });
  }

  excluirProfissional(index) {
    this.objetoAtualiza.listaAcaoProfissional.splice(index,1);
  }

  adicionarProfissional() {
    if(this.profissional == null || this.profissional.codigo == null) {
      this.mensagem.tratarErroPersonalizado("","O campo Profissional é obrigatório.");
      return false;
    }

    //VERIFICANDO SE O ITEM JA FOI ADICIONADO
    if(this.objetoAtualiza.listaAcaoProfissional != null
       && this.objetoAtualiza.listaAcaoProfissional.length > 0) {
      for(let i = 0; i < this.objetoAtualiza.listaAcaoProfissional.length; i++) {
        if(this.profissional.codigo === this.objetoAtualiza.listaAcaoProfissional[i].profissional.codigo) {
          this.mensagem.tratarErroPersonalizado("","Este item já foi adicionado.");
          return false;
        }
      }
    }

    let obj = new AcaoProfissional();
    obj.codigoProfissional = this.profissional.codigo;
    obj.profissional = this.profissional;
    
    this.objetoAtualiza.listaAcaoProfissional.push(obj);
    this.resetAcaoProfissional();
  }

  resetAcaoProfissional() {
    this.profissional = new Profissional();
    this.profissional.cadastroUnico = new CadastroUnico();
  }

  limparAllHorario() {
    this.listaAgenda.forEach(element => {
      element.nrHor1 = null;
      element.nrHor2 = null;
      element.nrHor3 = null;
      element.nrHor4 = null;
    });
  }

  limparHorario(index) {
    this.listaAgenda[index].nrHor1 = null;
    this.listaAgenda[index].nrHor2 = null;
    this.listaAgenda[index].nrHor3 = null;
    this.listaAgenda[index].nrHor4 = null;
  }

  validarAlterar() {
    return this.validarInserir();
  }

}