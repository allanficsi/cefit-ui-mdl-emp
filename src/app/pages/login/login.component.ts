import { CurrentUser } from '../../model/current-user';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../model/usuario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensagemService } from '../../services/shared/mensagem.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = new Usuario(null,'','', null);  
  usrLogado: string;

  constructor(private usuarioService: UsuarioService,
              private mensagem: MensagemService,
              private router: Router) { }


  ngOnInit() {
    this.usrLogado = localStorage.getItem("usuario");
  }

  login(){    
    this.usuarioService.login(this.usuario)
      .subscribe((userAuthentication: CurrentUser) => {
          localStorage.setItem("usuario", JSON.stringify(userAuthentication.usuario));
          localStorage.setItem("token", userAuthentication.token);

          location.href = "/";
      } , err => {
          localStorage.removeItem("usuario");
          localStorage.removeItem("token");
          this.mensagem.tratarErro(err);
      });
  }

}
