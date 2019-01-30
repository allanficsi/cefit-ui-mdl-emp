import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  login: string;

  constructor(private router: Router) { }

  ngOnInit() {

    this.login = JSON.parse(localStorage.getItem("usuario")).login;

  }

  logout() {
      localStorage.removeItem("usuario");
      localStorage.removeItem("token");
      this.router.navigate(['/login']);
  }

}
