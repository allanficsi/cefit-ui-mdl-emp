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
import {UsuarioService} from '../../../services/usuario/usuario.service';
import {PessoaJuridica} from '../../../model/cadastro-unico/pessoa-juridica';
import {PessoaFisica} from '../../../model/cadastro-unico/pessoa-fisica';

@Component({
  selector: 'app-modal-cargo',
  templateUrl: './modal-resetar-senha.component.html',
  styleUrls: ['./modal-resetar-senha.component.css']
})
export class ModalResetarSenhaComponent extends AptareCrudController<Empregador, {new(): Empregador}>{

  constructor(router: Router, 
              route: ActivatedRoute,             
              public service: EmpregadorService,
              private usuarioService:UsuarioService,
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

    this.objetoAtualiza.cadastroUnico.pessoaJuridica = new PessoaJuridica();
    this.objetoAtualiza.cadastroUnico.tipoPessoa = 'F';

    this.objetoAtualiza.cadastroUnico.pessoaFisica = new PessoaFisica();

  }

  // completarInserir() {
  //   this.objetoAtualiza.descricao = this.objetoAtualiza.descricao.toUpperCase();
  //   this.objetoAtualiza.flagAtivo = 'S';
  //   this.objetoAtualiza.auditoria = new Auditoria();
  //   this.objetoAtualiza.auditoria.codigoUsuarioInclusao = this.getCodigoUsuarioLogado();
  //   this.objetoAtualiza.auditoria.dataInclusao = new Date();
  // }

  resetarSenha() {
    if (this.validarInserir()) {
      this.usuarioService.resetarSenha(this.objetoAtualiza).subscribe(value => {
        this.fechar();
        this.mensagem.msgSucesso('A nova senha foi gerada com sucesso.');
      },err =>{
        this.mensagem.tratarErro(err);
      } );

    }
  }

  validarInserir() {

    //VALIDACAO DE CAMPOS OBRIGATORIOS
    if(this.objetoAtualiza.cadastroUnico.email == null || this.objetoAtualiza.cadastroUnico.email == '' || this.objetoAtualiza.cadastroUnico.email == undefined) {
      this.mensagem.tratarErroPersonalizado("", "O campo E-mail é obrigatório.");
      return false;
    }

    //VALIDACAO DE CAMPOS OBRIGATORIOS PJ
    if (this.objetoAtualiza.cadastroUnico.tipoPessoa == 'F') {
      if (this.objetoAtualiza.cadastroUnico.cpf == null || this.objetoAtualiza.cadastroUnico.cpf == '') {
        this.mensagem.tratarErroPersonalizado('', 'O campo CPF é obrigatório.');
        return false;
      }
    }

    //VALIDACAO DE CAMPOS OBRIGATORIOS PF
    if (this.objetoAtualiza.cadastroUnico.tipoPessoa == 'J') {
      if (this.objetoAtualiza.cadastroUnico.cnpj == null || this.objetoAtualiza.cadastroUnico.cnpj == '') {
        this.mensagem.tratarErroPersonalizado('', 'O campo CNPJ  obrigatório.');
        return false;
      }
    }

    return true;
  }

  completarPosInserir() {
    this.fechar();
  }

  fechar() {
    this.dialogRef.close(this.objetoAtualiza);
  }


}
