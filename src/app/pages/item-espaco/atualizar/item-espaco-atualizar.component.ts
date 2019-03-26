import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { Auditoria } from '../../../model/auditoria';
import { ItemEspaco } from '../../../model/espaco/item-espaco';
import { ResponseApi } from '../../../model/response-api';
import { ItemEspacoService } from '../../../services/espaco/item-espaco.service';
import { DialogService } from '../../../services/shared/dialog.service';
import { MensagemService } from '../../../services/shared/mensagem.service';


@Component({
  selector: 'app-item-espaco-atualizar',
  templateUrl: './item-espaco-atualizar.component.html',
  styleUrls: ['./item-espaco-atualizar.component.css']
})
export class ItemEspacoAtualizarComponent extends AptareCrudController<ItemEspaco, {new(): ItemEspaco}>{ 

  constructor(router: Router,
              route: ActivatedRoute,  
              dialog: MatDialog,                   
              service: ItemEspacoService,
              private _location: Location,
              mensagem: MensagemService,
              dialogService: DialogService) {
    super(router, route, dialog, ItemEspaco, service, mensagem, dialogService);    
  }

  voltar() {
    this._location.back();
  }

  iniciarPaginaAlterar() {
    let itemEspaco: ItemEspaco = new ItemEspaco();
    itemEspaco.codigo = +this.codigo;

    // GET EMPREGADOR COM O CODIGO
    this.service.get(itemEspaco).subscribe((responseApi:ResponseApi) => {              
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
    this.router.navigate(['item-espaco-pesquisar']);
  }

  completarPosAlterar() {
    this.router.navigate(['item-espaco-pesquisar']);
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