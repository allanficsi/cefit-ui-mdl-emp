import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { TipoAcao } from '../../../model/acao/tipo-acao';
import { Auditoria } from '../../../model/auditoria';
import { ResponseApi } from '../../../model/response-api';
import { TipoAcaoService } from '../../../services/acao/tipo-acao.service';
import { DialogService } from '../../../services/shared/dialog.service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { CadastroUnicoService } from 'src/app/services/cadastro-unico/cadastro-unico.service';


@Component({
  selector: 'app-tipo-acao-atualizar',
  templateUrl: './tipo-acao-atualizar.component.html',
  styleUrls: ['./tipo-acao-atualizar.component.css']
})
export class TipoAcaoAtualizarComponent extends AptareCrudController<TipoAcao, {new(): TipoAcao}>{ 

  constructor(router: Router,
              route: ActivatedRoute,  
              dialog: MatDialog,                   
              service: TipoAcaoService,
              private _location: Location,
              mensagem: MensagemService,
              dialogService: DialogService) {
    super(router, route, dialog, TipoAcao, service, mensagem, dialogService);    
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
    this.router.navigate(['tipo-acao-pesquisar']);
  }

  completarPosAlterar() {
    this.router.navigate(['tipo-acao-pesquisar']);
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
