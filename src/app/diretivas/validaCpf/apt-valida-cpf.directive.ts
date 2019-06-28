import { element } from 'protractor';
import { Directive, ElementRef, HostListener, ViewChild, Renderer2, Renderer, Input } from '@angular/core';
import {DialogService} from '../../services/shared/dialog.service';

@Directive({
  selector: '[aptValidaCpf]'
})
export class ValidaCpfDirective {

  constructor(private element: ElementRef,
              private renderer: Renderer2,
              private dialogService :DialogService) {}


  @HostListener('blur')
  blur() {   
    
    let reg1 = /\./gi;
    let reg2 = /\-/gi;
    let str1 = this.element.nativeElement.value.replace(reg1,"");
    let cpf = str1.replace(reg2, "");

    if (cpf == null || cpf == '') {
      return;
    }

    if (cpf.length != 11) { 
      // alert('CPF Inválido');
      this.dialogService.openAlertDialog('Este CPF é inválido, favor informar um CPF válido.');
      this.element.nativeElement.value = '';
      return;
    }

    if ((cpf == '00000000000') || (cpf == '11111111111') || (cpf == '22222222222') || (cpf == '33333333333') || (cpf == '44444444444') || (cpf == '55555555555') || (cpf == '66666666666') || (cpf == '77777777777') || (cpf == '88888888888') || (cpf == '99999999999')) {
     // alert('CPF Inválido');
      this.dialogService.openAlertDialog('Este CPF é inválido, favor informar um CPF válido.');
      this.element.nativeElement.value = '';   
      return;
    }

    let numero: number = 0;
    let caracter: string = '';
    let numeros: string = '0123456789';
    let j: number = 10;
    let somatorio: number = 0;
    let resto: number = 0;
    let digito1: number = 0;
    let digito2: number = 0;
    let cpfAux: string = '';
    cpfAux = cpf.substring(0, 9);
    for (let i: number = 0; i < 9; i++) {
        caracter = cpfAux.charAt(i);
        if (numeros.search(caracter) == -1) {
            return false;
        }
        numero = Number(caracter);
        somatorio = somatorio + (numero * j);
        j--;
    }
    resto = somatorio % 11;
    digito1 = 11 - resto;
    if (digito1 > 9) {
        digito1 = 0;
    }
    j = 11;
    somatorio = 0;
    cpfAux = cpfAux + digito1;
    for (let i: number = 0; i < 10; i++) {
        caracter = cpfAux.charAt(i);
        numero = Number(caracter);
        somatorio = somatorio + (numero * j);
        j--;
    }
    resto = somatorio % 11;
    digito2 = 11 - resto;
    if (digito2 > 9) {
        digito2 = 0;
    }
    cpfAux = cpfAux + digito2;
    if (cpf != cpfAux) {
      this.element.nativeElement.value = '';
      this.dialogService.openAlertDialog('Este CPF é inválido, favor informar um CPF válido.');
      //alert('CPF Inválido');
      return;
    }


  }

}
