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


@Component({
  selector: 'app-qualificacao-atualizar',
  templateUrl: './qualificacao-atualizar.component.html',
  styleUrls: ['./qualificacao-atualizar.component.css']
})
export class QualificacaoAtualizarComponent extends AptareCrudController<Qualificacao, {new(): Qualificacao}>{ 

  constructor(router: Router,
              dialogService: DialogService,
              route: ActivatedRoute,  
              dialog: MatDialog,                   
              service: QualificacaoService,
              private _location: Location,
              mensagem: MensagemService) {
    super(router, route, dialogService, dialog, Qualificacao, service, mensagem);    
  }

  voltar() {
    this._location.back();
  }

  iniciarPaginaAlterar() {
    let qualificacao: Qualificacao = new Qualificacao();
    qualificacao.codigo = +this.codigo;

    this.service.get(qualificacao).subscribe((responseApi:ResponseApi) => {              
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
    this.router.navigate(['qualificacao-pesquisar']);
  }

  completarPosAlterar() {
    this.router.navigate(['qualificacao-pesquisar']);
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