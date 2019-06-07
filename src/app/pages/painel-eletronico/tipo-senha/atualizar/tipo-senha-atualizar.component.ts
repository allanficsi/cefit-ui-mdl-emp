import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AptareCrudController } from '../../../../components/shared/crud/aptare-crud-controller';
import { Auditoria } from '../../../../model/auditoria';
import { Guiche } from '../../../../model/painel-eletronico/guiche';
import { TipoSenha } from '../../../../model/painel-eletronico/tipo-senha';
import { ResponseApi } from '../../../../model/response-api';
import { GuicheService } from '../../../../services/painel-eletronico/guiche.service';
import { DialogService } from '../../../../services/shared/dialog.service';
import { MensagemService } from '../../../../services/shared/mensagem.service';
import { TipoSenhaService } from '../../../../services/painel-eletronico/tipo-senha.service';


@Component({
  selector: 'app-tipo-senha-atualizar',
  templateUrl: './tipo-senha-atualizar.component.html',
  styleUrls: ['./tipo-senha-atualizar.component.css']
})
export class TipoSenhaAtualizarComponent extends AptareCrudController<TipoSenha, {new(): TipoSenha}>{ 

  constructor(router: Router,
              route: ActivatedRoute,  
              dialog: MatDialog,                   
              service: TipoSenhaService,
              private _location: Location,
              mensagem: MensagemService,
              dialogService: DialogService) {
    super(router, route, dialog, TipoSenha, service, mensagem, dialogService);    
  }

  voltar() {
    this._location.back();
  }

  iniciarPaginaAlterar() {
    let tipoSenha: TipoSenha = new TipoSenha();
    tipoSenha.codigo = +this.codigo;

    this.service.get(tipoSenha).subscribe((responseApi:ResponseApi) => {              
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
    this.router.navigate(['tipo-senha-pesquisar']);
  }

  completarPosAlterar() {
    this.router.navigate(['tipo-senha-pesquisar']);
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
