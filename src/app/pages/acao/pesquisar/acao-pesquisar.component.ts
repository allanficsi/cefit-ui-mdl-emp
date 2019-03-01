import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogService } from 'src/app/services/shared/confirm-dialog.service';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { DialogService } from '../../../dialog-service';
import { Acao } from '../../../model/acao/acao';
import { Cargo } from '../../../model/cadastro-unico/cargo';
import { AcaoService } from '../../../services/acao/acao.service';
import { MensagemService } from '../../../services/shared/mensagem.service';

@Component({
  selector: 'app-acao-pesquisar',
  templateUrl: './acao-pesquisar.component.html',
  styleUrls: ['./acao-pesquisar.component.css']
})
export class AcaoPesquisarComponent extends AptareCrudController<Acao, {new(): Acao}>{

  constructor(router: Router, 
              route: ActivatedRoute,             
              service: AcaoService,
              dialog: MatDialog,
              dialogService: DialogService,
              mensagem: MensagemService,
              confirm: ConfirmDialogService) {
    super(router, route, dialogService, dialog, Acao, service, mensagem, confirm);
  }

  inativarAcao(codigo) {
    let acao: Acao = new Acao();
    acao.codigo = codigo;

    this.inativar(acao);
  }

  ativarAcao(codigo) {
    let acao: Acao = new Acao();
    acao.codigo = codigo;

    this.ativar(acao);
  }

  statusInativar(obj: Acao) {
    this.listaResultado.forEach(function (value) {
      if(value.codigo == obj.codigo) {
        //value.flagAtivo = 'N';
      }
    });
  }

  statusAtivar(obj: Acao) {
    this.listaResultado.forEach(function (value) {
      if(value.codigo == obj.codigo) {
        //value.flagAtivo = 'S';
      }
    });
  }

  editar(id:string) {
    this.router.navigate(['/acao-atualizar', id]);
  }

}
