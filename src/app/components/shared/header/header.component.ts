import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AptareUtilController } from '../util/aptare-util-controller';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends AptareUtilController  {

  login: string;

  constructor(public router: Router) 
  {
  	super('#header', router);
  }

  ngOnInit() {
    this.login = JSON.parse(localStorage.getItem("empregador")).cadastroUnico.nome;
  }

  logout() {
      localStorage.removeItem("usuario");
      localStorage.removeItem("token");
      localStorage.removeItem("empregador");
      this.router.navigate(['/login']);
  }

}
