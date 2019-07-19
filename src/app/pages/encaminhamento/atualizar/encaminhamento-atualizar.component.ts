import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Auditoria } from 'src/app/model/auditoria';
import { CadastroUnico } from 'src/app/model/cadastro-unico/cadastro-unico';
import { Empregador } from 'src/app/model/empregador/empregador';
import { EncaminhamentoNaoAtendido } from 'src/app/model/vaga/encaminhamento-nao-atendido';
import { FiltroVaga } from 'src/app/model/vaga/filtro/filtro-vaga';
import { TrabalhadorService } from 'src/app/services/trabalhador/trabalhador.service';
import { EncaminhamentoNaoAtendidoService } from 'src/app/services/vaga/encaminhamento-nao-atendido.service';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { ResponseApi } from '../../../model/response-api';
import { Trabalhador } from '../../../model/trabalhador/trabalhador';
import { Encaminhamento } from '../../../model/vaga/encaminhamento';
import { Vaga } from '../../../model/vaga/vaga';
import { DialogService } from '../../../services/shared/dialog.service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { EncaminhamentoService } from '../../../services/vaga/encaminhamento.service';
import { VagaService } from '../../../services/vaga/vaga.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Cbo } from '../../../model/trabalhador/cbo';
import { startWith, map } from 'rxjs/operators';
import { CboService } from 'src/app/services/trabalhador/cbo.service';


@Component({
  selector: 'app-encaminhamento-atualizar',
  templateUrl: './encaminhamento-atualizar.component.html',
  styleUrls: ['./encaminhamento-atualizar.component.css']
})
export class EncaminhamentoAtualizarComponent extends AptareCrudController<Encaminhamento, {new(): Encaminhamento}>{

  listaVaga = [];
  listaTrabalhador = [];
  listaTrabalhadorNaoAtendido = [];
  listaTrabalhadorEncaminado = [];
  listaCbo = [];
  vaga: Vaga;
  cbo: Cbo;
  trabalhador: Trabalhador;
  empregador: Empregador;

  myControlCbo: FormControl = new FormControl();
  filteredOptionsCbo: Observable<Cbo[]>;

  constructor(router: Router,
              route: ActivatedRoute,  
              dialog: MatDialog,                   
              public service: EncaminhamentoService,
              private encaminhamentoNaoAtendidoService: EncaminhamentoNaoAtendidoService,
              private vagaService: VagaService,
              private trabalhadorService: TrabalhadorService,
              private cboService: CboService,
              mensagem: MensagemService,
              dialogService: DialogService) {
    super(router, route, dialog, Encaminhamento, service, mensagem, dialogService);
  }

  iniciarPaginaInserir() {
    this.cbo = new Cbo();
    this.vaga = new Vaga();
    this.objetoAtualiza.vaga = new Vaga();
    this.objetoAtualiza.vaga.tipoVaga = "I";
    this.objetoAtualiza.vaga.tipoDescricaoVaga = "G";

    this.trabalhador = new Trabalhador();
    this.trabalhador.cadastroUnico = new CadastroUnico();

    this.empregador = new Empregador();
    this.empregador.cadastroUnico = new CadastroUnico();
  }

  setListasStaticas() {

    this.popularCbo();

    // Autocomplete cbo
    this.filteredOptionsCbo = this.myControlCbo.valueChanges
    .pipe(
      startWith<string | Cbo>(''),
      map(value => typeof value === 'string' ? value : value.nome),
      map(nome => nome ? this._filterCbo(nome) : this.listaCbo.slice())
    );
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

  pesquisarVaga() {

    this.trabalhador = new Trabalhador();
    this.trabalhador.cadastroUnico = new CadastroUnico();

    this.empregador = new Empregador();
    this.empregador.cadastroUnico = new CadastroUnico();

    this.listaVaga = [];
    this.listaTrabalhador = [];
    this.listaTrabalhadorNaoAtendido = [];
    this.listaTrabalhadorEncaminado = [];

    this.vaga = new Vaga();

    let vaga = new Vaga();
    vaga.filtro = new FiltroVaga();
    vaga.tipoVaga = this.objetoAtualiza.vaga.tipoVaga;
    vaga.tipoDescricaoVaga = this.objetoAtualiza.vaga.tipoDescricaoVaga;
    vaga.situacao = VagaService.SITUACAO_ABERTA;
    vaga.descricao = this.objetoAtualiza.vaga.descricao;
    vaga.codigoCbo = this.cbo.codigo;
    vaga.filtro.flagAtivoDiferenteEncaminhamento = "S";

    this.vagaService.listarVagasEncaminhamento(vaga)
          .subscribe((responseApi:ResponseApi) => {
      this.listaVaga = responseApi['data'];
    });

  }

  limparDados() {
    this.iniciarPaginaInserir();
    this.setListasStaticas();
    this.cbo = new Cbo();
    this.listaVaga = [];
    this.listaTrabalhador = [];
    this.listaTrabalhadorNaoAtendido = [];
    this.listaTrabalhadorEncaminado = [];
  }

  atualizarTrabalhadores(obj) {

    this.vaga = obj;

    this.listarTrabalhadoresDisponiveis();
    this.listarTrabalhadoresNaoAtendidos();
  }

  selecionarVaga() {
 
    this.listaTrabalhador = [];
    this.trabalhador = new Trabalhador();
    this.trabalhador.cadastroUnico = new CadastroUnico();
 
    // Nominal
    if(this.vaga.tipoDescricaoVaga == "N") {
 
      this.trabalhador = this.vaga.trabalhadorEntity;
 
    } else {
 
      // Geral
      if(this.vaga.tipoDescricaoVaga == "G") {
 
        this.listarTrabalhadoresDisponiveis();
        this.listarTrabalhadoresNaoAtendidos();

      }
    }
  }

  listarTrabalhadoresDisponiveis() {

    this.listaTrabalhador = [];
    this.trabalhador = new Trabalhador();
    this.trabalhador.cadastroUnico = new CadastroUnico();

   // this.empregador = this.vaga.empregadorEntity;

    // Nominal
    if(this.vaga.tipoDescricaoVaga == "N") {
      this.trabalhador = this.vaga.trabalhadorEntity;
    } else {
      // Geral
      if(this.vaga.tipoDescricaoVaga == "G") {

        let objVaga = new Vaga();
        objVaga.codigo = this.vaga.codigo;

        this.trabalhadorService.listarTrabalhadoresDisponiveis(objVaga)
          .subscribe((responseApi:ResponseApi) => {
            this.listaTrabalhador = responseApi['data'];
        });
      }

    }
  }

  displayFnCbo(cbo?: Cbo): string | undefined {
    return cbo ? cbo.nome : undefined;
  }

  private _filterCbo(nome: string): Cbo[] {
    const filterValue = nome.toLowerCase();

    return this.listaCbo.filter(option => option.nome.toLowerCase().indexOf(filterValue) > -1);
  }

  listarTrabalhadoresNaoAtendidos() {
    let encaminhamentoNaoAtendido = new EncaminhamentoNaoAtendido();
    encaminhamentoNaoAtendido.codigoVaga = this.vaga.codigo;

    this.encaminhamentoNaoAtendidoService.pesquisar(encaminhamentoNaoAtendido)
          .subscribe((responseApi:ResponseApi) => {
            this.listaTrabalhadorNaoAtendido = responseApi['data'];
        });
  }

  marcarEncaminhado(index) {
    this.dialogService.openConfirmDialog('Deseja concluir o encaminhamento?')
      .afterClosed().subscribe(res =>{
        if(res){

          let encaminhamento = new Encaminhamento();
          encaminhamento.codigoVaga = this.vaga.codigo;
          encaminhamento.codigoTrabalhador = this.listaTrabalhador[index].codigo;
          encaminhamento.flagAtivo = 'S';
          
          encaminhamento.auditoria = new Auditoria();
          encaminhamento.auditoria.codigoUsuarioInclusao = this.getCodigoUsuarioLogado();
          encaminhamento.auditoria.dataInclusao = new Date();

          this.service.inserir(encaminhamento).subscribe((responseApi:ResponseApi) => {

            this.mensagem.msgSucesso('O encaminhamento foi realizado com sucesso.');
            this.router.navigate(['encaminhamento-pesquisar']);

          } , err => {
            this.mensagem.tratarErro(err);
          });

        } 
      });
  }

  marcarEncaminhadoNominal(index) {
    this.dialogService.openConfirmDialog('Deseja deseja concluir o encaminhamento?')
      .afterClosed().subscribe(res =>{
        if(res){

          let encaminhamento = new Encaminhamento();
          encaminhamento.codigoVaga = this.vaga.codigo;
          encaminhamento.codigoTrabalhador = this.trabalhador.codigo;
          
          encaminhamento.auditoria = new Auditoria();
          encaminhamento.auditoria.codigoUsuarioInclusao = this.getCodigoUsuarioLogado();
          encaminhamento.auditoria.dataInclusao = new Date();

          this.service.inserir(encaminhamento).subscribe((responseApi:ResponseApi) => {

            this.mensagem.msgSucesso('O encaminhamento foi realizado com sucesso.');
            this.router.navigate(['encaminhamento-pesquisar']);

          } , err => {
            this.mensagem.tratarErro(err);
          });

        } 
      });
  }

  marcarNaoAtendido(index) {
    this.dialogService.openConfirmDialog('Deseja marcar o funcionário como não atendido?')
      .afterClosed().subscribe(res =>{
        if(res){
          let encaminhamentoNaoAtendido = new EncaminhamentoNaoAtendido();
          encaminhamentoNaoAtendido.codigoTrabalhador = this.listaTrabalhador[index].codigo;
          encaminhamentoNaoAtendido.codigoVaga = this.vaga.codigo;
          encaminhamentoNaoAtendido.flagAtivo = "S";
          
          encaminhamentoNaoAtendido.auditoria = new Auditoria();
          encaminhamentoNaoAtendido.auditoria.codigoUsuarioInclusao = this.getCodigoUsuarioLogado();
          encaminhamentoNaoAtendido.auditoria.dataInclusao = new Date();

          this.encaminhamentoNaoAtendidoService.inserir(encaminhamentoNaoAtendido).subscribe((responseApi:ResponseApi) => {

            this.atualizarTrabalhadores(this.vaga);
            this.mensagem.msgSucesso('O funcionário foi marcado como não atendido.');

          } , err => {
            this.mensagem.tratarErro(err);
          });
        } 
      });
  }

}
