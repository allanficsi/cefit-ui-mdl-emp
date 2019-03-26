import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoAcao } from 'src/app/model/acao/tipo-acao';
import { TipoAcaoService } from 'src/app/services/acao/tipo-acao.service';
import { DialogService } from 'src/app/services/shared/dialog.service';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { Auditoria } from '../../../model/auditoria';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { CadastroUnicoService } from 'src/app/services/cadastro-unico/cadastro-unico.service';

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
              public dialogRef: MatDialogRef<ModalTipoAcaoComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              mensagem: MensagemService,
              dialogService: DialogService) {
    super(router, route, dialog, TipoAcao, service, mensagem, dialogService);   
  }

  completarInserir() {
    this.objetoAtualiza.descricao = this.objetoAtualiza.descricao.toUpperCase();
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
