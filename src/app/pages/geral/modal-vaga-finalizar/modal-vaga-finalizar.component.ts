import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Vaga } from 'src/app/model/vaga/vaga';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { DialogService } from '../../../services/shared/dialog.service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { VagaService } from '../../../services/vaga/vaga.service';
import { ResponseApi } from '../../../model/response-api';
import { Empregador } from '../../../model/empregador/empregador';
import { CadastroUnico } from '../../../model/cadastro-unico/cadastro-unico';
import { Auditoria } from '../../../model/auditoria';

@Component({
  selector: 'app-vaga-finalizar-manutencao',
  templateUrl: './modal-vaga-finalizar.component.html',
  styleUrls: ['./modal-vaga-finalizar.component.css']
})
export class ModalVagaFinalizarComponent extends AptareCrudController<Vaga, {new(): Vaga}>{

  constructor(router: Router,
              route: ActivatedRoute,             
              public service: VagaService,
              dialog: MatDialog,
              public dialogRef: MatDialogRef<ModalVagaFinalizarComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              mensagem: MensagemService,
              dialogService: DialogService) {
    super(router, route, dialog, Vaga, service, mensagem, dialogService);   
  }

  ngOnInit() {
    super.ngOnInit();

    this.objetoAtualiza.empregadorEntity = new Empregador();
    this.objetoAtualiza.empregadorEntity.cadastroUnico = new CadastroUnico();

    let vaga = new Vaga();
    vaga.codigo = this.data.codigo;

    this.service.get(vaga)
                .subscribe((responseApi:ResponseApi) => {
      this.objetoAtualiza = responseApi['data'];
      this.objetoAtualiza.flagRealizada = true;
    } , err => {
      this.mensagem.tratarErro(err);
    });

  }

  concluir() {
    if(this.objetoAtualiza.flagRealizada && 
      (this.objetoAtualiza.valorPago == null || typeof this.objetoAtualiza.valorPago == 'undefined')) {
        this.mensagem.tratarErroPersonalizado("", "O campo Valor Pago é obrigatório.");
        return false;
    }

    this.dialogService.openConfirmDialog('Você deseja finalizar a vaga?')
      .afterClosed().subscribe(res =>{
        if(res){
          this.alterarStatusVaga();
        } 
      });
  }

  alterarStatusVaga() {
    this.objetoAtualiza.situacao = VagaService.SITUACAO_FINALIZADA;
    this.objetoAtualiza.auditoria = new Auditoria();
    this.objetoAtualiza.auditoria.codigoUsuarioAlteracao = this.getCodigoUsuarioLogado();

    this.service.alterarSituacaoVaga(this.objetoAtualiza)
                .subscribe((responseApi:ResponseApi) => {
      this.mensagem.msgSucesso("A vaga foi atualizada com sucesso.");
      this.fechar();
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  fechar() {
    this.dialogRef.close(this.objetoAtualiza);
  }

}
