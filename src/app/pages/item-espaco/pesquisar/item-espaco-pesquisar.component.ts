import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { DialogService } from '../../../dialog-service';
import { Cargo } from '../../../model/cadastro-unico/cargo';
import { ItemEspaco } from '../../../model/espaco/item-espaco';
import { ItemEspacoService } from '../../../services/espaco/item-espaco.service';
import { MensagemService } from '../../../services/shared/mensagem.service';

@Component({
  selector: 'app-item-espaco-pesquisar',
  templateUrl: './item-espaco-pesquisar.component.html',
  styleUrls: ['./item-espaco-pesquisar.component.css']
})
export class ItemEspacoPesquisarComponent extends AptareCrudController<ItemEspaco, {new(): ItemEspaco}>{

  constructor(router: Router, 
              route: ActivatedRoute,             
              service: ItemEspacoService,
              dialog: MatDialog,
              dialogService: DialogService,
              mensagem: MensagemService) {
    super(router, route, dialogService, dialog, ItemEspaco, service, mensagem);
  }

  inativarItemEspaco(codigo) {
    let itemEspaco: ItemEspaco = new ItemEspaco();
    itemEspaco.codigo = codigo;

    this.inativar(itemEspaco);
  }

  ativarItemEspaco(codigo) {
    let itemEspaco: ItemEspaco = new ItemEspaco();
    itemEspaco.codigo = codigo;

    this.ativar(itemEspaco);
  }

  statusInativar(obj: ItemEspaco) {
    this.listaResultado.forEach(function (value) {
      if(value.codigo == obj.codigo) {
        value.flagAtivo = 'N';
      }
    });
  }

  statusAtivar(obj: ItemEspaco) {
    this.listaResultado.forEach(function (value) {
      if(value.codigo == obj.codigo) {
        value.flagAtivo = 'S';
      }
    });
  }

  editar(id:string) {    
    this.router.navigate(['/itemEspaco-atualizar', id]);
  }

}
