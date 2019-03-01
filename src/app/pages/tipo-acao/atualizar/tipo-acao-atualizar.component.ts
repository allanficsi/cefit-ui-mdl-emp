import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { DialogService } from '../../../dialog-service';
import { Auditoria } from '../../../model/auditoria';
import { Cargo } from '../../../model/cadastro-unico/cargo';
import { ResponseApi } from '../../../model/response-api';
import { CargoService } from '../../../services/cadastro-unico/cargo.service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { Qualificacao } from '../../../model/profissional/qualificacao';
import { QualificacaoService } from '../../../services/profissional/qualificacao.service';
import { ConfirmDialogService } from '../../../services/shared/confirm-dialog.service';
import { TipoAcao } from '../../../model/acao/tipo-acao';
import { TipoAcaoService } from '../../../services/acao/tipo-acao.service';


@Component({
  selector: 'app-tipo-acao-atualizar',
  templateUrl: './tipo-acao-atualizar.component.html',
  styleUrls: ['./tipo-acao-atualizar.component.css']
})
export class TipoAcaoAtualizarComponent extends AptareCrudController<TipoAcao, {new(): TipoAcao}>{ 

  constructor(router: Router,
              dialogService: DialogService,
              route: ActivatedRoute,  
              dialog: MatDialog,                   
              service: TipoAcaoService,
              private _location: Location,
              mensagem: MensagemService,
              confirm: ConfirmDialogService) {
    super(router, route, dialogService, dialog, TipoAcao, service, mensagem, confirm);    
  }

  voltar() {
    this._location.back();
  }

  iniciarPaginaAlterar() {
    let tipoAcao: TipoAcao = new TipoAcao();
    tipoAcao.codigo = +this.codigo;

    this.service.get(tipoAcao).subscribe((responseApi:ResponseApi) => {              
      this.objetoAtualiza = responseApi.data;
    } , err => {
      this.mensagem.tratarErro(err);  
    });
  }

  completarInserir() {
    this.objetoAtualiza.flagAtivo = 'S';
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
    this.router.navigate(['tipo-acao-pesquisar']);
  }

  completarPosAlterar() {
    this.router.navigate(['tipo-acao-pesquisar']);
  }

  validarInserir() {
    //VALIDACAO DE CAMPOS OBRIGATORIOS
    if(this.objetoAtualiza.descricao == null || this.objetoAtualiza.descricao == '') {
      this.mensagem.tratarErroPersonalizado("", "O campo Descrição é obrigatório.");
      return false;
    }

    return true;
  }

  validarAlterar() {
    return this.validarInserir();
  }

}