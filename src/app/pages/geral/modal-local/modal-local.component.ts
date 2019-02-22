import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalService } from '../../../services/espaco/local.service';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { DialogService } from '../../../dialog-service';
import { Auditoria } from '../../../model/auditoria';
import { Local } from '../../../model/espaco/local';
import { MensagemService } from '../../../services/shared/mensagem.service';

@Component({
  selector: 'app-modal-local',
  templateUrl: './modal-local.component.html',
  styleUrls: ['./modal-local.component.css']
})
export class ModalLocalComponent extends AptareCrudController<Local, {new(): Local}>{

  constructor(router: Router, 
              route: ActivatedRoute,             
              service: LocalService,
              dialog: MatDialog,
              dialogService: DialogService,
              public dialogRef: MatDialogRef<ModalLocalComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              mensagem: MensagemService) {
    super(router, route, dialogService, dialog, Local, service, mensagem);   
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
    if(this.objetoAtualiza.nome == null || this.objetoAtualiza.nome == '') {
      this.mensagem.tratarErroPersonalizado("", "O campo Nome é obrigatório.");
      return false;
    }

    return true;
  }
}
