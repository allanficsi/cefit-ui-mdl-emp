import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroUnico } from 'src/app/model/cadastro-unico/cadastro-unico';
import { Cbo } from 'src/app/model/trabalhador/cbo';
import { VagaDia } from 'src/app/model/vaga/vaga-dia';
import { CadastroUnicoService } from 'src/app/services/cadastro-unico/cadastro-unico.service';
import { CboService } from 'src/app/services/trabalhador/cbo.service';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { Empregador } from '../../../model/empregador/empregador';
import { ResponseApi } from '../../../model/response-api';
import { Trabalhador } from '../../../model/trabalhador/trabalhador';
import { Vaga } from '../../../model/vaga/vaga';
import { DialogService } from '../../../services/shared/dialog.service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { TrabalhadorService } from '../../../services/trabalhador/trabalhador.service';
import { VagaService } from '../../../services/vaga/vaga.service';
import { ExtensaoEndereco } from '../../../model/cadastro-unico/extensao-endereco';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';


@Component({
  selector: 'app-vaga-visualizar',
  templateUrl: './vaga-visualizar.component.html',
  styleUrls: ['./vaga-visualizar.component.css']
})
export class VagaVisualizarComponent extends AptareCrudController<Vaga, {new(): Vaga}>{ 

  trabalhador: Trabalhador;
  empregador: Empregador;
  cbo: Cbo;
  listaTrabalhador = [];
  listaEmpregador = [];
  listaCbo = [];
  listaVagaAgendamento = [];
  listaDirecionamento = [];

  vagaDia: VagaDia;
  listaVagaDia = [];

  listaEndereco  = [];

  myControlTrabalhador: FormControl = new FormControl();
  filteredOptionsTrabalhador: Observable<Trabalhador[]>;

  myControlCbo: FormControl = new FormControl();
  filteredOptionsCbo: Observable<Cbo[]>;

  constructor(router: Router,
              route: ActivatedRoute,  
              dialog: MatDialog,                   
              service: VagaService,
              mensagem: MensagemService,
              private trabalhadorService: TrabalhadorService,
              private cboService: CboService,
              private cadastroUnicoService: CadastroUnicoService,
              dialogService: DialogService) {
    super(router, route, dialog, Vaga, service, mensagem, dialogService);
  }

  iniciarPaginaAlterar() {
    this.cbo = new Cbo();
    this.objetoAtualiza.cboEntity = this.cbo;
    let vaga: Vaga = new Vaga();
    vaga.codigo = +this.codigo;

    this.vagaDia = new VagaDia();
    this.listaVagaDia = [];

    // GET VAGA COM O CODIGO
    this.service.get(vaga).subscribe((responseApi:ResponseApi) => {      
      this.objetoAtualiza = responseApi.data;
      this.objetoAtualiza.dataInicio = new Date(this.objetoAtualiza.dataInicio);

      if(this.objetoAtualiza.dataLimite != null) {
        this.objetoAtualiza.dataLimite = new Date(this.objetoAtualiza.dataLimite);
      } else {
        this.objetoAtualiza.dataLimite = null;
      }

      if(this.objetoAtualiza.dataFim != null) {
        this.objetoAtualiza.dataFim = new Date(this.objetoAtualiza.dataFim);
      } else {
        this.objetoAtualiza.dataFim = null;
      }
      
      // Nominal ou freguesia
      if(this.objetoAtualiza.tipoDescricaoVaga == 'N' || this.objetoAtualiza.tipoDescricaoVaga == 'F') {
        this.trabalhador = this.objetoAtualiza.trabalhadorEntity;
      }

      // Freguesia
      if(this.objetoAtualiza.tipoDescricaoVaga == 'F') {
        this.listaVagaDia = this.objetoAtualiza.listaVagaDia;
      } else {
        // Geral e Nominal
        this.vagaDia = this.objetoAtualiza.listaVagaDia[0];
        this.vagaDia.data = new Date(this.vagaDia.data);
      }

      this.cbo = this.objetoAtualiza.cboEntity;
      this.empregador = this.objetoAtualiza.empregador;

      let cadastroUnico = new CadastroUnico();
      cadastroUnico.codigo = this.empregador.codigoCadastroUnico;
      this.cadastroUnicoService.get(cadastroUnico)
                            .subscribe((responseApi:ResponseApi) => {

          let objCun: CadastroUnico = responseApi.data;

          // Endereco
          for(let i = 0; i < objCun.listaEndereco.length; i++) {

            let eex: ExtensaoEndereco = new ExtensaoEndereco();

            if(objCun.listaEndereco[i].correio != null) {
              eex.logradouro = objCun.listaEndereco[i].correio.logradouro;
              eex.bairro = objCun.listaEndereco[i].correio.bairro;
              eex.localidade = objCun.listaEndereco[i].correio.localidade;
              eex.uf = objCun.listaEndereco[i].correio.uf;
            } else {
              eex.logradouro = objCun.listaEndereco[i].extensaoEndereco.logradouro;
              eex.bairro = objCun.listaEndereco[i].extensaoEndereco.bairro;
              eex.localidade = objCun.listaEndereco[i].extensaoEndereco.localidade;
              eex.uf = objCun.listaEndereco[i].extensaoEndereco.uf;
            }

            objCun.listaEndereco[i].extensaoEndereco = eex;
            this.listaEndereco.push(objCun.listaEndereco[i]);
          }

      });

    } , err => {
      this.mensagem.tratarErro(err);  
    });
  }

  displayFnTrabalhador(trabalhador?: Trabalhador): string | undefined {
    return trabalhador ? trabalhador.cadastroUnico.nome : undefined;
  }

  displayFnCbo(cbo?: Cbo): string | undefined {
    return cbo ? cbo.nome : undefined;
  }

  private _filterTrabalhador(nome: string): Trabalhador[] {
    const filterValue = nome.toLowerCase();

    return this.listaTrabalhador.filter(option => option.cadastroUnico.nome.toLowerCase().indexOf(filterValue) > -1);
  }

  private _filterCbo(nome: string): Cbo[] {
    const filterValue = nome.toLowerCase();

    return this.listaCbo.filter(option => option.nome.toLowerCase().indexOf(filterValue) > -1);
  }

  setListasStaticas() {
    super.setListasStaticas();

    this.popularDirecionamento();
    this.popularTrabalhador();
    this.popularCbo();

    this.filteredOptionsTrabalhador = this.myControlTrabalhador.valueChanges
    .pipe(
      startWith<string | Trabalhador>(''),
      map(value => typeof value === 'string' ? value : value.cadastroUnico.nome),
      map(nome => nome ? this._filterTrabalhador(nome) : this.listaTrabalhador.slice())
    );

    // Autocomplete cbo
    this.filteredOptionsCbo = this.myControlCbo.valueChanges
    .pipe(
      startWith<string | Cbo>(''),
      map(value => typeof value === 'string' ? value : value.nome),
      map(nome => nome ? this._filterCbo(nome) : this.listaCbo.slice())
    );
  }

  carregarVagaAgendamento() {
    if(this.listaVagaAgendamento != null && typeof this.listaVagaAgendamento !== 'undefined') {
      for (let i = 0; i < this.listaVagaAgendamento.length; i++) {
        for (let j = 0; j < this.listaDia.length; j++) {
          if(this.listaVagaAgendamento[i].numeroDia == this.listaDia[j].valor) {
            this.listaVagaAgendamento[i].nomeDia = this.listaDia[j].nome;
          }
        }
      }
    }
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

  popularDirecionamento() {
    this.listaDirecionamento = [
      { nome:"ATENDIMENTO", valor : 1},
      { nome:"CONVOCAÇÃO NÃO VISÍVEL AO ATENDIMENTO", valor : 2},
      { nome:"INDIFERENTE", valor : 3}
    ]
  }
  popularTrabalhador() {
    let trabalhador: Trabalhador = new Trabalhador();
    trabalhador.situacao = TrabalhadorService.SITUACAO_ATIVA;

    this.trabalhadorService.pesquisar(trabalhador)
                .subscribe((responseApi:ResponseApi) => {
      this.listaTrabalhador = responseApi['data'];
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  voltar() {
    this.back('vaga-pesquisar');
  }

  completarPosInserir() {
    this.router.navigate(['vaga-pesquisar']);
  }

  completarPosAlterar() {
    this.router.navigate(['vaga-pesquisar']);
  }

}
