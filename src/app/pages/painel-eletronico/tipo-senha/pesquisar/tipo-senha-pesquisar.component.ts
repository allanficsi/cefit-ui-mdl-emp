import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AptareCrudController } from '../../../../components/shared/crud/aptare-crud-controller';
import { Guiche } from '../../../../model/painel-eletronico/guiche';
import { TipoSenha } from '../../../../model/painel-eletronico/tipo-senha';
import { GuicheService } from '../../../../services/painel-eletronico/guiche.service';
import { DialogService } from '../../../../services/shared/dialog.service';
import { MensagemService } from '../../../../services/shared/mensagem.service';
import { TipoSenhaService } from '../../../../services/painel-eletronico/tipo-senha.service';

@Component({
  selector: 'app-tipo-senha-pesquisar',
  templateUrl: './tipo-senha-pesquisar.component.html',
  styleUrls: ['./tipo-senha-pesquisar.component.css']
})
export class TipoSenhaPesquisarComponent extends AptareCrudController<TipoSenha, {new(): TipoSenha}>{

  constructor(router: Router, 
              route: ActivatedRoute,             
              service: TipoSenhaService,
              dialog: MatDialog,
              mensagem: MensagemService,
              dialogService: DialogService) {
    super(router, route, dialog, Guiche, service, mensagem, dialogService);
  }

  iniciarPaginaPesquisar() {
    this.pesquisar();
  }

  inativarTipoSenha(codigo) {
    let tipoSenha: TipoSenha = new TipoSenha();
    tipoSenha.codigo = codigo;

    this.inativar(tipoSenha);
  }

  ativarTipoSenha(codigo) {
    let tipoSenha: TipoSenha = new TipoSenha();
    tipoSenha.codigo = codigo;

    this.ativar(tipoSenha);
  }

  statusInativar(obj: TipoSenha) {
    this.listaResultado.forEach(function (value) {
      if(value.codigo == obj.codigo) {
        value.flagAtivo = 'N';
      }
    });
  }

  statusAtivar(obj: TipoSenha) {
    this.listaResultado.forEach(function (value) {
      if(value.codigo == obj.codigo) {
        value.flagAtivo = 'S';
      }
    });
  }

  editar(id:string) {    
    this.router.navigate(['/tipo-senha-atualizar', id]);
  }

}
