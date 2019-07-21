import { Component, Inject, OnInit } from '@angular/core';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { TrabalhadorAgenda } from '../../../model/trabalhador/trabalhador-agenda';
import { ActivatedRoute, Router } from '@angular/router';
import { ContatoService } from '../../../services/cadastro-unico/contato.service';
import { CargoService }  from '../../../services/cadastro-unico/cargo.service';
import { DominioService } from '../../../services/geral/dominio.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { DialogService } from '../../../services/shared/dialog.service';
import { Contato } from '../../../model/cadastro-unico/contato';
import { AgendaTrabalhadorService } from '../../../services/trabalhador/agenda-trabalhador.service';
import { Cargo } from '../../../model/cadastro-unico/cargo';
import { ResponseApi } from '../../../model/response-api';
import { Trabalhador } from '../../../model/trabalhador/trabalhador';
import { TrabalhadorService } from '../../../services/trabalhador/trabalhador.service';
import { UtilService} from '../../../services/util.service';
import { Empregador } from '../../../model/empregador/empregador';
import { EmpregadorService } from '../../../services/empregador/empregador.service';
import { ModalEmpregadorComponent } from '../modal-empregador/modal-empregador.component';
import { TrabalhadorDeficiencia } from '../../../model/trabalhador/trabalhador-deficiencia';
import { Dominio } from '../../../model/geral/dominio';
import { TrabalhadorRejeicao } from '../../../model/trabalhador/trabalhadorRejeicao';
import { Auditoria } from '../../../model/auditoria';
import { TrabalhadorPresenca } from "../../../model/trabalhador/trabalhadorPresenca";
import { PresencaFiltro } from "../../../model/trabalhador/filtro/presenca-filtro";
import { Parametro } from "../../../model/geral/parametro";
import { ParametroService } from "../../../services/geral/parametro.service";
import { element } from "protractor";

@Component({
  selector: 'app-modal-editar-agenda',
  templateUrl: './modal-empregador-presenca.component.html',
  styleUrls: ['./modal-empregador-presenca.component.css']
})
export class ModalEmpregadorPresencaComponent extends AptareCrudController<Trabalhador, {new():Trabalhador}> {


  isMarcarTodos:boolean;
  numeroDeSemanas:Number;
  listaDePresenca = [];
  listaDePresencaSalvas = [];
  listaTrabalhadorRejeicao = [];

  constructor(router: Router,
              route: ActivatedRoute,
              public service: TrabalhadorService,
              private trabalhadorService: TrabalhadorService,
              private dominioService: DominioService,
              private empregadorService:EmpregadorService,
              private parametroService:ParametroService,
              dialog: MatDialog,
              public dialogRef: MatDialogRef<ModalEmpregadorPresencaComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              mensagem: MensagemService,
              dialogService: DialogService) {
    super(router, route, dialog, Trabalhador, service, mensagem, dialogService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.carregarTrabalhador();
  }

  setListasStaticas() {
    this.popularNumeroSemanas();
  }

  popularNumeroSemanas() {
    let dominio: Dominio = new Dominio();
    dominio.nomeCampo = 'NR_SEMANA_PRESENCA';

    this.dominioService.pesquisar(dominio)
      .subscribe((responseApi: ResponseApi) => {
        this.numeroDeSemanas = responseApi['data'][0].valorCampo;
        this.inicializaListaDePresenca();
      }, err => {
        this.mensagem.tratarErro(err);
      });
  }

  inicializaListaDePresenca() {

    let dataDeHoje =  new Date();
    let diaDaSemana = dataDeHoje.getDay();// 0..6
    let semanas = this.numeroDeSemanas;
    const DIAS = 7;
    let diasTotais = semanas.valueOf() * DIAS;

    //GERANDO NOVA LISTA DE PRESENCAS
    for (let i = diaDaSemana; i < diasTotais; i++) {
      let trabalhadorPresenca = new TrabalhadorPresenca();

      dataDeHoje.setHours(0, 0, 0, 0);
      trabalhadorPresenca.dataPresenca = new Date(dataDeHoje);
      dataDeHoje.setDate(dataDeHoje.getDate() + 1);

      this.listaDePresenca.push(trabalhadorPresenca);
    }

    //CRIANDO FILTRO PARA BUSCAR PRESENCAS SALVAS
    let trabalhadorPresenca = new TrabalhadorPresenca();

    trabalhadorPresenca.codigoTrabalhador = this.data;
    trabalhadorPresenca.flagAtivoPresenca = "S";
    let dataInicio = this.listaDePresenca[0].dataPresenca;
    let dataFim = this.listaDePresenca[this.listaDePresenca.length - 1].dataPresenca;

    trabalhadorPresenca.filtro =  new PresencaFiltro();
    trabalhadorPresenca.filtro.dataInicio = dataInicio;
    trabalhadorPresenca.filtro.dataFim = dataFim;

    //RECUPERANDO PRESENÇAS SALVAS
    this.service.listarPresencas(trabalhadorPresenca)
      .subscribe((responseApi:ResponseApi) => {

        this.objetoAtualiza = responseApi['data'];
        this.listaDePresencaSalvas  = this.objetoAtualiza.listaTrabalhadorPresenca;


        // VERIFICA SE DATA JÁ FOI SALVA ANTES
        if( this.listaDePresencaSalvas.length > 0){
          for (let i = 0; i < this.listaDePresencaSalvas.length ; i++) {
            for (let j = 0; j <this.listaDePresenca.length ; j++) {
              if(new Date(this.listaDePresencaSalvas[i].dataPresenca).valueOf() === this.listaDePresenca[j].dataPresenca.valueOf() ){
                this.listaDePresenca[j] = this.listaDePresencaSalvas[i];
                this.listaDePresenca[j].flagSel = true;
                break ;
              }

            }

          }
        }

        //DEFINE O DIA DAS SEMANA
        this.listaDePresenca.forEach(element => {
          if(new Date(element.dataPresenca).getDay() == 0) { element.nomeDia = "Domingo"       }
          if(new Date(element.dataPresenca).getDay() == 1) { element.nomeDia = "Segunda-feira" }
          if(new Date(element.dataPresenca).getDay() == 2) { element.nomeDia = "Terça-feira"   }
          if(new Date(element.dataPresenca).getDay() == 3) { element.nomeDia = "Quarta-feira"  }
          if(new Date(element.dataPresenca).getDay() == 4) { element.nomeDia = "Quinta-feira"  }
          if(new Date(element.dataPresenca).getDay() == 5) { element.nomeDia = "Sexta-feira"   }
          if(new Date(element.dataPresenca).getDay() == 6) { element.nomeDia = "Sábado"        }

        });

        this.popularHorarioPadrao();

      },err =>{
        this.mensagem.tratarErro(err);
      } )
  }

  popularHorarioPadrao() {

    let parametro: Parametro = new Parametro();
    parametro.nome = 'HORARIO_AGENDA_VAGA';

    this.parametroService.get(parametro)
      .subscribe((responseApi: ResponseApi) => {
        parametro = responseApi['data'];

        this.listaDePresenca.forEach((element, index) => {
          if(typeof  element.codigo == 'undefined' || element.codigo == null){
            element.nrHor1 = parametro.valor.split(',')[0];
            element.nrHor2 = parametro.valor.split(',')[3];
          }
        });
      }, err => {
        this.mensagem.tratarErro(err);
      });

  }

  private carregarTrabalhador() {
    let trabalhador = new Trabalhador();

    trabalhador.codigo = this.data;

    this.service.get(trabalhador).subscribe((responseApi:ResponseApi) => {
        this.objetoAtualiza = responseApi['data'];
      },
      err => this.mensagem.tratarErro(err));
  }

  Salvar() {
    this.dialogService.openConfirmDialog("Deseja realizar essa Operação ?")
      .afterClosed().subscribe(res => {
      if (res) {
        if (this.validarInserir()) {
          this.completarInserir();
          this.service.adicionarRetiraPresenca(this.objetoAtualiza)
            .subscribe((responseApi: ResponseApi) => {
              this.fechar();
              this.mensagem.msgSucesso('Operação realizada com sucesso');
            }, err => {
              this.mensagem.tratarErro(err);
            });
        }
      }
    });
  }


  validarInserir() {

    //VERIFICA SE OS CAMPOS DE HORÁRIOS DAS DATAS SELECIONADAS FORAM PREENCHIDOS
    for (let i = 0; i < this.listaDePresenca.length; i++) {
      if (this.listaDePresenca[i].flagSel == true) {
        if (this.listaDePresenca[i].nrHor1 == null || this.listaDePresenca[i].nrHor2 == null ||
          this.listaDePresenca[i].nrHor1.trim() == '' || this.listaDePresenca[i].nrHor2.trim() == '' ||
          this.listaDePresenca[i].nrHor1.trim().length == 0 || this.listaDePresenca[i].nrHor2.trim().length == 0) {
          this.mensagem.tratarErroPersonalizado('', "Informe os Horários dos dias selecionados");
          return false;
        }
      }
    }
    return true;
  }

  completarInserir(){
    this.objetoAtualiza.listaTrabalhadorPresenca = [];

    //PERCORRE LISTA PRESENCAS
    this.listaDePresenca.forEach((element:TrabalhadorPresenca) => {

      //VERIFICA SE É UMA NOVA PRESENÇA E ESTÁ SELECIONADA
      if (element.codigo == null && element.flagSel) {
        element.codigoTrabalhador = this.data;
        element.flagAtivoPresenca = "S";
        element.codigoUsuarioInclusao = this.getCodigoUsuarioLogado();
        element.dataInclusao = new Date();
        this.objetoAtualiza.listaTrabalhadorPresenca.push(element);
      }

      //VERIFICA SE É UMA PRESENÇA JÁ SALVA E FOI DESMARCADA
      if (element.codigo != null && element.flagSel == false) {
        element.flagAtivoPresenca = "N";
        element.codigoUsuarioAlteracao = this.getCodigoUsuarioLogado();
        element.dataAlteracao = new Date();
        this.objetoAtualiza.listaTrabalhadorPresenca.push(element);
      }

      //VERIFICA SE É UMA PRESENÇA JÁ SALVA E CONTINUA SELECIONADA
      if (element.codigo != null && element.flagSel == true) {
        console.log(element.nrHor2.length);
        this.objetoAtualiza.listaTrabalhadorPresenca.push(element);
      }

    });
  }

  replicarHorario(i) {
    this.listaDePresenca.forEach((element) => {
        element.nrHor1 = this.listaDePresenca[i].nrHor1;
        element.nrHor2 = this.listaDePresenca[i].nrHor2;
    });
  }

  fechar() {
    this.dialogRef.close();
  }

  limparCampos() {
    this.dialogService.openConfirmDialog('Você deseja apagar todos os campos preenchidos?')
      .afterClosed().subscribe(res => {
      if (res) {
        this.listaDePresenca.forEach(element => {
          element.nrHor1 = null;
          element.nrHor2 = null;
        });
      }
    });
  }

  marcarDesmarcarTodos(){
    this.listaDePresenca.forEach(element=>{
      element.flagSel =  this.isMarcarTodos;
    })
  }

}
