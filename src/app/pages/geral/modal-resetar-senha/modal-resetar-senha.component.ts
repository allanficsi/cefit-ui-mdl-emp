import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { Auditoria } from '../../../model/auditoria';
import { Cargo } from '../../../model/cadastro-unico/cargo';
import { CargoService } from '../../../services/cadastro-unico/cargo.service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { DialogService } from '../../../services/shared/dialog.service';
import { CadastroUnicoService } from 'src/app/services/cadastro-unico/cadastro-unico.service';
import {Empregador} from '../../../model/empregador/empregador';
import {EmpregadorService} from '../../../services/empregador/empregador.service';
import {CadastroUnico} from '../../../model/cadastro-unico/cadastro-unico';

@Component({
  selector: 'app-modal-cargo',
  templateUrl: './modal-resetar-senha.component.html',
  styleUrls: ['./modal-resetar-senha.component.css']
})
export class ModalResetarSenhaComponent extends AptareCrudController<Empregador, {new(): Empregador}>{

  constructor(router: Router, 
              route: ActivatedRoute,             
              public service: EmpregadorService,
              dialog: MatDialog,
              public dialogRef: MatDialogRef<ModalResetarSenhaComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              mensagem: MensagemService,
              dialogService: DialogService) {
    super(router, route, dialog, Empregador, service, mensagem, dialogService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  protected iniciarPaginaInserir() {
    this.objetoAtualiza.cadastroUnico = new CadastroUnico();
  }

  // completarInserir() {
  //   this.objetoAtualiza.descricao = this.objetoAtualiza.descricao.toUpperCase();
  //   this.objetoAtualiza.flagAtivo = 'S';
  //   this.objetoAtualiza.auditoria = new Auditoria();
  //   this.objetoAtualiza.auditoria.codigoUsuarioInclusao = this.getCodigoUsuarioLogado();
  //   this.objetoAtualiza.auditoria.dataInclusao = new Date();
  // }

  validarInserir() {
    //VALIDACAO DE CAMPOS OBRIGATORIOS
    if(this.objetoAtualiza.cadastroUnico.email == null || this.objetoAtualiza.cadastroUnico.email == '' || this.objetoAtualiza.cadastroUnico.email == undefined) {
      this.mensagem.tratarErroPersonalizado("", "O campo E-mail é obrigatório.");
      return false;
    }

    return true;
  }
  resetarSenha() {
    if (this.validarInserir()) {
      this.service.resetarSenha(this.objetoAtualiza).subscribe(value => {
        this.fechar();
      },err =>{
        console.log(err);
      } );

    }
  }

  completarPosInserir() {
    this.fechar();
  }

  fechar() {
    this.dialogRef.close(this.objetoAtualiza);
  }


}
