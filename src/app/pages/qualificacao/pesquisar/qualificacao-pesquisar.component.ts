import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { DialogService } from '../../../dialog-service';
import { Cargo } from '../../../model/cadastro-unico/cargo';
import { CargoService } from '../../../services/cadastro-unico/cargo.service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { Qualificacao } from '../../../model/profissional/qualificacao';
import { QualificacaoService } from '../../../services/profissional/qualificacao.service';
import { ConfirmDialogService } from 'src/app/services/shared/confirm-dialog.service';

@Component({
  selector: 'app-qualificacao-pesquisar',
  templateUrl: './qualificacao-pesquisar.component.html',
  styleUrls: ['./qualificacao-pesquisar.component.css']
})
export class QualificacaoPesquisarComponent extends AptareCrudController<Qualificacao, {new(): Qualificacao}>{

  constructor(router: Router, 
              route: ActivatedRoute,             
              service: QualificacaoService,
              dialog: MatDialog,
              dialogService: DialogService,
              mensagem: MensagemService,
              confirm: ConfirmDialogService) {
    super(router, route, dialogService, dialog, Cargo, service, mensagem, confirm);
  }

  inativarQualificacao(codigo) {
    let qualificacao: Qualificacao = new Qualificacao();
    qualificacao.codigo = codigo;

    this.inativar(qualificacao);
  }

  ativarQualificacao(codigo) {
    let qualificacao: Qualificacao = new Qualificacao();
    qualificacao.codigo = codigo;

    this.ativar(qualificacao);
  }

  statusInativar(obj: Qualificacao) {
    this.listaResultado.forEach(function (value) {
      if(value.codigo == obj.codigo) {
        value.flagAtivo = 'N';
      }
    });
  }

  statusAtivar(obj: Qualificacao) {
    this.listaResultado.forEach(function (value) {
      if(value.codigo == obj.codigo) {
        value.flagAtivo = 'S';
      }
    });
  }

  editar(id:string) {    
    this.router.navigate(['/qualificacao-atualizar', id]);
  }

}
