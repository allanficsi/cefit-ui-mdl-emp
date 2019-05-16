import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Dominio } from '../../../model/geral/dominio';
import { ResponseApi } from '../../../model/response-api';
import { DominioService } from 'src/app/services/geral/dominio.service';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { Auditoria } from '../../../model/auditoria';
import { Vaga } from '../../../model/vaga/vaga';
import { DialogService } from '../../../services/shared/dialog.service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { VagaService } from '../../../services/vaga/vaga.service';
import { FiltroVaga } from '../../../model/vaga/filtro/filtro-vaga';
import { ModalVagaFinalizarComponent } from '../../geral/modal-vaga-finalizar/modal-vaga-finalizar.component';

@Component({
  selector: 'app-vaga-gerenciar',
  templateUrl: './vaga-gerenciar.component.html',
  styleUrls: ['./vaga-gerenciar.component.css']
})
export class VagaGerenciarComponent extends AptareCrudController<Vaga, {new(): Vaga}>{

  listaSituacao = [];
  listaTipoVaga = [];

  constructor(router: Router, 
              route: ActivatedRoute,             
              public service: VagaService,
              private dominioService: DominioService,
              dialog: MatDialog,
              mensagem: MensagemService,
              dialogService: DialogService
              ) {
    super(router, route, dialog, Vaga, service, mensagem, dialogService);
  }

  setListasStaticas() {
    this.listaTipoVaga = [{nome: "Formal", valor: "F"}, {nome: "Informal", valor: "I"}];
    this.popularSituacao();
  }

  iniciarPaginaPesquisar() {
    this.objetoPesquisa.situacao = null;
    this.pesquisar();
  }

  popularSituacao() {
    let dominio: Dominio = new Dominio();
    dominio.nomeCampo = 'ST_VAG';

    this.dominioService.pesquisar(dominio)
                .subscribe((responseApi:ResponseApi) => {
      this.listaSituacao = responseApi['data'];
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  alterarStatusVaga(codigo, situacao) {
    let vaga: Vaga = new Vaga();
    vaga.codigo = codigo;
    vaga.situacao = situacao;
    vaga.auditoria = new Auditoria();
    vaga.auditoria.codigoUsuarioAlteracao = this.getCodigoUsuarioLogado();

    this.service.alterarSituacaoVaga(vaga)
                .subscribe((responseApi:ResponseApi) => {
      this.mensagem.msgSucesso("A vaga foi atualizada com sucesso.");

      this.pesquisar();
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  completarPesquisar() {
    let arrayTipo = [];
    let filtro = new FiltroVaga();

    this.listaTipoVaga.forEach(element => {
      if(typeof element.fgSelecionado != 'undefined' && element.fgSelecionado){
        arrayTipo.push(element.valor);
      }
    });

    if(arrayTipo.length > 0) {
      filtro.tipoVagaIN = arrayTipo;
      this.objetoPesquisa.filtro = filtro;
    }
  }

  finalizar(codigo) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '710px';
    dialogConfig.height = '320px';
    dialogConfig.data = {codigo: codigo};

    this.dialog.open(ModalVagaFinalizarComponent, dialogConfig)
                            .afterClosed().subscribe((data) => {
      this.pesquisar();
    });
  }

  editar(codigo) {
    this.router.navigate(['/vaga-atualizar', codigo]);
  }

}
