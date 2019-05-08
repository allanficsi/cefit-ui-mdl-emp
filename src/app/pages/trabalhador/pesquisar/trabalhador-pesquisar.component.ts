import { Component } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { CadastroUnico } from '../../../model/cadastro-unico/cadastro-unico';
import { PessoaFisica } from '../../../model/cadastro-unico/pessoa-fisica';
import { Dominio } from '../../../model/geral/dominio';
import { ResponseApi } from '../../../model/response-api';
import { Trabalhador } from '../../../model/trabalhador/trabalhador';
import { DominioService } from '../../../services/geral/dominio.service';
import { DialogService } from '../../../services/shared/dialog.service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { TrabalhadorService } from '../../../services/trabalhador/trabalhador.service';
import {TrabalhadorAgenda} from '../../../model/trabalhador/trabalhador-agenda';
import {ModalEditarItemEspacoComponent} from '../../geral/modal-editar-item-espaco/modal-editar-item-espaco.component';
import {ModalEditarAgendaComponent} from '../../geral/modal-editar-agenda/modal-editar-agenda.component';
import {AgendaTrabalhadorService} from '../../../services/trabalhador/agenda-trabalhador.service';

@Component({
  selector: 'app-trabalhador-pesquisar',
  templateUrl: './trabalhador-pesquisar.component.html',
  styleUrls: ['./trabalhador-pesquisar.component.css']
})
export class TrabalhadorPesquisarComponent extends AptareCrudController<Trabalhador, {new(): Trabalhador}>{

  listaSituacao = [];

  constructor(router: Router, 
              route: ActivatedRoute,             
              service: TrabalhadorService,
              dialog: MatDialog,
              private dominioService: DominioService,
              mensagem: MensagemService,
              dialogService: DialogService) {
    super(router, route, dialog, Trabalhador, service, mensagem, dialogService);
  }

  iniciarPaginaPesquisar() {
    this.objetoPesquisa.cadastroUnico = new CadastroUnico();
    this.objetoPesquisa.cadastroUnico.pessoaFisica = new PessoaFisica();

    this.objetoPesquisa.cadastroUnico.tipoPessoa = 'F';

    this.popularSituacao();
  }

  popularSituacao() {
    let dominio: Dominio = new Dominio();
    dominio.nomeCampo = 'ST_EMP';

    this.dominioService.pesquisar(dominio)
                .subscribe((responseApi:ResponseApi) => {
      this.listaSituacao = responseApi['data'];
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  inativarTrabalhador(codigo) {
    let trabalhador: Trabalhador = new Trabalhador();
    trabalhador.codigo = codigo;

    this.inativar(trabalhador);
  }

  ativarTrabalhador(codigo) {
    let trabalhador: Trabalhador = new Trabalhador();
    trabalhador.codigo = codigo;

    this.ativar(trabalhador);
  }

  statusInativar(obj: Trabalhador) {
    this.listaResultado.forEach(function (value) {
      if(value.codigo == obj.codigo) {
        value.situacao = 3; //INATIVA
        value.descricaoSituacao = "INATIVO";
      }
    });
  }

  statusAtivar(obj: Trabalhador) {
    this.listaResultado.forEach(function (value) {
      if(value.codigo == obj.codigo) {
        value.situacao = 2; //ATIVA
        value.descricaoSituacao = "ATIVO";
      }
    });
  }

  novo() {
    this.router.navigate(['/trabalhador-atualizar']);
  }

  editar(id:string){   
    super.editar('/trabalhador-atualizar', id);
  }

  visualizar(id: string) {
    super.editar('/trabalhador-visualizar',id);
  }

  preparaEditarAgenda(index) {

    let agendaTrabalhador = new TrabalhadorAgenda();
    agendaTrabalhador.codigoTrabalhador = index;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '540px';
    dialogConfig.width = '700px';
    dialogConfig.data = agendaTrabalhador;

    this.dialog.open(ModalEditarAgendaComponent, dialogConfig)
      .afterClosed()
      .subscribe(value => {});
  }
}
