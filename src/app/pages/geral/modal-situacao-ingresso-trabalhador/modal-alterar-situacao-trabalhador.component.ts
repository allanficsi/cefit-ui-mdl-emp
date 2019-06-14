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
  templateUrl: './modal-alterar-situacao-trabalhador.component.html',
  styleUrls: ['./modal-alterar-situacao-trabalhador.component.css']
})
export class ModalAlterarSituacaoTrabalhadorComponent extends AptareCrudController<Trabalhador, {new(): Trabalhador}>{

  trabalhadorLog: TrabalhadorLog;

  constructor(router: Router,
              route: ActivatedRoute,
              public service: TrabalhadorService,
              dialog: MatDialog,
              public dialogRef: MatDialogRef<ModalAlterarSituacaoTrabalhadorComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              mensagem: MensagemService,
              dialogService: DialogService) {
    super(router, route, dialog, Trabalhador, service, mensagem, dialogService);
  }

  @ViewChild('form')
  formulario:NgForm;

  ngOnInit() {
    super.ngOnInit();

    this.trabalhadorLog = new TrabalhadorLog();

    let  trabalhador = new Trabalhador();

    this.objetoAtualiza.codigo= this.data.codigo;
    this.objetoAtualiza.listaTrabalhadorLog= [];
    this.objetoAtualiza.situacaoIngresso = this.data.situacao;
    this.trabalhadorLog.observacaoSitucaoIngresso = null;

  }

  concluir(aprovado:boolean){
    let msg;

    // if(!this.validarAlterar()){
    //   this.formulario.onSubmit(undefined);
    //   return false;
    // }

    if (aprovado) {
      msg = 'Deseja realmente aprovar este candidato ?';
      this.confirmacaoDialog(msg,aprovado);
    } else {
      msg = 'Deseja realmente reprovar este candidato?';
      this.confirmacaoDialog(msg,aprovado);
    }

  }

  alterarSituacao(aprovado:boolean){
    if(this.objetoAtualiza.situacaoIngresso == 3){//RESPOSTA DA AVALICAO
      if(aprovado){
        this.objetoAtualiza.situacaoIngresso = TrabalhadorService.APROVADO_NA_AVALIACAO;
      }else{
        this.objetoAtualiza.situacaoIngresso = TrabalhadorService.RESTRICAO_POR_AVALIACAO;
      }
    }

    if(this.objetoAtualiza.situacaoIngresso == 4){//RESPOSTA DA CAPACITAÇÃO
      if(aprovado){
        this.objetoAtualiza.situacaoIngresso = TrabalhadorService.APROVADO;
      }else{
        this.objetoAtualiza.situacaoIngresso = TrabalhadorService.RESTRICAO_POR_CAPACITACAO;
      }
    }

    if(this.objetoAtualiza.situacaoIngresso == 5){//RESPOSTA DA ENTREVISTA OCUPACIONAL
      if(aprovado){
        this.objetoAtualiza.situacaoIngresso = TrabalhadorService.APROVADO;
      }else{
        this.objetoAtualiza.situacaoIngresso = TrabalhadorService.RESTRICAO_POR_ENTREVISTA_OCUPACIONAL;
      }
    }

    this.objetoAtualiza.auditoria = new Auditoria();
    this.objetoAtualiza.auditoria.codigoUsuarioAlteracao = this.getCodigoUsuarioLogado();

    this.objetoAtualiza.listaTrabalhadorLog.push(this.trabalhadorLog);

    this.service.alterarSituacaoDeIngresso(this.objetoAtualiza).subscribe((responseApi:ResponseApi) => {
      // console.log(this.objetoAtualiza);
      this.fecharEAtualizar(true);
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  confirmacaoDialog(msg: string, aprovado:boolean) {
    this.dialogService.openConfirmDialog(msg)
      .afterClosed().subscribe(res =>{
      if(res){
        // if(this.validarAlterar())
        this.alterarSituacao(aprovado);
      }
    });
  }
  fecharEAtualizar(flagAtulizarRegistros:boolean) {
    this.dialogRef.close(flagAtulizarRegistros);
  }
  // validarAlterar() {
  //   //VALIDACAO DE CAMPOS OBRIGATORIOS
  //   if((this.objetoAtualiza.motivoInativacao == null || this.objetoAtualiza.motivoInativacao == '')
  //     && (this.objetoAtualiza.motivoAtivacao == null || this.objetoAtualiza.motivoAtivacao == '')) {
  //    return false;
  //   }
  //   if(this.objetoAtualiza.observacao == null || this.objetoAtualiza.observacao == '') {
  //     return false;
  //   }
  //   return true;
  // }
}
