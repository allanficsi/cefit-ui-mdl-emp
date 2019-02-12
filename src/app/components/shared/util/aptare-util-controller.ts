import { OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

export class AptareUtilController implements OnInit {
  
  constructor(private parentSelector : string, 
              public router : Router) 
  {
  	 console.log(parentSelector); 
  	 if (parentSelector == null)
  	 {
  	 	this.parentSelector = '#content';	 
  	 }
  } 

  ngOnInit() {}
 
  ngAfterViewInit()
  {
  	$(window)[0].materialadmin.App.initialize(this.parentSelector);
	$(window)[0].materialadmin.AppNavigation.initialize(this.parentSelector);
	$(window)[0].materialadmin.AppOffcanvas.update(this.parentSelector);
	$(window)[0].materialadmin.AppCard.initialize();
	$(window)[0].materialadmin.AppForm.initialize(this.parentSelector);
	$(window)[0].materialadmin.AppNavSearch.initialize(this.parentSelector);
	$(window)[0].materialadmin.AppVendor.initialize(this.parentSelector);
	$(window)[0].materialadmin.Demo.initialize(this.parentSelector);
	$(window)[0].materialadmin.DemoLayout.initialize(this.parentSelector);
	$(window)[0].materialadmin.DemoFormComponents.initialize(this.parentSelector);
	$(window)[0].materialadmin.DemoDashboard.initialize();
  }

}