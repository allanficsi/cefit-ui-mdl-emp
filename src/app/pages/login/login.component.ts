import { CurrentUser } from '../../model/current-user';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../model/usuario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensagemService } from '../../services/shared/mensagem.service';
import * as $ from 'jquery';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ModalResetarSenhaComponent } from '../geral/modal-resetar-senha/modal-resetar-senha.component';
import { Empregador } from '../../model/empregador/empregador';
import { EmpregadorService } from '../../services/empregador/empregador.service';
import { ResponseApi } from '../../model/response-api';
import {catchError, mergeMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {CadastroUnico} from '../../model/cadastro-unico/cadastro-unico';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = new Usuario();
  empregador = new  Empregador();

  usrLogado: string;

  constructor(private usuarioService: UsuarioService,
              private empregadorService:EmpregadorService,
              private mensagem: MensagemService,
              private router: Router,
              private dialog: MatDialog) { }


  ngOnInit() {
    this.usrLogado = localStorage.getItem("usuario");
  }
 
  ngAfterViewInit()
  {
    
	$(window)[0].materialadmin.App.initialize('#login');
	$(window)[0].materialadmin.AppNavigation.initialize('#login');
	$(window)[0].materialadmin.AppOffcanvas.update('#login');
	$(window)[0].materialadmin.AppCard.initialize();
	$(window)[0].materialadmin.AppForm.initialize('#login');
	$(window)[0].materialadmin.AppNavSearch.initialize('#login');
	$(window)[0].materialadmin.AppVendor.initialize('#login');
	$(window)[0].materialadmin.Demo.initialize('#login');
	$(window)[0].materialadmin.DemoLayout.initialize('#login');
	$(window)[0].materialadmin.DemoFormComponents.initialize('#login');
	$(window)[0].materialadmin.DemoDashboard.initialize();
  	
  }

  login(){


    this.usuarioService.login(this.usuario)
      .subscribe((userAuthentication: CurrentUser) => {

        //SETANDO CODIGO DO CADASTRO UNICO
        this.empregador.cadastroUnico = new CadastroUnico();
        this.empregador.cadastroUnico.codigo = userAuthentication.usuario.codigoCadastroUnico;

        //BUSCANDO MEPREGADOR LOGADO
        this.empregadorService.getExterno(this.empregador)
          .subscribe((responseApi: ResponseApi) => {
            localStorage.setItem('empregador', JSON.stringify(responseApi['data']));
            localStorage.setItem("usuario", JSON.stringify(userAuthentication.usuario));
            localStorage.setItem("token", userAuthentication.token);
            this.router.navigate(['/']);

          }, err => {//ERRO AO BUSCAR EMPREGADOR
            localStorage.removeItem('usuario');
            localStorage.removeItem('token');
            localStorage.removeItem('empregador');
             this.mensagem.tratarErro(err);
          });

      } , err => {//ERRO AO BUSCAR USUARIO
          localStorage.removeItem("usuario");
          localStorage.removeItem("token");
          localStorage.removeItem("empregador");
          this.mensagem.tratarErro(err);
      });

  }

  cadastrar() {
    this.router.navigate(['cadastrar']);
  }

  resetarSenha() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '250px';
    dialogConfig.width = '750px';
    //dialogConfig.data = {index: index};

    this.dialog.open(ModalResetarSenhaComponent, dialogConfig)
      .afterClosed().subscribe((data) => {
    }, err =>{
        this.mensagem.tratarErro(err);
    } );
  }


}
