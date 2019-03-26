import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { Auditoria } from '../../../model/auditoria';
import { Local } from '../../../model/espaco/local';
import { ResponseApi } from '../../../model/response-api';
import { LocalService } from '../../../services/espaco/local.service';
import { DialogService } from '../../../services/shared/dialog.service';
import { MensagemService } from '../../../services/shared/mensagem.service';


@Component({
  selector: 'app-local-atualizar',
  templateUrl: './local-atualizar.component.html',
  styleUrls: ['./local-atualizar.component.css']
})
export class LocalAtualizarComponent extends AptareCrudController<Local, {new(): Local}>{ 

  constructor(router: Router,
              route: ActivatedRoute,  
              dialog: MatDialog,
              service: LocalService,
              private _location: Location,
              mensagem: MensagemService,
              dialogService: DialogService) {
    super(router, route, dialog, Local, service, mensagem, dialogService);    
  }

  voltar() {
    this._location.back();
  }

  iniciarPaginaAlterar() {
    let localidade: Local = new Local();
    localidade.codigo = +this.codigo;

    // GET LOCALIDADE COM O CODIGO
    this.service.get(localidade).subscribe((responseApi:ResponseApi) => {              
      this.objetoAtualiza = responseApi.data;
    } , err => {
      this.mensagem.tratarErro(err);  
    });
  }

  completarInserir() {
    this.objetoAtualiza.nome = this.objetoAtualiza.nome.toUpperCase();
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
    this.router.navigate(['local-pesquisar']);
  }

  completarPosAlterar() {
    this.router.navigate(['local-pesquisar']);
  }

  validarInserir() {
    //VALIDACAO DE CAMPOS OBRIGATORIOS
    if(this.objetoAtualiza.nome == null || this.objetoAtualiza.nome == '') {
      this.mensagem.tratarErroPersonalizado("", "O campo Nome é obrigatório.");
      return false;
    }

    return true;
  }

  validarAlterar() {
    return this.validarInserir();
  }

}