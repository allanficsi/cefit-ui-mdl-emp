import { Component, OnInit } from '@angular/core';
import {AptareCrudController} from '../../../components/shared/crud/aptare-crud-controller';
import {Trabalhador} from '../../../model/trabalhador/trabalhador';
import {ActivatedRoute, Router} from '@angular/router';
import {TrabalhadorService} from '../../../services/trabalhador/trabalhador.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DominioService} from '../../../services/geral/dominio.service';
import {MensagemService} from '../../../services/shared/mensagem.service';
import {DialogService} from '../../../services/shared/dialog.service';
import {CadastroUnico} from '../../../model/cadastro-unico/cadastro-unico';
import {PessoaFisica} from '../../../model/cadastro-unico/pessoa-fisica';
import {Dominio} from '../../../model/geral/dominio';
import {ResponseApi} from '../../../model/response-api';
import {Acao} from '../../../model/acao/acao';
import {Auditoria} from '../../../model/auditoria';
import {ModalAtivarInativarTrabalhadorComponent} from '../../geral/modal-situacao-trabalhador/modal-ativar-inativar-trabalhador.component';

@Component({
  selector: 'app-trabalhador-gerenciar',
  templateUrl: './trabalhador-gerenciar.component.html',
  styleUrls: ['./trabalhador-gerenciar.component.css']
})
export class TrabalhadorGerenciarComponent extends AptareCrudController<Trabalhador, {new(): Trabalhador}> {

  listaSituacao = [];

  //SITUAÇÃO DE INGRESSO NO PROGRAMA
  pendenteAvalicao=TrabalhadorService.PENDENTE_DE_AVALIACAO;
  pendenteValidacao=TrabalhadorService.PENDENTE_DE_VALIDACAO;
  encaminhadoAvalicao=TrabalhadorService.ENCAMINHADO_PARA_A_AVALIACAO;
  encaminhadoCapacitacao=TrabalhadorService.ENCAMINHADO_PARA_A_CAPACITACAO;
  encaminhadoEntrevistaOcuapcional=TrabalhadorService.ENCAMINHADO_PARA_A_ENTREVISTA_OCUPACIONAL;
  restricaoAvalicao=TrabalhadorService.RESTRICAO_POR_AVALIACAO;
  restricaoCapacitacao=TrabalhadorService.RESTRICAO_POR_CAPACITACAO;
  restricaoEntrevistaOcupacional= TrabalhadorService.RESTRICAO_POR_ENTREVISTA_OCUPACIONAL;
  aprovado= TrabalhadorService.APROVADO;


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

  alterarStatuSituacao(codigo, situacao) {
    let trabalhador: Trabalhador = new Trabalhador();

    trabalhador.codigo = codigo;
    trabalhador.situacaoIngresso = situacao;
    trabalhador.auditoria = new Auditoria();
    trabalhador.auditoria.codigoUsuarioAlteracao = this.getCodigoUsuarioLogado();

    this.service.alterarSituacaoDeIngresso(trabalhador)
      .subscribe((responseApi:ResponseApi) => {
        this.mensagem.msgSucesso("A Situação de ingresso foi atualizada com sucesso.");

        this.pesquisar();
      } , err => {
        this.mensagem.tratarErro(err);
      });
  }

  mudarSitucao(codigo) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '710px';
    dialogConfig.height = '320px';
    dialogConfig.autoFocus=false;
    dialogConfig.disableClose=true;
    dialogConfig.data = {codigo: codigo};

    this.dialog.open(ModalAtivarInativarTrabalhadorComponent, dialogConfig)
      .afterClosed().subscribe((data) => {
      this.pesquisar();
    });


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

}
