import {Component, Inject, OnInit} from '@angular/core';
import {AptareCrudController} from '../../../components/shared/crud/aptare-crud-controller';
import {TrabalhadorAgenda} from '../../../model/trabalhador/trabalhador-agenda';
import {ActivatedRoute, Router} from '@angular/router';
import {ContatoService} from '../../../services/cadastro-unico/contato.service';
import {CargoService} from '../../../services/cadastro-unico/cargo.service';
import {DominioService} from '../../../services/geral/dominio.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {MensagemService} from '../../../services/shared/mensagem.service';
import {DialogService} from '../../../services/shared/dialog.service';
import {Contato} from '../../../model/cadastro-unico/contato';
import {AgendaTrabalhadorService} from '../../../services/trabalhador/agenda-trabalhador.service';
import {Cargo} from '../../../model/cadastro-unico/cargo';
import {ResponseApi} from '../../../model/response-api';
import {Trabalhador} from '../../../model/trabalhador/trabalhador';
import {TrabalhadorService} from '../../../services/trabalhador/trabalhador.service';
import {UtilService} from '../../../services/util.service';

@Component({
  selector: 'app-modal-editar-agenda',
  templateUrl: './modal-editar-agenda.component.html',
  styleUrls: ['./modal-editar-agenda.component.css']
})
export class ModalEditarAgendaComponent extends AptareCrudController<Trabalhador, {new():Trabalhador}> {

  objetoAgendaPesquisar;
  listaResultadoAgenda =[];
  constructor(router: Router,
              route: ActivatedRoute,
              public service: TrabalhadorService,
              private trabalhadorService: TrabalhadorService,
              private dominioService: DominioService,
              private agendaTrabalhadorService:AgendaTrabalhadorService,
              dialog: MatDialog,
              public dialogRef: MatDialogRef<ModalEditarAgendaComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              mensagem: MensagemService,
              dialogService: DialogService) {
    super(router, route, dialog, Trabalhador, service, mensagem, dialogService);
  }

  ngOnInit(): void {

    this.objetoAtualiza = new Trabalhador();
    this.objetoAgendaPesquisar = this.data;
    this.popularAgenda();
    this.setListasStaticas();
  }

  popularAgenda() {
    this.agendaTrabalhadorService.pesquisar(this.objetoAgendaPesquisar)
      .subscribe((responseApi: ResponseApi) => {
        //TODAS AS AGENDAS DO TRABALHADOR
        this.listaResultadoAgenda = responseApi['data'];
        this.iniciarPaginaAlterar();
      }, err => {
        this.mensagem.tratarErro(err);
      });
  }

  //ORDENA LISTA DE AGENDAS DE FORMA CRESCENTE 0..6
  protected iniciarPaginaAlterar() {
    this.listaResultadoAgenda.sort((a, b) => (a.nrDia > b.nrDia ? 1 : -1));
  }

  salvar() {

    this.dialogService.openConfirmDialog('Deseja realmente atualizar os itens ?')
      .afterClosed().subscribe(res => {

      if (res) {
        let flag: boolean = true;
        this.objetoAtualiza.listaTrabalhadorAgenda = [];

        this.listaResultadoAgenda.forEach(element => {
          this.objetoAtualiza.listaTrabalhadorAgenda.push(element);
        });

        // Salvando alterações
        if(flag) {
          this.service.salvarManutencao(this.objetoAtualiza).subscribe((responseApi:ResponseApi) => {
            this.mensagem.msgSucesso('O registro foi alterado com sucesso.');
            this.fechar();
          } , err => {
            this.mensagem.tratarErro(err);
          });
        } else {
          this.mensagem.tratarErroPersonalizado("", "Houve algum erro no nosso servidor.");
          return false;
        }
      }
    });

  }

  fechar() {
    this.dialogRef.close();
  }

  replicarHorario(i,item) {
    this.listaResultadoAgenda.forEach((element, index) => {
      if (index != i && element.flagSel && item.flagSel) {
        console.log(element.flagSel);
        element.nrHor1 = this.listaResultadoAgenda[i].nrHor1;
        element.nrHor2 = this.listaResultadoAgenda[i].nrHor2;
        element.nrHor3 = this.listaResultadoAgenda[i].nrHor3;
        element.nrHor4 = this.listaResultadoAgenda[i].nrHor4;
      }
    });
  }

  limparAllHorario() {
    this.listaResultadoAgenda.forEach(element => {
      element.nrHor1 = null;
      element.nrHor2 = null;
      element.nrHor3 = null;
      element.nrHor4 = null;
    });
  }

  limparHorario(item) {
    if(item.flagSel==false){
      item.nrHor1=null;
      item.nrHor2=null;
      item.nrHor3=null;
      item.nrHor4=null;
    }
  }

}
