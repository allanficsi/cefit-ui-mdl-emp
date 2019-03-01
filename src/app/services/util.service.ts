import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

  public static instance: UtilService = null;

  constructor() {
    return UtilService.instance = UtilService.instance || this;
  }

  public static getInstance(){
    if(this.instance == null){
      this.instance = new UtilService();
    }
    return this.instance;
  }

  isLoggedIn():boolean {
    if(localStorage.getItem("usuario") == null){
      return false;
    } else {
      return true;
    }
  }
  
  mascaraCpf(valor) {
    let str = valor+"";
    while(str.length < 11) {
      str = '0' + str;
    }     
    return str.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4");
   }
  
   mascaraCnpj(valor) {
    let str = valor+"";
    while(str.length < 14) {
      str = '0' + str;
    }
    return str.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5");
   }

   getDiasFromInterval(d1, d2) : Date[] {
    let intervalos = [];

    intervalos.push( this.toDate(this.toString(d1)) );

    while ( d1 < d2 ) {
      d1.setDate( d1.getDate() + 1 );
      intervalos.push( this.toDate(this.toString(d1)) );
    }

    return intervalos;

  }

  toDate(texto) {
    let partes = texto.split('/');
    return new Date(partes[2], partes[1]-1, partes[0]);
  }

  toString(date) {
    return ('0' + date.getDate()).slice(-2) + '/' +
      ('0' + (date.getMonth() + 1)).slice(-2) + '/' +
      date.getFullYear();
  }


}
