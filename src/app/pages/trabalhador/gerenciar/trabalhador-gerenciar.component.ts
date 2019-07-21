import { Component } from '@angular/core';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { Trabalhador } from '../../../model/trabalhador/trabalhador';
import { ActivatedRoute, Router } from '@angular/router';
import { TrabalhadorService } from '../../../services/trabalhador/trabalhador.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DominioService } from '../../../services/geral/dominio.service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { DialogService } from '../../../services/shared/dialog.service';
import { CadastroUnico } from '../../../model/cadastro-unico/cadastro-unico';
import { PessoaFisica } from '../../../model/cadastro-unico/pessoa-fisica';
import { Dominio } from '../../../model/geral/dominio';
import { ResponseApi } from '../../../model/response-api';
import { Auditoria } from '../../../model/auditoria';
import { ModalAtivarInativarTrabalhadorComponent } from '../../geral/modal-situacao-trabalhador/modal-ativar-inativar-trabalhador.component';
import { ModalAlterarSituacaoTrabalhadorComponent } from '../../geral/modal-situacao-ingresso-trabalhador/modal-alterar-situacao-trabalhador.component';

@Component({
  selector: 'app-trabalhador-gerenciar',
  templateUrl: './trabalhador-gerenciar.component.html',
  styleUrls: ['./trabalhador-gerenciar.component.css']
})
export class TrabalhadorGerenciarComponent extends AptareCrudController<Trabalhador, {new(): Trabalhador}> {

  listaSituacao = [];

  //SITUAÇÃO DE INGRESSO NO PROGRAMA
  pendenteAvalicao = TrabalhadorService.PENDENTE_DE_AVALIACAO;
  pendenteValidacao = TrabalhadorService.PENDENTE_DE_VALIDACAO;
  encaminhadoAvalicao = TrabalhadorService.ENCAMINHADO_PARA_A_AVALIACAO;
  encaminhadoCapacitacao = TrabalhadorService.ENCAMINHADO_PARA_A_CAPACITACAO;
  encaminhadoEntrevistaOcuapcional = TrabalhadorService.ENCAMINHADO_PARA_A_ENTREVISTA_OCUPACIONAL;
  restricaoAvalicao = TrabalhadorService.RESTRICAO_POR_AVALIACAO;
  restricaoCapacitacao = TrabalhadorService.RESTRICAO_POR_CAPACITACAO;
  restricaoEntrevistaOcupacional = TrabalhadorService.RESTRICAO_POR_ENTREVISTA_OCUPACIONAL;
  aprovado = TrabalhadorService.APROVADO;
  aprovadoAvalicao = TrabalhadorService.APROVADO_NA_AVALIACAO;

  //MENSAGENS
  msgPendenteAvalicao = TrabalhadorService.MSG_PENDENTE_DE_AVALIACAO;
  msgPendenteValidacao = TrabalhadorService.MSG_PENDENTE_DE_VALIDACAO;
  msgEncaminhadoAvalicao = TrabalhadorService.MSG_ENCAMINHADO_PARA_A_AVALIACAO;
  msgEncaminhadoCapacitacao =TrabalhadorService.MSG_ENCAMINHADO_PARA_A_CAPACITACAO;
  msgEncaminhadoEntrevistaOcuapcional = TrabalhadorService.MSG_ENCAMINHADO_PARA_A_ENTREVISTA_OCUPACIONAL;
  msgRestricaoAvalicao = TrabalhadorService.MSG_RESTRICAO_POR_AVALIACAO;
  msgRestricaoCapacitacao = TrabalhadorService.MSG_RESTRICAO_POR_CAPACITACAO;
  msgRestricaoEntrevistaOcupacional = TrabalhadorService.MSG_RESTRICAO_POR_ENTREVISTA_OCUPACIONAL;
  msgAprovado = TrabalhadorService.MSG_APROVADO;
  msgAprovadoAvalicao =  TrabalhadorService.APROVADO_NA_AVALIACAO;
  msgReecaminhadoAvalicao = TrabalhadorService.MSG_REENCAMINHADO_PARA_A_AVALIACAO;
  msgReecaminhadoCapacitacao = TrabalhadorService.MSG_REENCAMINHADO_PARA_A_CAPACITACAO;
  msgReecaminhadoEntrevistaOcuapcional = TrabalhadorService.MSG_REENCAMINHADO_PARA_A_ENTREVISTA_OCUPACIONAL;

  constructor(router: Router,
              route: ActivatedRoute,
              public service: TrabalhadorService,
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

    this.objetoPesquisa.situacaoIngresso=null;

    this.popularSituacao();
  }

  popularSituacao() {
    let dominio: Dominio = new Dominio();
    dominio.nomeCampo = 'ST_INC_PGR';

    this.dominioService.pesquisar(dominio)
      .subscribe((responseApi:ResponseApi) => {
        this.listaSituacao = responseApi['data'];
      } , err => {
        this.mensagem.tratarErro(err);
      });
  }

  alterarSituacaoComAvalicao(codigo, situacao) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '710px';
    dialogConfig.height = '280px';
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose = true;
    dialogConfig.data = {codigo: codigo,situacao:situacao};

    this.dialog.open(ModalAlterarSituacaoTrabalhadorComponent, dialogConfig)
      .afterClosed().subscribe((flagAtulizarRegistros) => {
        if(flagAtulizarRegistros)
         this.atualizarSitucoes();
    });
  }

  ativarInativarTrabalhador(codigo) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '710px';
    dialogConfig.height = '320px';
    dialogConfig.autoFocus=false;
    dialogConfig.disableClose=true;
    dialogConfig.data = {codigo: codigo};

    this.dialog.open(ModalAtivarInativarTrabalhadorComponent, dialogConfig)
      .afterClosed().subscribe((flagAtulizarRegistros) => {

      if (flagAtulizarRegistros) {
        this.atualizarSitucoes();
      }

    });
  }

  alterarSituacaoIngresso(codigo, situacao,msg) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '710px';
    dialogConfig.height = '280px';
    dialogConfig.autoFocus=false;
    dialogConfig.data = {codigo: codigo};

    this.dialogService.openConfirmDialog(msg)
      .afterClosed().subscribe(res => {

      if (res) {
        let trabalhador: Trabalhador = new Trabalhador();

        trabalhador.codigo = codigo;
        trabalhador.situacaoIngresso = situacao;
        trabalhador.auditoria = new Auditoria();
        trabalhador.auditoria.codigoUsuarioAlteracao = this.getCodigoUsuarioLogado();

        this.service.alterarSituacaoDeIngresso(trabalhador)
          .subscribe((responseApi: ResponseApi) => {
            this.atualizarSitucoes();
          }, err => {
            this.mensagem.tratarErro(err);
          });
      }
    });

  }
  editar(id, msg){
    //this.dialogService.openConfirmDialog(msg)
    //  .afterClosed().subscribe(res => {
    //    if(res)
         super.editar('/trabalhador-atualizar', id);
    //});
  }

  private atualizarSitucoes() {
    this.service.pesquisar(this.objetoPesquisa)
      .subscribe((responseApi:ResponseApi) => {
        this.listaResultado = responseApi['data'];
        this.mensagem.msgSucesso("A situação foi atualizada com sucesso.");
      } , err => {
        this.mensagem.tratarErro(err);
      });
  }
}
