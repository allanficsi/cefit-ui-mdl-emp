import { Directive, ElementRef, HostListener } from '@angular/core';
import {DialogService} from '../../services/shared/dialog.service';

@Directive({
  selector: '[aptValidaCnpj]'
})
export class AptValidaCnpjDirective {
  
  constructor(private element: ElementRef,
              private dialogService: DialogService) {}



  @HostListener('blur')
  blur() {
    let reg1 = /\./gi;
    let reg2 = /\-/gi;
    let reg3 = /\//gi;
    let str1 = this.element.nativeElement.value.replace(reg1,"");
    let str2 = str1.replace(reg2, "");
    let cnpj = str2.replace(reg3, "");

    let numeros; 
    let digitos; 
    let soma;
    let i;
    let resultado;
    let pos;
    let tamanho;
    let digitos_iguais;

    digitos_iguais = 1;

    if(cnpj == '') {
      return;
    }


    if (cnpj.length < 14 && cnpj.length < 15){
      this.dialogService.openAlertDialog('Este CNPJ é inválido, favor informar um CNPJ válido.');
      this.element.nativeElement.value = null;   
      return;
    }
        
    for (i = 0; i < cnpj.length - 1; i++)
        if (cnpj.charAt(i) != cnpj.charAt(i + 1))
    {
        digitos_iguais = 0;
        break;
    }
    if (!digitos_iguais)
    {
        tamanho = cnpj.length - 2
        numeros = cnpj.substring(0,tamanho);
        digitos = cnpj.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--)
        {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

        if (resultado != digitos.charAt(0)) {
          this.dialogService.openAlertDialog('Este CNPJ é inválido, favor informar um CNPJ válido.');
          this.element.nativeElement.value = null;   
          return;
        }
          
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0,tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--)
        {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1)){
          this.dialogService.openAlertDialog('Este CNPJ é inválido, favor informar um CNPJ válido.');
          this.element.nativeElement.value = null;   
          return;
        }

    }
    else
    {
      this.dialogService.openAlertDialog('Este CNPJ é inválido, favor informar um CNPJ válido.');
      this.element.nativeElement.value = null;   
      return;
    }
  }
}
