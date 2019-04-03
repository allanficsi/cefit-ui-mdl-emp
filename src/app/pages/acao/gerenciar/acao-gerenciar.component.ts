import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Dominio } from 'src/app/model/geral/dominio';
import { ResponseApi } from 'src/app/model/response-api';
import { DominioService } from 'src/app/services/geral/dominio.service';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { Acao } from '../../../model/acao/acao';
import { AcaoService } from '../../../services/acao/acao.service';
import { DialogService } from '../../../services/shared/dialog.service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { Auditoria } from 'src/app/model/auditoria';

@Component({
  selector: 'app-acao-gerenciar',
  templateUrl: './acao-gerenciar.component.html',
  styleUrls: ['./acao-gerenciar.component.css']
})
export class AcaoGerenciarComponent extends AptareCrudController<Acao, {new(): Acao}>{

  listaSituacao = [];

  situacaoPendente = AcaoService.SITUACAO_PENDENTE;
  situacaoAtiva = AcaoService.SITUACAO_ATIVA;
  situacaoAbertaInscricao = AcaoService.SITUACAO_ABERTA_INSCRICAO;
  situacaoConfirmada = AcaoService.SITUACAO_CONFIRMADA;
  situacaoRealizada = AcaoService.SITUACAO_REALIZADA;
  situacaoCancelada = AcaoService.SITUACAO_CANCELADA;

  constructor(router: Router, 
              route: ActivatedRoute,             
              public service: AcaoService,
              private dominioService: DominioService,
              dialog: MatDialog,
              mensagem: MensagemService,
              dialogService: DialogService
              ) {
    super(router, route, dialog, Acao, service, mensagem, dialogService);
  }

  setListasStaticas() {
    this.popularSituacao();
  }

  iniciarPaginaPesquisar() {
    this.objetoPesquisa.situacao = null;
    this.pesquisar();
  }

  popularSituacao() {
    let dominio: Dominio = new Dominio();
    dominio.nomeCampo = 'ST_ACA';

    this.dominioService.pesquisar(dominio)
                .subscribe((responseApi:ResponseApi) => {
      this.listaSituacao = responseApi['data'];
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  alterarStatusAcao(codigo, situacao) {
    let acao: Acao = new Acao();
    acao.codigo = codigo;
    acao.situacao = situacao;
    acao.auditoria = new Auditoria();
    acao.auditoria.codigoUsuarioAlteracao = this.getCodigoUsuarioLogado();

    this.service.alterarSituacaoAcao(acao)
                .subscribe((responseApi:ResponseApi) => {
      this.mensagem.msgSucesso("A ação foi atualizada com sucesso.");

      this.pesquisar();
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  editar(codigo) {
    this.router.navigate(['/acao-atualizar', codigo]);
  }

}
