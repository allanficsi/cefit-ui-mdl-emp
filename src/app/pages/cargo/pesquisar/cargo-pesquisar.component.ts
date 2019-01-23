import { Component, OnInit } from '@angular/core';
import { Empregador } from '../../../model/empregador/empregador';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpregadorService } from '../../../services/empregador/empregador.service';
import { MatDialog } from '@angular/material';
import { DialogService } from '../../../dialog-service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { CadastroUnico } from 'src/app/model/cadastro-unico/cadastro-unico';
import { PessoaJuridica } from 'src/app/model/cadastro-unico/pessoa-juridica';
import { Cargo } from '../../../model/cadastro-unico/cargo';
import { CargoService } from '../../../services/cadastro-unico/cargo.service';
import { Auditoria } from 'src/app/model/auditoria';

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
              dialogService: DialogService,
              mensagem: MensagemService) {
    super(router, route, dialogService, dialog, Cargo, service, mensagem);
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
