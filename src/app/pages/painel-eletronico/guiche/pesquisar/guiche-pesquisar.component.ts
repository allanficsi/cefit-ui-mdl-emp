import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Guiche } from '../../../../model/painel-eletronico/guiche';
import { AptareCrudController } from '../../../../components/shared/crud/aptare-crud-controller';
import { Cargo } from '../../../../model/cadastro-unico/cargo';
import { Qualificacao } from '../../../../model/profissional/qualificacao';
import { QualificacaoService } from '../../../../services/profissional/qualificacao.service';
import { DialogService } from '../../../../services/shared/dialog.service';
import { MensagemService } from '../../../../services/shared/mensagem.service';
import { GuicheService } from '../../../../services/painel-eletronico/guiche.service';

@Component({
  selector: 'app-guiche-pesquisar',
  templateUrl: './guiche-pesquisar.component.html',
  styleUrls: ['./guiche-pesquisar.component.css']
})
export class GuichePesquisarComponent extends AptareCrudController<Guiche, {new(): Guiche}>{

  constructor(router: Router, 
              route: ActivatedRoute,             
              service: GuicheService,
              dialog: MatDialog,
              mensagem: MensagemService,
              dialogService: DialogService) {
    super(router, route, dialog, Guiche, service, mensagem, dialogService);
  }

  iniciarPaginaPesquisar() {
    this.pesquisar();
  }

  inativarGuiche(codigo) {
    let guiche: Guiche = new Guiche();
    guiche.codigo = codigo;

    this.inativar(guiche);
  }

  ativarGuiche(codigo) {
    let guiche: Guiche = new Guiche();
    guiche.codigo = codigo;

    this.ativar(guiche);
  }

  statusInativar(obj: Guiche) {
    this.listaResultado.forEach(function (value) {
      if(value.codigo == obj.codigo) {
        value.flagAtivo = 'N';
      }
    });
  }

  statusAtivar(obj: Guiche) {
    this.listaResultado.forEach(function (value) {
      if(value.codigo == obj.codigo) {
        value.flagAtivo = 'S';
      }
    });
  }

  editar(id:string) {    
    this.router.navigate(['/guiche-atualizar', id]);
  }

}
