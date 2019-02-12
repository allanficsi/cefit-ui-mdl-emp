import { Component, OnInit } from '@angular/core';
import { AptareUtilController } from '../util/aptare-util-controller';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent extends AptareUtilController {

  constructor() 
  {
    super('#content',null);	 
  }   

}
