import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { EspacoItemEspaco } from 'src/app/model/espaco/espaco-item-espaco';
import { ItemEspaco } from 'src/app/model/espaco/item-espaco';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { ResponseApi } from '../../../model/response-api';
import { EspacoItemEspacoService } from '../../../services/espaco/espaco-item-espaco.service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { ItemEspacoService } from '../../../services/espaco/item-espaco.service';
import { DialogService } from 'src/app/services/shared/dialog.service';
import { CadastroUnicoService } from 'src/app/services/cadastro-unico/cadastro-unico.service';

@Component({
  selector: 'app-modal-editar-item-espaco',
  templateUrl: './modal-editar-item-espaco.component.html',
  styleUrls: ['./modal-editar-item-espaco.component.css']
})
export class ModalEditarItemEspacoComponent extends AptareCrudController<EspacoItemEspaco, {new(): EspacoItemEspaco}>{

  listaItemEspaco = [];
  itemEspaco: ItemEspaco;

  constructor(router: Router,
              route: ActivatedRoute,
              service: EspacoItemEspacoService,
              private itemEspacoService: ItemEspacoService,
              dialog: MatDialog,
              public dialogRef: MatDialogRef<ModalEditarItemEspacoComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              mensagem: MensagemService,
              dialogService: DialogService) {
    super(router, route, dialog, EspacoItemEspaco, service, mensagem, dialogService);   
  }

  ngOnInit() {
    this.popularItemEspaco();
    this.objetoAtualiza = this.data;
  }

  popularItemEspaco() {
    let itemEspaco: ItemEspaco = new ItemEspaco();

    this.itemEspacoService.pesquisar(itemEspaco)
                .subscribe((responseApi:ResponseApi) => {
      this.listaItemEspaco = responseApi['data']; 

      for(let i = 0; i < this.listaItemEspaco.length; i++) {
        if(this.listaItemEspaco[i].codigo === this.objetoAtualiza.itemEspaco.codigo) {
          this.objetoAtualiza.itemEspaco = this.listaItemEspaco[i];
        }
      }
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  editarItemEspaco() {
    this.dialogRef.close(this.objetoAtualiza);
  }

  fechar() {
    this.dialogRef.close();
  }

}
