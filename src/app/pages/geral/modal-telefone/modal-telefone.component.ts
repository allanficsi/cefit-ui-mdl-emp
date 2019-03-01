import { Component, OnInit, Inject } from '@angular/core';
import { Dominio } from '../../../model/geral/dominio';
import { Empregador } from '../../../model/empregador/empregador';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpregadorService } from '../../../services/empregador/empregador.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogService } from '../../../dialog-service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { DominioService } from '../../../services/geral/dominio.service';
import { ResponseApi } from '../../../model/response-api';
import { Telefone } from '../../../model/cadastro-unico/telefone';
import { ConfirmDialogService } from 'src/app/services/shared/confirm-dialog.service';

@Component({
  selector: 'app-modal-telefone',
  templateUrl: './modal-telefone.component.html',
  styleUrls: ['./modal-telefone.component.css']
})
export class ModalTelefoneComponent extends AptareCrudController<Empregador, {new(): Empregador}>{

  listaTipoTelefone = [];
  telefone: Telefone;

  constructor(router: Router, 
              route: ActivatedRoute,             
              service: EmpregadorService,
              dialog: MatDialog,
              dialogService: DialogService,
              private dominioService: DominioService,
              public dialogRef: MatDialogRef<ModalTelefoneComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              mensagem: MensagemService,
              confirm: ConfirmDialogService) {
    super(router, route, dialogService, dialog, Empregador, service, mensagem, confirm);
  }

  ngOnInit() {
    
    this.telefone = new Telefone();
    this.telefone.tipo = 1;

    let dominio: Dominio = new Dominio();
    dominio.nomeCampo = 'TP_TLF';

    this.dominioService.pesquisar(dominio)
                .subscribe((responseApi:ResponseApi) => {
      this.listaTipoTelefone = responseApi['data']; 
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  adicionarTelefone() {

    if(this.telefone.ddd == null || this.telefone.ddd <= 0) {
      this.mensagem.tratarErroPersonalizado("", "O campo DDD é obrigatório.");
      return false;
    }

    if(this.telefone.numero == null || this.telefone.numero <= 0) {
      this.mensagem.tratarErroPersonalizado("", "O campo Número é obrigatório.");
      return false;
    }

    for(let i=0; i < this.listaTipoTelefone.length; i++) {
      if(this.telefone.tipo == this.listaTipoTelefone[i].valorCampo) {
        this.telefone.descricaoTipo = this.listaTipoTelefone[i].nomeValor;
      }
    }

    this.dialogRef.close(this.telefone);
  }

  fechar() {
    this.dialogRef.close();
  }


}
