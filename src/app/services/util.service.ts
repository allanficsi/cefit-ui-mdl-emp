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
}
