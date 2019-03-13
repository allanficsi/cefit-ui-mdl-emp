import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoAcao } from 'src/app/model/acao/tipo-acao';
import { TipoAcaoService } from 'src/app/services/acao/tipo-acao.service';
import { ConfirmDialogService } from 'src/app/services/shared/confirm-dialog.service';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { DialogService } from '../../../dialog-service';
import { Auditoria } from '../../../model/auditoria';
import { MensagemService } from '../../../services/shared/mensagem.service';

@Component({
  selector: 'app-modal-tipo-acao',
  templateUrl: './modal-tipo-acao.component.html',
  styleUrls: ['./modal-tipo-acao.component.css']
})
export class ModalTipoAcaoComponent extends AptareCrudController<TipoAcao, {new(): TipoAcao}>{

  constructor(router: Router, 
              route: ActivatedRoute,             
              service: TipoAcaoService,
              dialog: MatDialog,
              dialogService: DialogService,
              public dialogRef: MatDialogRef<ModalTipoAcaoComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              mensagem: MensagemService,
              confirm: ConfirmDialogService) {
    super(router, route, dialogService, dialog, TipoAcao, service, mensagem, confirm);   
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
      this.mensagem.tratarErroPersonalizado("", "O campo Nome é obrigatório.");
      return false;
    }

    return true;
  }
}
