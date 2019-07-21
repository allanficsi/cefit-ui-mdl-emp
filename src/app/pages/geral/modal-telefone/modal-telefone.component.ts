import { Component, OnInit, Inject } from '@angular/core';
import { Dominio } from '../../../model/geral/dominio';
import { Empregador } from '../../../model/empregador/empregador';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpregadorService } from '../../../services/empregador/empregador.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { DominioService } from '../../../services/geral/dominio.service';
import { ResponseApi } from '../../../model/response-api';
import { Telefone } from '../../../model/cadastro-unico/telefone';
import { DialogService } from '../../../services/shared/dialog.service';
import { CadastroUnicoService } from 'src/app/services/cadastro-unico/cadastro-unico.service';

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
              private dominioService: DominioService,
              public dialogRef: MatDialogRef<ModalTelefoneComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              mensagem: MensagemService,
              dialogService: DialogService) {
    super(router, route, dialog, Empregador, service, mensagem, dialogService);
  }

  ngOnInit() {

    //ADICIONANDO NOVO TELEFONE
    if(typeof this.data.index  !== "undefined"){
      this.telefone = new Telefone();
      this.telefone.tipo = 1;
      this.telefone.flagWhats = false;
    }else {
      //EDITANDO TELEFONE
      this.telefone = {...this.data.telefone};
      this.telefone.nrTelefoneExtenso = this.telefone.ddd.toString() + this.telefone.numero.toString();
    }

    let dominio: Dominio = new Dominio();
    dominio.nomeCampo = 'TP_TLF';

    this.dominioService.pesquisarExterno(dominio)
      .subscribe((responseApi:ResponseApi) => {
        this.listaTipoTelefone = responseApi['data'];
        this.telefone.objTipo = this.listaTipoTelefone[0];
      } , err => {
        this.mensagem.tratarErro(err);
      });
  }

  adicionarTelefone() {

    if(!this.validarTelefonePJ()){
      return false;
    }

    for(let i=0; i < this.listaTipoTelefone.length; i++) {
      if(this.telefone.tipo == this.listaTipoTelefone[i].valorCampo) {
        this.telefone.descricaoTipo = this.listaTipoTelefone[i].nomeValor;
      }
    }

    this.telefone.ddd = Number(this.telefone.nrTelefoneExtenso.substring(0,2));
    this.telefone.numero = Number(this.telefone.nrTelefoneExtenso.substring(2,this.telefone.nrTelefoneExtenso.length));

    this.dialogRef.close(this.telefone);
  }

  validarTelefonePJ() {
    if ((typeof this.telefone.nrTelefoneExtenso === "undefined")
      || this.telefone.nrTelefoneExtenso === ''
      || Number(this.telefone.nrTelefoneExtenso.length) < 10 ) {
      this.mensagem.tratarErroPersonalizado("","O Telefone deve possuir no mínimo 10 digitos");
      return false;
    }

    return true;
  }



  fechar() {
    this.dialogRef.close();
  }


}
