import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { DialogService } from '../../../dialog-service';
import { Local } from '../../../model/espaco/local';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { LocalService } from '../../../services/espaco/local.service';

@Component({
  selector: 'app-local-pesquisar',
  templateUrl: './local-pesquisar.component.html',
  styleUrls: ['./local-pesquisar.component.css']
})
export class LocalPesquisarComponent extends AptareCrudController<Local, {new(): Local}>{

  constructor(router: Router, 
              route: ActivatedRoute,             
              service: LocalService,
              dialog: MatDialog,
              dialogService: DialogService,
              mensagem: MensagemService) {
    super(router, route, dialogService, dialog, Local, service, mensagem);
  }

  inativarItemEspaco(codigo) {
    let local: Local = new Local();
    local.codigo = codigo;

    this.inativar(local);
  }

  ativarItemEspaco(codigo) {
    let local: Local = new Local();
    local.codigo = codigo;

    this.ativar(local);
  }

  statusInativar(obj: Local) {
    this.listaResultado.forEach(function (value) {
      if(value.codigo == obj.codigo) {
        value.flagAtivo = 'N';
      }
    });
  }

  statusAtivar(obj: Local) {
    this.listaResultado.forEach(function (value) {
      if(value.codigo == obj.codigo) {
        value.flagAtivo = 'S';
      }
    });
  }

  editar(id:string) {    
    this.router.navigate(['/local-atualizar', id]);
  }

}
