import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { Auditoria } from '../../../model/auditoria';
import { Cargo } from '../../../model/cadastro-unico/cargo';
import { ItemEspaco } from '../../../model/espaco/item-espaco';
import { ItemEspacoService } from '../../../services/espaco/item-espaco.service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { DialogService } from '../../../services/shared/dialog.service';
import { CadastroUnicoService } from 'src/app/services/cadastro-unico/cadastro-unico.service';
import {Trabalhador} from '../../../model/trabalhador/trabalhador';
import {TrabalhadorService} from '../../../services/trabalhador/trabalhador.service';
import {ResponseApi} from '../../../model/response-api';
import {Espaco} from '../../../model/espaco/espaco';

@Component({
  selector: 'app-modal-item-espaco',
  templateUrl: './modal-ativar-inativar-trabalhador.component.html',
  styleUrls: ['./modal-ativar-inativar-trabalhador.component.css']
})
export class ModalAtivarInativarTrabalhadorComponent extends AptareCrudController<Trabalhador, {new(): Trabalhador}>{

  constructor(router: Router,
              route: ActivatedRoute,             
              public service: TrabalhadorService,
              dialog: MatDialog,
              public dialogRef: MatDialogRef<ModalAtivarInativarTrabalhadorComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              mensagem: MensagemService,
              dialogService: DialogService) {
    super(router, route, dialog, Trabalhador, service, mensagem, dialogService);
  }

  ngOnInit() {
    super.ngOnInit();

    let trabalhador = new Trabalhador();
    trabalhador.codigo = this.data.codigo;

    this.service.get(trabalhador)
                .subscribe((reposonseApi: ResponseApi) => {
          this.objetoAtualiza = reposonseApi['data'];
        }
    ,err => {
      this.mensagem.tratarErro(err);
    })

  }



  concluir(flagInativar:boolean){
    let msg;

    if(!this.validarAlterar()){
      return false;
    }

    if (flagInativar) {
      msg = 'Deseja realmente inativar este registro?';
      this.confirmacaoDialog(msg,flagInativar);
    } else {
      msg = 'Deseja realmente ativar este registro?';
      this.confirmacaoDialog(msg,flagInativar);
    }

  }

  confirmacaoDialog(msg: string, flagInativar:boolean) {
    this.dialogService.openConfirmDialog(msg)
      .afterClosed().subscribe(res =>{
      if(res){
        if(this.validarAlterar())
        this.alterarSituacao(flagInativar);
      }
    });
  }

  alterarSituacao(flagInativar:boolean){
    if(flagInativar){
      this.objetoAtualiza.situacao = TrabalhadorService.SITUACAO_INATIVA;
      this.objetoAtualiza.situacaoIngresso = TrabalhadorService.EXCLUIDO;
      this.objetoAtualiza.motivoAtivacao = null;
    }else{
      this.objetoAtualiza.situacao = TrabalhadorService.SITUACAO_ATIVA;
      this.objetoAtualiza.situacaoIngresso = TrabalhadorService.PENDENTE_DE_AVALIACAO;
      this.objetoAtualiza.motivoInativacao = null;
    }

    this.objetoAtualiza.auditoria = new Auditoria();
    this.objetoAtualiza.auditoria.codigoUsuarioAlteracao = this.getCodigoUsuarioLogado();

    this.service.alterarSituacaoDeIngresso(this.objetoAtualiza).subscribe((responseApi:ResponseApi) => {
      this.mensagem.msgSucesso("A situação foi atualizada com sucesso.");
      console.log(this.objetoAtualiza);
      this.fechar();
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  validarAlterar() {
    //VALIDACAO DE CAMPOS OBRIGATORIOS
    if(this.objetoAtualiza.motivoInativacao == null || this.objetoAtualiza.motivoInativacao == '') {
      this.mensagem.tratarErroPersonalizado("", "O campo Motivo é obrigatório.");
      return false;
    }
    if(this.objetoAtualiza.observacao == null || this.objetoAtualiza.observacao == '') {
      this.mensagem.tratarErroPersonalizado("", "O campo Observação é obrigatório.");
      return false;
    }

    return true;
  }
  fechar() {
    this.dialogRef.close(this.objetoAtualiza);

  }
}
