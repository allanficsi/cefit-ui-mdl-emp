import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Empregador } from 'src/app/model/empregador/empregador';
import { EmpregadorService } from 'src/app/services/empregador/empregador.service';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { DialogService } from '../../../services/shared/dialog.service';
import { MensagemService } from '../../../services/shared/mensagem.service';

@Component({
  selector: 'app-modal-empregador',
  templateUrl: './modal-empregador.component.html',
  styleUrls: ['./modal-empregador.component.css']
})
export class ModalEmpregadorComponent extends AptareCrudController<Empregador, {new(): Empregador}>{

  constructor(router: Router, 
              route: ActivatedRoute,             
              service: EmpregadorService,
              dialog: MatDialog,
              public dialogRef: MatDialogRef<ModalEmpregadorComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              mensagem: MensagemService,
              dialogService: DialogService) {
    super(router, route, dialog, Empregador, service, mensagem, dialogService);   
  }

  selecionarEmpregador(index) {
    this.dialogRef.close(this.listaResultado[index]);
  }

  setListasStaticas() {
    this.listaResultado = this.data.listaResultado;
  }

  fechar() {
    this.dialogRef.close(this.objetoAtualiza);
  }

}
