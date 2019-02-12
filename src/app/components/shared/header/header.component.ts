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
    this.login = JSON.parse(localStorage.getItem("usuario")).login;
  }

  logout() {
      localStorage.removeItem("usuario");
      localStorage.removeItem("token");
      this.router.navigate(['/login']);
  }

}
