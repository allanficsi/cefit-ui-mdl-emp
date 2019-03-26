import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { Cargo } from '../../../model/cadastro-unico/cargo';
import { CargoService } from '../../../services/cadastro-unico/cargo.service';
import { DialogService } from '../../../services/shared/dialog.service';
import { MensagemService } from '../../../services/shared/mensagem.service';

@Component({
  selector: 'app-cargo-pesquisar',
  templateUrl: './cargo-pesquisar.component.html',
  styleUrls: ['./cargo-pesquisar.component.css']
})
export class CargoPesquisarComponent extends AptareCrudController<Cargo, {new(): Cargo}>{

  constructor(router: Router, 
              route: ActivatedRoute,             
              service: CargoService,
              dialog: MatDialog,
              mensagem: MensagemService,
              dialogService: DialogService) {
    super(router, route, dialog, Cargo, service, mensagem, dialogService);
  }

  inativarCargo(codigo) {
    let cargo: Cargo = new Cargo();
    cargo.codigo = codigo;

    this.inativar(cargo);
  }

  ativarCargo(codigo) {
    let cargo: Cargo = new Cargo();
    cargo.codigo = codigo;

    this.ativar(cargo);
  }

  statusInativar(obj: Cargo) {
    this.listaResultado.forEach(function (value) {
      if(value.codigo == obj.codigo) {
        value.flagAtivo = 'N';
      }
    });
  }

  statusAtivar(obj: Cargo) {
    this.listaResultado.forEach(function (value) {
      if(value.codigo == obj.codigo) {
        value.flagAtivo = 'S';
      }
    });
  }

  editar(id:string) {    
    this.router.navigate(['/cargo-atualizar', id]);
  }

}
