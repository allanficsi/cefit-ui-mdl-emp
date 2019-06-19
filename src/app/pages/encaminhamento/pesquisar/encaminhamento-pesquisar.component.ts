import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseApi } from '../../../model/response-api';
import { LocalService } from '../../../services/espaco/local.service';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { Espaco } from '../../../model/espaco/espaco';
import { EspacoService } from '../../../services/espaco/espaco.service';
import { DialogService } from '../../../services/shared/dialog.service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { Local } from '../../../model/espaco/local';
import { Encaminhamento } from '../../../model/vaga/encaminhamento';
import { EncaminhamentoService } from '../../../services/vaga/encaminhamento.service';
import { Vaga } from 'src/app/model/vaga/vaga';

@Component({
  selector: 'app-encaminhamento-pesquisar',
  templateUrl: './encaminhamento-pesquisar.component.html',
  styleUrls: ['./encaminhamento-pesquisar.component.css']
})
export class EncaminhamentoPesquisarComponent extends AptareCrudController<Encaminhamento, {new(): Encaminhamento}>{

  listaLocal = [];

  constructor(router: Router, 
              route: ActivatedRoute,             
              service: EncaminhamentoService,
              private localService: LocalService,
              dialog: MatDialog,
              mensagem: MensagemService,
              dialogService: DialogService) {
    super(router, route, dialog, Encaminhamento, service, mensagem, dialogService);
  }

  iniciarPaginaPesquisar() {
    this.objetoPesquisa.vaga = new Vaga();
    this.objetoPesquisa.flagAtivo = '';
  }

  inativarEncaminhamento(codigo) {
    let encaminhamento: Encaminhamento = new Encaminhamento();
    encaminhamento.codigo = codigo;

    this.inativar(encaminhamento);
  }

  statusInativar(obj: Encaminhamento) {
    this.listaResultado.forEach(function (value) {
      if(value.codigo == obj.codigo) {
        value.flagAtivo = 'N';
      }
    });
  }

  novo() {
    this.router.navigate(['/encaminhamento-atualizar']);
  }

}
