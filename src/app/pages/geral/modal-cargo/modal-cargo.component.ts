import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { DialogService } from '../../../dialog-service';
import { Telefone } from '../../../model/cadastro-unico/telefone';
import { Empregador } from '../../../model/empregador/empregador';
import { Dominio } from '../../../model/geral/dominio';
import { ResponseApi } from '../../../model/response-api';
import { CargoService } from '../../../services/cadastro-unico/cargo.service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { Cargo } from '../../../model/cadastro-unico/cargo';
import { Auditoria } from '../../../model/auditoria';

@Component({
  selector: 'app-modal-cargo',
  templateUrl: './modal-cargo.component.html',
  styleUrls: ['./modal-cargo.component.css']
})
export class ModalCargoComponent extends AptareCrudController<Cargo, {new(): Cargo}>{

  constructor(router: Router, 
              route: ActivatedRoute,             
              service: CargoService,
              dialog: MatDialog,
              dialogService: DialogService,
              public dialogRef: MatDialogRef<ModalCargoComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              mensagem: MensagemService) {
    super(router, route, dialogService, dialog, Cargo, service, mensagem);   
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
