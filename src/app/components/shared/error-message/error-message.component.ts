import {Component, Input, OnInit} from '@angular/core';
import {NgForm, NgModel} from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {

  @Input() input:NgModel;
  @Input() form:NgForm;
  @Input() mensagemDeErro: string = 'Entrada inválida';

   constructor() {
  }

  ngOnInit() {
  }

}
