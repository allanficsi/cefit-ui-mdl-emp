import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { Cbo } from '../../../model/trabalhador/cbo';
import { FiltroVaga } from '../../../model/vaga/filtro/filtro-vaga';
import { Vaga } from '../../../model/vaga/vaga';
import { DialogService } from '../../../services/shared/dialog.service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { VagaService } from '../../../services/vaga/vaga.service';
import { startWith, map } from 'rxjs/operators';
import { CboService } from 'src/app/services/trabalhador/cbo.service';
import { ResponseApi } from 'src/app/model/response-api';

@Component({
  selector: 'app-vaga-pesquisar',
  templateUrl: './vaga-pesquisar.component.html',
  styleUrls: ['./vaga-pesquisar.component.css']
})
export class VagaPesquisarComponent extends AptareCrudController<Vaga, {new(): Vaga}>{

  listaSituacao = [];
  listaTipoVaga = [];
  listaCbo = [];
  cbo: Cbo;

  myControlCbo: FormControl = new FormControl();
  filteredOptionsCbo: Observable<Cbo[]>;

  constructor(router: Router, 
              route: ActivatedRoute,             
              service: VagaService,
              dialog: MatDialog,
              mensagem: MensagemService,
              private cboService: CboService,
              dialogService: DialogService) {
    super(router, route, dialog, Vaga, service, mensagem, dialogService);
  }

  iniciarPaginaPesquisar() {
    this.cbo = new Cbo();
  }

  setListasStaticas() {
    this.listaTipoVaga = [{nome: "Formal", valor: "F"}, {nome: "Informal", valor: "I"}];

    this.popularCbo();

    // Autocomplete cbo
    this.filteredOptionsCbo = this.myControlCbo.valueChanges
    .pipe(
      startWith<string | Cbo>(''),
      map(value => typeof value === 'string' ? value : value.nome),
      map(nome => nome ? this._filterCbo(nome) : this.listaCbo.slice())
    );
  }

  displayFnCbo(cbo?: Cbo): string | undefined {
    return cbo ? cbo.nome : undefined;
  }

  private _filterCbo(nome: string): Cbo[] {
    const filterValue = nome.toLowerCase();

    return this.listaCbo.filter(option => option.nome.toLowerCase().indexOf(filterValue) > -1);
  }

  popularCbo() {
    let cbo = new Cbo();

    this.cboService.pesquisar(cbo)
                .subscribe((responseApi:ResponseApi) => {
      this.listaCbo = responseApi['data'];
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  completarPesquisar() {
    this.objetoPesquisa.filtro = null;

    let arrayTipo = [];
    let filtro = new FiltroVaga();
    filtro.tipoVagaIN = [];

    this.listaTipoVaga.forEach(element => {
      if(typeof element.fgSelecionado != 'undefined' && element.fgSelecionado){
        arrayTipo.push(element.valor);
      }
    });

    if(arrayTipo.length > 0) {
      filtro.tipoVagaIN = arrayTipo;
      this.objetoPesquisa.filtro = filtro;
    }

    if(this.cbo != null) {
      this.objetoPesquisa.codigoCbo = this.cbo.codigo;
     }
    this.objetoPesquisa.codigoEmpregador = this.getCodigoEmpregadorLogado();

    console.log(this.objetoPesquisa);
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
