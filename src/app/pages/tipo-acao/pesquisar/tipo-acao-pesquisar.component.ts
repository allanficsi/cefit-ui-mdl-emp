import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { TipoAcao } from '../../../model/acao/tipo-acao';
import { Cargo } from '../../../model/cadastro-unico/cargo';
import { TipoAcaoService } from '../../../services/acao/tipo-acao.service';
import { DialogService } from '../../../services/shared/dialog.service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { CadastroUnicoService } from 'src/app/services/cadastro-unico/cadastro-unico.service';

@Component({
  selector: 'app-tipo-acao-pesquisar',
  templateUrl: './tipo-acao-pesquisar.component.html',
  styleUrls: ['./tipo-acao-pesquisar.component.css']
})
export class TipoAcaoPesquisarComponent extends AptareCrudController<TipoAcao, {new(): TipoAcao}>{

  constructor(router: Router, 
              route: ActivatedRoute,             
              service: TipoAcaoService,
              dialog: MatDialog,
              mensagem: MensagemService,
              dialogService: DialogService) {
    super(router, route, dialog, Cargo, service, mensagem, dialogService);
  }

  inativarTipoAcao(codigo) {
    let tipoAcao: TipoAcao = new TipoAcao();
    tipoAcao.codigo = codigo;

    this.inativar(tipoAcao);
  }

  ativarTipoAcao(codigo) {
    let tipoAcao: TipoAcao = new TipoAcao();
    tipoAcao.codigo = codigo;

    this.ativar(tipoAcao);
  }

  statusInativar(obj: TipoAcao) {
    this.listaResultado.forEach(function (value) {
      if(value.codigo == obj.codigo) {
        value.flagAtivo = 'N';
      }
    });
  }

  statusAtivar(obj: TipoAcao) {
    this.listaResultado.forEach(function (value) {
      if(value.codigo == obj.codigo) {
        value.flagAtivo = 'S';
      }
    });
  }

  editar(id:string) {    
    this.router.navigate(['/tipo-acao-atualizar', id]);
  }

}
