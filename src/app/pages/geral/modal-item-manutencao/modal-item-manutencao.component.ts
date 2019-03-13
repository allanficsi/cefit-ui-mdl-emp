import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { DialogService } from '../../../dialog-service';
import { Espaco } from '../../../model/espaco/espaco';
import { EspacoItemEspaco } from '../../../model/espaco/espaco-item-espaco';
import { ResponseApi } from '../../../model/response-api';
import { EspacoService } from '../../../services/espaco/espaco.service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { ConfirmDialogService } from 'src/app/services/shared/confirm-dialog.service';

@Component({
  selector: 'app-modal-item-manutencao',
  templateUrl: './modal-item-manutencao.component.html',
  styleUrls: ['./modal-item-manutencao.component.css']
})
export class ModalItemManutencaoComponent extends AptareCrudController<Espaco, {new(): Espaco}>{

  constructor(router: Router, 
              route: ActivatedRoute,             
              public service: EspacoService,
              dialog: MatDialog,
              dialogService: DialogService,
              public dialogRef: MatDialogRef<ModalItemManutencaoComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              mensagem: MensagemService,
              confirm: ConfirmDialogService) {
    super(router, route, dialogService, dialog, Espaco, service, mensagem, confirm);   
  }

  ngOnInit() {
    super.ngOnInit();

    let espaco = new Espaco();
    espaco.codigo = this.data.codigo;

    this.service.get(espaco)
                .subscribe((responseApi:ResponseApi) => {
      this.objetoAtualiza = responseApi['data']; 

    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  salvar() {

    let flag: boolean = true;

    this.objetoAtualiza.listaEspacoItemEspaco.forEach(element => {

      let qtdAtivos = element.quantidadeAtivos;
      let qtdManut = element.quantidadeManutencao;
      let total = element.totalItens;

      if(parseInt(qtdAtivos.toString()) + parseInt(qtdManut.toString()) !== parseInt(total.toString())) {
        flag = false;
      }
      
    });

    // Salvando alterações
    if(flag) {
      this.service.salvarManutencao(this.objetoAtualiza).subscribe((responseApi:ResponseApi) => {
        this.mensagem.msgSucesso('O registro foi inserido com sucesso.');
        this.fechar();
      } , err => {
        this.mensagem.tratarErro(err);
      });
    } else {
      this.mensagem.tratarErroPersonalizado("", "O valor total do item deve ser igual ao somatório dos itens ativos com os itens inativos.");
      return false;
    }
  }

  fechar() {
    this.dialogRef.close(this.objetoAtualiza);
  }

}
