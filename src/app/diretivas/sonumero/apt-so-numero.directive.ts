import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[aptSoNumero]'
})
export class AptSoNumeroDirective {

  constructor(private element: ElementRef) {
    this.element.nativeElement.value = this.element.nativeElement.value.replace(/\D/g,"");
  }

  @HostListener('keyup')
  keyUp() {
    this.element.nativeElement.value = this.element.nativeElement.value.replace(/\D/g,"");
  }

  @HostListener('blur')
  blur() {    
    this.element.nativeElement.value = this.element.nativeElement.value.replace(/\D/g,"");
  }

}
