import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { DialogService } from '../../../dialog-service';
import { Auditoria } from '../../../model/auditoria';
import { Cargo } from '../../../model/cadastro-unico/cargo';
import { CargoService } from '../../../services/cadastro-unico/cargo.service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { Qualificacao } from '../../../model/profissional/qualificacao';
import { QualificacaoService } from '../../../services/profissional/qualificacao.service';

@Component({
  selector: 'app-modal-qualificacao',
  templateUrl: './modal-qualificacao.component.html',
  styleUrls: ['./modal-qualificacao.component.css']
})
export class ModalQualificacaoComponent extends AptareCrudController<Qualificacao, {new(): Qualificacao}>{

  constructor(router: Router, 
              route: ActivatedRoute,             
              service: QualificacaoService,
              dialog: MatDialog,
              dialogService: DialogService,
              public dialogRef: MatDialogRef<ModalQualificacaoComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              mensagem: MensagemService) {
    super(router, route, dialogService, dialog, Qualificacao, service, mensagem);   
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
