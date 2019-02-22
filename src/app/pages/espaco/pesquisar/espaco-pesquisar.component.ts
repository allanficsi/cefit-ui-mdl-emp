import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { DialogService } from '../../../dialog-service';
import { Espaco } from '../../../model/espaco/espaco';
import { EspacoService } from '../../../services/espaco/espaco.service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { ModalItemManutencaoComponent } from '../../geral/modal-item-manutencao/modal-item-manutencao.component';

@Component({
  selector: 'app-espaco-pesquisar',
  templateUrl: './espaco-pesquisar.component.html',
  styleUrls: ['./espaco-pesquisar.component.css']
})
export class EspacoPesquisarComponent extends AptareCrudController<Espaco, {new(): Espaco}>{

  constructor(router: Router, 
              route: ActivatedRoute,             
              service: EspacoService,
              dialog: MatDialog,
              dialogService: DialogService,
              mensagem: MensagemService) {
    super(router, route, dialogService, dialog, Espaco, service, mensagem);
  }

  inativarItemEspaco(codigo) {
    let espaco: Espaco = new Espaco();
    espaco.codigo = codigo;

    this.inativar(espaco);
  }

  ativarItemEspaco(codigo) {
    let espaco: Espaco = new Espaco();
    espaco.codigo = codigo;

    this.ativar(espaco);
  }

  statusInativar(obj: Espaco) {
    this.listaResultado.forEach(function (value) {
      if(value.codigo == obj.codigo) {
        value.flagAtivo = 'N';
      }
    });
  }

  statusAtivar(obj: Espaco) {
    this.listaResultado.forEach(function (value) {
      if(value.codigo == obj.codigo) {
        value.flagAtivo = 'S';
      }
    });
  }

  editar(id:string) {    
    this.router.navigate(['/espaco-atualizar', id]);
  }

}
