import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
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

@Component({
  selector: 'app-trabalhador-pesquisar',
  templateUrl: './trabalhador-pesquisar.component.html',
  styleUrls: ['./trabalhador-pesquisar.component.css']
})
export class TrabalhadorPesquisarComponent extends AptareCrudController<Trabalhador, {new(): Trabalhador}>{

  listaSituacao = [];

  constructor(router: Router, 
              route: ActivatedRoute,             
              service: TrabalhadorService,
              dialog: MatDialog,
              private dominioService: DominioService,
              mensagem: MensagemService,
              dialogService: DialogService) {
    super(router, route, dialog, Trabalhador, service, mensagem, dialogService);   
  }

  iniciarPaginaPesquisar() {
    this.objetoPesquisa.cadastroUnico = new CadastroUnico();
    this.objetoPesquisa.cadastroUnico.pessoaFisica = new PessoaFisica();

    this.objetoPesquisa.cadastroUnico.tipoPessoa = 'F';

    this.popularSituacao();
  }

  popularSituacao() {
    let dominio: Dominio = new Dominio();
    dominio.nomeCampo = 'ST_EMP';

    this.dominioService.pesquisar(dominio)
                .subscribe((responseApi:ResponseApi) => {
      this.listaSituacao = responseApi['data'];
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  inativarTrabalhador(codigo) {
    let trabalhador: Trabalhador = new Trabalhador();
    trabalhador.codigo = codigo;

    this.inativar(trabalhador);
  }

  ativarTrabalhador(codigo) {
    let trabalhador: Trabalhador = new Trabalhador();
    trabalhador.codigo = codigo;

    this.ativar(trabalhador);
  }

  statusInativar(obj: Trabalhador) {
    this.listaResultado.forEach(function (value) {
      if(value.codigo == obj.codigo) {
        value.situacao = 3; //INATIVA
        value.descricaoSituacao = "INATIVO";
      }
    });
  }

  statusAtivar(obj: Trabalhador) {
    this.listaResultado.forEach(function (value) {
      if(value.codigo == obj.codigo) {
        value.situacao = 2; //ATIVA
        value.descricaoSituacao = "ATIVO";
      }
    });
  }

  editar(id:string){   
    this.router.navigate(['/trabalhador-atualizar',id]);
  }

}