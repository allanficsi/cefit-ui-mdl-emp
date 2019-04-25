import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { Acao } from '../../../model/acao/acao';
import { AcaoService } from '../../../services/acao/acao.service';
import { DialogService } from '../../../services/shared/dialog.service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { TipoAcao } from 'src/app/model/acao/tipo-acao';
import { TipoAcaoService } from 'src/app/services/acao/tipo-acao.service';
import { ResponseApi } from 'src/app/model/response-api';

@Component({
  selector: 'app-acao-pesquisar',
  templateUrl: './acao-pesquisar.component.html',
  styleUrls: ['./acao-pesquisar.component.css']
})
export class AcaoPesquisarComponent extends AptareCrudController<Acao, {new(): Acao}>{

  listaTipoAcao = [];

  constructor(router: Router, 
              route: ActivatedRoute,             
              service: AcaoService,
              private tipoAcaoService: TipoAcaoService,
              dialog: MatDialog,
              mensagem: MensagemService,
              dialogService: DialogService
              ) {
    super(router, route, dialog, Acao, service, mensagem, dialogService);
  }

  setListasStaticas() {
    this.popularTipoAcao();
  }

  iniciarPaginaPesquisar() {
    this.objetoPesquisa.tipoAcao = null;
  }

  popularTipoAcao() {
    let obj: TipoAcao = new TipoAcao();

    this.tipoAcaoService.pesquisar(obj)
                .subscribe((responseApi:ResponseApi) => {
      this.listaTipoAcao = responseApi['data']; 
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  inativarAcao(codigo) {
    let acao: Acao = new Acao();
    acao.codigo = codigo;

    this.inativar(acao);
  }

  ativarAcao(codigo) {
    let acao: Acao = new Acao();
    acao.codigo = codigo;

    this.ativar(acao);
  }

  statusInativar(obj: Acao) {
    this.listaResultado.forEach(function (value) {
      if(value.codigo == obj.codigo) {
        //value.flagAtivo = 'N';
      }
    });
  }

  statusAtivar(obj: Acao) {
    this.listaResultado.forEach(function (value) {
      if(value.codigo == obj.codigo) {
        //value.flagAtivo = 'S';
      }
    });
  }

  editar(id:string) {
    super.editar('/acao-atualizar', id);
  }

  visualizar(id:string) {
    super.editar('/acao-visualizar', id);
  }

  novo() {
    this.router.navigate(['/acao-atualizar']);
  }

}
