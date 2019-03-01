import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
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
import { UtilService } from 'src/app/services/util.service';
import { FeriadoService } from 'src/app/services/geral/feriado.service';
import { Feriado } from 'src/app/model/geral/feriado';
import { FeriadoFiltro } from 'src/app/model/geral/filtro/feriado-filtro';
import { Parametro } from 'src/app/model/geral/parametro';
import { ParametroService } from 'src/app/services/geral/parametro.service';


@Component({
  selector: 'app-acao-atualizar',
  templateUrl: './acao-atualizar.component.html',
  styleUrls: ['./acao-atualizar.component.css']
})
export class AcaoAtualizarComponent extends AptareCrudController<Acao, {new(): Acao}>{

  periodo: any;
  agenda: Agenda;
  listaAgenda = [];

  endereco: Endereco;
  capacidade: Number;
  listaEspaco = [];
  listaItens = [];
  listaTipoAcao = [];
  listaFeriado = [];
  myControlEspaco: FormControl = new FormControl();
  filteredOptions: Observable<Espaco[]>;

  constructor(router: Router,
              dialogService: DialogService,
              route: ActivatedRoute,
              dialog: MatDialog,
              service: AcaoService,
              private espacoService: EspacoService,
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
    this.filteredOptions = this.myControlEspaco.valueChanges
      .pipe(
        startWith<string | Espaco>(''),
        map(value => typeof value === 'string' ? value : value.nome),
        map(nome => nome ? this._filter(nome) : this.listaEspaco.slice())
      );
  }

  displayFn(espaco?: Espaco): string | undefined {
    return espaco ? espaco.nome : undefined;
  }

  private _filter(nome: string): Espaco[] {
    const filterValue = nome.toLowerCase();

    return this.listaEspaco.filter(option => option.nome.toLowerCase().indexOf(filterValue) === 0);
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
    this.popularTipoAcao(null);
  }

  popularEspaco() {
    let espaco: Espaco = new Espaco();

    this.espacoService.pesquisar(espaco)
                .subscribe((responseApi:ResponseApi) => {
      this.listaEspaco = responseApi['data']; 
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

  iniciarPaginaAlterar() {
    let acao: Acao = new Acao();
    acao.codigo = +this.codigo;

    // GET EMPREGADOR COM O CODIGO
    this.service.get(acao).subscribe((responseApi:ResponseApi) => {              
      this.objetoAtualiza = responseApi.data;
    } , err => {
      this.mensagem.tratarErro(err);  
    });
  }

  completarInserir() {
    //this.objetoAtualiza.flagAtivo = 'S';
    this.objetoAtualiza.auditoria = new Auditoria();
    this.objetoAtualiza.auditoria.codigoUsuarioInclusao = this.getCodigoUsuarioLogado();
    this.objetoAtualiza.auditoria.dataInclusao = new Date();
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
    if(this.objetoAtualiza.nome == null || this.objetoAtualiza.nome == '') {
      this.mensagem.tratarErroPersonalizado("", "O campo Nome é obrigatório.");
      return false;
    }

    return true;
  }

  gerarGridHorarios(event: IMyDateRangeModel) {
    
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
            agenda.nomeDia = "Sabado";
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

          console.log(agenda);
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