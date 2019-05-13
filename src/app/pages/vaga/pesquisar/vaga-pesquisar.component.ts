import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { CadastroUnico } from '../../../model/cadastro-unico/cadastro-unico';
import { PessoaFisica } from '../../../model/cadastro-unico/pessoa-fisica';
import { Dominio } from '../../../model/geral/dominio';
import { ResponseApi } from '../../../model/response-api';
import { Trabalhador } from '../../../model/trabalhador/trabalhador';
import { DominioService } from '../../../services/geral/dominio.service';
import { DialogService } from '../../../services/shared/dialog.service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { TrabalhadorService } from '../../../services/trabalhador/trabalhador.service';
import { Vaga } from '../../../model/vaga/vaga';
import { VagaService } from 'src/app/services/vaga/vaga.service';
import { FiltroVaga } from 'src/app/model/vaga/filtro/filtro-vaga';

@Component({
  selector: 'app-vaga-pesquisar',
  templateUrl: './vaga-pesquisar.component.html',
  styleUrls: ['./vaga-pesquisar.component.css']
})
export class VagaPesquisarComponent extends AptareCrudController<Vaga, {new(): Vaga}>{

  listaSituacao = [];
  listaTipoVaga = [];

  constructor(router: Router, 
              route: ActivatedRoute,             
              service: VagaService,
              dialog: MatDialog,
              mensagem: MensagemService,
              dialogService: DialogService) {
    super(router, route, dialog, Vaga, service, mensagem, dialogService);
  }

  setListasStaticas() {
    this.listaTipoVaga = [{nome: "Formal", valor: "F"}, {nome: "Informal", valor: "I"}];
  }

  completarPesquisar() {
    let arrayTipo = [];
    let filtro = new FiltroVaga();

    this.listaTipoVaga.forEach(element => {
      if(typeof element.fgSelecionado != 'undefined' && element.fgSelecionado){
        arrayTipo.push(element.valor);
      }
    });

    if(arrayTipo.length > 0) {
      filtro.tipoVagaIN = arrayTipo;
      this.objetoPesquisa.filtro = filtro;
    }
  }
  
  novo() {
    this.router.navigate(['/vaga-atualizar']);
  }

  editar(id:string){   
    super.editar('/vaga-atualizar', id);
  }

  visualizar(id: string) {
    super.editar('/vaga-visualizar',id);
  }
}
