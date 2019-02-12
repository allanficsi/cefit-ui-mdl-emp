import { Component, OnInit } from '@angular/core';
import { AptareUtilController } from '../util/aptare-util-controller';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent extends AptareUtilController {

  constructor() 
  {
    super('#menubar',null);	 
  }    

}
