import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { Auditoria } from '../../../model/auditoria';
import { Qualificacao } from '../../../model/profissional/qualificacao';
import { ResponseApi } from '../../../model/response-api';
import { QualificacaoService } from '../../../services/profissional/qualificacao.service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { DialogService } from '../../../services/shared/dialog.service';
import { CadastroUnicoService } from 'src/app/services/cadastro-unico/cadastro-unico.service';


@Component({
  selector: 'app-qualificacao-atualizar',
  templateUrl: './qualificacao-atualizar.component.html',
  styleUrls: ['./qualificacao-atualizar.component.css']
})
export class QualificacaoAtualizarComponent extends AptareCrudController<Qualificacao, {new(): Qualificacao}>{ 

  constructor(router: Router,
              route: ActivatedRoute,  
              dialog: MatDialog,                   
              service: QualificacaoService,
              private _location: Location,
              mensagem: MensagemService,
              dialogService: DialogService) {
    super(router, route, dialog, Qualificacao, service, mensagem, dialogService);    
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
    this.objetoAtualiza.descricao = this.objetoAtualiza.descricao.toUpperCase();
    this.objetoAtualiza.flagAtivo = 'S';
    this.objetoAtualiza.auditoria = new Auditoria();
    this.objetoAtualiza.auditoria.codigoUsuarioInclusao = this.getCodigoUsuarioLogado();
    this.objetoAtualiza.auditoria.dataInclusao = new Date();
  }

  completarAlterar() {
    this.objetoAtualiza.descricao = this.objetoAtualiza.descricao.toUpperCase();
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
      return false;
    }

    return true;
  }

  validarAlterar() {
    return this.validarInserir();
  }

}
