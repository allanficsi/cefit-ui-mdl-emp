import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../components/shared/confirm-dialog/dialog.component';



@Injectable()
export class DialogService {

    constructor(private dialog: MatDialog) { }

    openConfirmDialog(msg){
     return this.dialog.open(DialogComponent,{
        width: '390px',
        panelClass: 'confirm-dialog-container',
        disableClose: true,
        position: { top: "10px" },
        data :{
          message : msg,
          fgConfirm : true
        }
      });
    }
 
    openAlertDialog(msg){
      return this.dialog.open(DialogComponent,{
        width: '420px',
        panelClass: 'confirm-dialog-container',
        disableClose: true,
        position: { top: "10px" },
        data :{
          message : msg,
          fgAlert : true
        }
      });
    }
}
