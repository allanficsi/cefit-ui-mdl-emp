import {Component, QueryList, ViewChildren} from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { ResponseApi } from '../../../model/response-api';
import { CargoService } from '../../../services/cadastro-unico/cargo.service';
import { CorreioService } from '../../../services/correio/correio.service';
import { CnaeService } from '../../../services/empregador/cnae.service';
import { DominioService } from '../../../services/geral/dominio.service';
import { DialogService } from '../../../services/shared/dialog.service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { Usuario } from '../../../model/usuario';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { FiltroUsuario } from '../../../model/FiltroUsuario';
import {NgForm, NgModel} from '@angular/forms';


@Component({
  selector: 'app-empregador-atualizar',
  templateUrl: './empregador-redefinir-senha.component.html',
  styleUrls: ['./empregador-redefinir-senha.component.css']
})
export class EmpregadorRedefinirSenhaComponent extends AptareCrudController<Usuario, {new(): Usuario}>{



  constructor(router: Router,
              route: ActivatedRoute,  
              dialog: MatDialog,                   
              public  service: UsuarioService,
              private dominioService: DominioService,
              private correioService: CorreioService,
              private cargoService: CargoService,
              private cnaeService: CnaeService,
              mensagem: MensagemService,
              dialogService: DialogService) {
    super(router, route, dialog, Usuario, service, mensagem, dialogService);
 }

  @ViewChildren('form') fields: NgForm;

ngOnInit(): void {
  super.ngOnInit();
}

  protected iniciarPaginaInserir() {
    this.objetoAtualiza.filtro = new FiltroUsuario();
  }

  redefinirSenha() {
    if(this.validarInserir()) {
      this.completarInserir();
      //console.log(this.objetoAtualiza);
      this.service.redefinirSenha(this.objetoAtualiza).subscribe((responseApi:ResponseApi) => {

        this.completarPosInserir();
        this.mensagem.msgSucesso('A Senha foi alterada com sucesso.');

        } , err => {
        this.mensagem.tratarErro(err);
      });
    }
  }

  validarInserir() {

   if(this.objetoAtualiza.filtro.senhaAntiga == null || this.objetoAtualiza.filtro.senhaAntiga == '') {
         this.mensagem.tratarErroPersonalizado("", "O campo Senha Atual é obrigatório.");
         return false;
    }
    if(this.objetoAtualiza.senha == null || this.objetoAtualiza.senha == '') {
      this.mensagem.tratarErroPersonalizado("", "O campo Nova Senha é obrigatório.");
      return false;
    }
    if(this.objetoAtualiza.filtro.confirmarSenha == null || this.objetoAtualiza.filtro.confirmarSenha == '') {
      this.mensagem.tratarErroPersonalizado("", "O campo Confirmar Nova Senha é obrigatório.");
      return false;
    }

    //VERIFICA SE A SENHA FOI DIGITA CORRETA
    if(this.objetoAtualiza.senha !== this.objetoAtualiza.filtro.confirmarSenha  ) {
      this.mensagem.tratarErroPersonalizado("", "As Novas senhas digitadas  devem ser iguais.");
      return false;
    }
      return true;
  }

  completarInserir() {
    this.objetoAtualiza.codigo = this.getCodigoUsuarioLogado();
  }

  completarPosInserir() {
    this.router.navigate(['/']);

  }

  limparCampos() {
    this.objetoAtualiza.senha = '';
    this.objetoAtualiza.filtro.confirmarSenha = '';
    this.objetoAtualiza.filtro.senhaAntiga = '';
  }

 voltar() {
   this.router.navigate(['/']);
 }
}
