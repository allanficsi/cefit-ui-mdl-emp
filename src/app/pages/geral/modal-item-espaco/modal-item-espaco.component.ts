import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { DialogService } from '../../../dialog-service';
import { Auditoria } from '../../../model/auditoria';
import { Cargo } from '../../../model/cadastro-unico/cargo';
import { ItemEspaco } from '../../../model/espaco/item-espaco';
import { ItemEspacoService } from '../../../services/espaco/item-espaco.service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { ConfirmDialogService } from '../../../services/shared/confirm-dialog.service';

@Component({
  selector: 'app-modal-item-espaco',
  templateUrl: './modal-item-espaco.component.html',
  styleUrls: ['./modal-item-espaco.component.css']
})
export class ModalItemEspacoComponent extends AptareCrudController<ItemEspaco, {new(): ItemEspaco}>{

  constructor(router: Router, 
              route: ActivatedRoute,             
              service: ItemEspacoService,
              dialog: MatDialog,
              dialogService: DialogService,
              public dialogRef: MatDialogRef<ModalItemEspacoComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              mensagem: MensagemService,
              confirm: ConfirmDialogService) {
    super(router, route, dialogService, dialog, Cargo, service, mensagem, confirm);   
  }

  completarInserir() {
    this.objetoAtualiza.flagAtivo = 'S';
    this.objetoAtualiza.auditoria = new Auditoria();
    this.objetoAtualiza.auditoria.codigoUsuarioInclusao = this.getCodigoUsuarioLogado();
    this.objetoAtualiza.auditoria.dataInclusao = new Date();
  }

  completarPosInserir() {
    this.fechar();
  }

  fechar() {
    this.dialogRef.close(this.objetoAtualiza);
  }

  validarInserir() {
    //VALIDACAO DE CAMPOS OBRIGATORIOS
    if(this.objetoAtualiza.descricao == null || this.objetoAtualiza.descricao == '') {
      this.mensagem.tratarErroPersonalizado("", "O campo Descrição é obrigatório.");
      return false;
    }

    return true;
  }


}
