import { element } from 'protractor';
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[aptValidaEmail]'
})
export class AptValidaEmailDirective {

  constructor(private element: ElementRef) {}

  @HostListener('blur')
  blur() {   

    let email = this.element.nativeElement.value;

    if(email == '') {
      return;
    }

    let usuario = email.substring(0, email.indexOf("@"));
	  let dominio = email.substring(email.indexOf("@") + 1, email.length);
	
	if ((usuario.length >= 1) && (dominio.length >= 3)
			&& (usuario.search("@") == -1) && (dominio.search("@") == -1)
			&& (usuario.search(" ") == -1) && (dominio.search(" ") == -1)
			&& (dominio.search(".") != -1) && (dominio.indexOf(".") >= 1)
			&& (dominio.lastIndexOf(".") < dominio.length - 1))
	{
		return true;
	} 
	else
	{
		alert("Favor digitar um e-mail válido!");
		this.element.nativeElement.value = "";
	}

  }

}
