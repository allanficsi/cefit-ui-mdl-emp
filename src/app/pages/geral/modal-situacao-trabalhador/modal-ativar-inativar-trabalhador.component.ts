import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { Auditoria } from '../../../model/auditoria';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { DialogService } from '../../../services/shared/dialog.service';
import { Trabalhador } from '../../../model/trabalhador/trabalhador';
import { TrabalhadorService } from '../../../services/trabalhador/trabalhador.service';
import { ResponseApi } from '../../../model/response-api';
import { NgForm } from '@angular/forms';
import {TrabalhadorLog} from '../../../model/trabalhador/trabalhador-log';

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

  trabalhadorLog: TrabalhadorLog;

  @ViewChild('form')
  formulario:NgForm;

  ngOnInit() {
    super.ngOnInit();

    let trabalhador = new Trabalhador();
    trabalhador.codigo = this.data.codigo;

    this.trabalhadorLog = new TrabalhadorLog();
    this.trabalhadorLog.codigoTrabalhador = this.data.codigo;
    this.trabalhadorLog.observacaoSitucaoIngresso= null;
    this.trabalhadorLog.motivoInativacaoAtivacao = null;

    this.service.get(trabalhador)
                .subscribe((reposonseApi: ResponseApi) => {
          this.objetoAtualiza = reposonseApi['data'];
          this.objetoAtualiza.listaTrabalhadorLog = [];
        }
    ,err => {
      this.mensagem.tratarErro(err);
    })

  }

  concluir(flagInativar:boolean){
    let msg;

    if(!this.validarAlterar()){
      this.formulario.onSubmit(undefined);
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
    }else{
      this.objetoAtualiza.situacao = TrabalhadorService.SITUACAO_ATIVA;
      this.objetoAtualiza.situacaoIngresso = TrabalhadorService.PENDENTE_DE_AVALIACAO;
    }

    this.objetoAtualiza.auditoria = new Auditoria();
    this.objetoAtualiza.auditoria.codigoUsuarioAlteracao = this.getCodigoUsuarioLogado();
    this.objetoAtualiza.listaTrabalhadorLog.push(this.trabalhadorLog);

    this.service.alterarSituacaoDeIngresso(this.objetoAtualiza).subscribe((responseApi:ResponseApi) => {
      this.fecharEAtualizar(true);
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  validarAlterar() {
    //VALIDACAO DE CAMPOS OBRIGATORIOS
    if(this.trabalhadorLog.motivoInativacaoAtivacao == null || this.trabalhadorLog.motivoInativacaoAtivacao == '')
    {
     return false;
    }
    return !(this.trabalhadorLog.observacaoInativacaoAtivacao == null || this.trabalhadorLog.observacaoInativacaoAtivacao == '');
  }

  fecharEAtualizar(flagAtulizarRegistros:boolean) {
    this.dialogRef.close(flagAtulizarRegistros);
  }

}
