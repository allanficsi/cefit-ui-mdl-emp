import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { Espaco } from '../../../model/espaco/espaco';
import { EspacoService } from '../../../services/espaco/espaco.service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { DialogService } from '../../../services/shared/dialog.service';
import { CadastroUnicoService } from 'src/app/services/cadastro-unico/cadastro-unico.service';

@Component({
  selector: 'app-espaco-pesquisar',
  templateUrl: './espaco-pesquisar.component.html',
  styleUrls: ['./espaco-pesquisar.component.css']
})
export class EspacoPesquisarComponent extends AptareCrudController<Espaco, {new(): Espaco}>{

  constructor(router: Router, 
              route: ActivatedRoute,             
              service: EspacoService,
              dialog: MatDialog,
              mensagem: MensagemService,
              dialogService: DialogService) {
    super(router, route, dialog, Espaco, service, mensagem, dialogService);
  }

  inativarItemEspaco(codigo) {
    let espaco: Espaco = new Espaco();
    espaco.codigo = codigo;

    this.inativar(espaco);
  }

  ativarItemEspaco(codigo) {
    let espaco: Espaco = new Espaco();
    espaco.codigo = codigo;

    this.ativar(espaco);
  }

  statusInativar(obj: Espaco) {
    this.listaResultado.forEach(function (value) {
      if(value.codigo == obj.codigo) {
        value.flagAtivo = 'N';
      }
    });
  }

  statusAtivar(obj: Espaco) {
    this.listaResultado.forEach(function (value) {
      if(value.codigo == obj.codigo) {
        value.flagAtivo = 'S';
      }
    });
  }

  editar(id:string) {    
    this.router.navigate(['/espaco-atualizar', id]);
  }

}
