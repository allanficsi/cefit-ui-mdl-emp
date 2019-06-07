import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Encaminhamento } from '../../../model/vaga/encaminhamento';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { DialogService } from '../../../services/shared/dialog.service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { EncaminhamentoService } from '../../../services/vaga/encaminhamento.service';
import { Vaga } from '../../../model/vaga/vaga';
import { ResponseApi } from '../../../model/response-api';
import { VagaService } from '../../../services/vaga/vaga.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Trabalhador } from '../../../model/trabalhador/trabalhador';
import { CadastroUnico } from 'src/app/model/cadastro-unico/cadastro-unico';
import { TrabalhadorService } from 'src/app/services/trabalhador/trabalhador.service';
import { EncaminhamentoNaoAtendidoService } from 'src/app/services/vaga/encaminhamento-nao-atendido.service';
import { EncaminhamentoNaoAtendido } from 'src/app/model/vaga/encaminhamento-nao-atendido';
import { Auditoria } from 'src/app/model/auditoria';


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
  vaga: Vaga;
  trabalhador: Trabalhador;

  myControlVaga: FormControl = new FormControl();
  filteredOptionsVaga: Observable<Vaga[]>;

  constructor(router: Router,
              route: ActivatedRoute,  
              dialog: MatDialog,                   
              public service: EncaminhamentoService,
              private encaminhamentoNaoAtendidoService: EncaminhamentoNaoAtendidoService,
              private vagaService: VagaService,
              private trabalhadorService: TrabalhadorService,
              mensagem: MensagemService,
              dialogService: DialogService) {
    super(router, route, dialog, Encaminhamento, service, mensagem, dialogService);
  }

  displayFnVaga(vaga?: Vaga): string | undefined {
    return vaga ? vaga.descricao : undefined;
  }

  private _filterVaga(descricao: string): Vaga[] {
    const filterValue = descricao.toLowerCase();

    return this.listaVaga.filter(option => option.descricao.toLowerCase().indexOf(filterValue) > -1);
  }

  iniciarPaginaInserir() {
    this.vaga = new Vaga();
    this.objetoAtualiza.vagaEntity = new Vaga();

    this.trabalhador = new Trabalhador();
    this.trabalhador.cadastroUnico = new CadastroUnico();
  }

  atualizarVaga() {

    this.vaga = new Vaga();

    let vaga = new Vaga();
    vaga.tipoVaga = this.objetoAtualiza.vagaEntity.tipoVaga;
    vaga.situacao = VagaService.SITUACAO_ABERTA;

    this.vagaService.pesquisar(vaga)
          .subscribe((responseApi:ResponseApi) => {
      this.listaVaga = responseApi['data'];

      this.filteredOptionsVaga = this.myControlVaga.valueChanges
      .pipe(
       startWith<string | Vaga>(''),
       map(value => typeof value === 'string' ? value : value.descricao),
       map(descricao => descricao ? this._filterVaga(descricao) : this.listaVaga.slice())
     );
    });

  }

  limparVaga() {
    if(this.vaga == null || typeof this.vaga === 'undefined'
          || this.vaga.codigo == null || typeof this.vaga.codigo === 'undefined') {
      this.vaga = new Vaga();
    }
  }

  selecionarVaga() {

    console.log(this.vaga.tipoDescricaoVaga);

    this.listaTrabalhador = [];
    this.trabalhador = new Trabalhador();
    this.trabalhador.cadastroUnico = new CadastroUnico();

    // Nominal
    if(this.vaga.tipoDescricaoVaga == "N") {
      
      this.trabalhador = this.vaga.trabalhadorEntity;

    } else {
      
      // Geral
      if(this.vaga.tipoDescricaoVaga == "G") {

        let objTrabalhador = new Trabalhador();
        objTrabalhador.situacao = TrabalhadorService.SITUACAO_ATIVA;

        this.trabalhadorService.pesquisar(objTrabalhador)
          .subscribe((responseApi:ResponseApi) => {
            this.listaTrabalhador = responseApi['data'];

            console.log(this.listaTrabalhador);
        });
      }
    }
  }

  marcarEncaminhado(index) {
    this.dialogService.openConfirmDialog('Deseja marcar o funcionário como encaminhado?')
      .afterClosed().subscribe(res =>{
        if(res){
          this.listaTrabalhadorEncaminado.push(this.listaTrabalhador[index]);
          this.listaTrabalhador.splice(index, 1);
        } 
      });
  }

  marcarNaoAtendido(index) {
    this.dialogService.openConfirmDialog('Deseja marcar o funcionário como não atendido?')
    .afterClosed().subscribe(res =>{
      if(res){

        let encaminhamentoNaoAtendido = new EncaminhamentoNaoAtendido();
        encaminhamentoNaoAtendido.codigoTrabalhador = this.listaTrabalhador[index].codigoTrabalhador;
        encaminhamentoNaoAtendido.codigoVaga = this.vaga.codigo;
        
        encaminhamentoNaoAtendido.auditoria = new Auditoria();
        encaminhamentoNaoAtendido.auditoria.codigoUsuarioInclusao = this.getCodigoUsuarioLogado();
        encaminhamentoNaoAtendido.auditoria.dataInclusao = new Date();

        console.log(encaminhamentoNaoAtendido);


        //this.listaTrabalhadorNaoAtendido.push(this.listaTrabalhador[index]);
        //this.listaTrabalhador.splice(index, 1);
      } 
    });
  }
}