import { Component, OnInit } from '@angular/core';
import { Empregador } from '../../../model/empregador/empregador';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpregadorService } from '../../../services/empregador/empregador.service';
import { MatDialog } from '@angular/material';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { CadastroUnico } from '../../../model/cadastro-unico/cadastro-unico';
import { PessoaJuridica } from '../../../model/cadastro-unico/pessoa-juridica';
import { PessoaFisica } from '../../../model/cadastro-unico/pessoa-fisica';
import { Dominio } from '../../../model/geral/dominio';
import { DominioService } from '../../../services/geral/dominio.service';
import { ResponseApi } from 'src/app/model/response-api';
import { DialogService } from 'src/app/services/shared/dialog.service';
import { CadastroUnicoService } from 'src/app/services/cadastro-unico/cadastro-unico.service';

@Component({
  selector: 'app-empregador-pesquisar',
  templateUrl: './empregador-pesquisar.component.html',
  styleUrls: ['./empregador-pesquisar.component.css']
})
export class EmpregadorPesquisarComponent extends AptareCrudController<Empregador, {new(): Empregador}>{

  listaSituacao = [];
  valueSituacao = [];

  constructor(router: Router, 
              route: ActivatedRoute,             
              service: EmpregadorService,
              dialog: MatDialog,
              private dominioService: DominioService,
              mensagem: MensagemService,
              dialogService: DialogService) {
    super(router, route, dialog, Empregador, service, mensagem, dialogService);   
  }

  iniciarPaginaPesquisar() {
    this.objetoPesquisa.cadastroUnico = new CadastroUnico();
    this.objetoPesquisa.cadastroUnico.pessoaJuridica = new PessoaJuridica();
    this.objetoPesquisa.cadastroUnico.pessoaFisica = new PessoaFisica();

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

  selecionarTipoPessoa() {
    let tipoPessoa = this.objetoPesquisa.cadastroUnico.tipoPessoa;

    this.objetoPesquisa.cadastroUnico = new CadastroUnico();

    this.objetoPesquisa.cadastroUnico.pessoaJuridica = new PessoaJuridica();
    this.objetoPesquisa.cadastroUnico.pessoaFisica = new PessoaFisica();

    this.objetoPesquisa.cadastroUnico.tipoPessoa = tipoPessoa;
  }

  inativarEmpregador(codigo) {
    let empregador: Empregador = new Empregador();
    empregador.codigo = codigo;

    this.inativar(empregador);
  }

  ativarEmpregador(codigo) {
    let empregador: Empregador = new Empregador();
    empregador.codigo = codigo;

    this.ativar(empregador);
  }

  statusInativar(obj: Empregador) {
    this.listaResultado.forEach(function (value) {
      if(value.codigo == obj.codigo) {
        value.situacao = 3; //INATIVA
        value.descricaoSituacao = "INATIVO";
      }
    });
  }

  statusAtivar(obj: Empregador) {
    this.listaResultado.forEach(function (value) {
      if(value.codigo == obj.codigo) {
        value.situacao = 2; //ATIVA
        value.descricaoSituacao = "ATIVO";
      }
    });
  }

  editar(id:string){    
    super.editar('/empregador-atualizar', id);
  }

  visualizar(id:string){    
    super.editar('/empregador-visualizar', id);
  }

  novo() {
    this.router.navigate(['/empregador-atualizar']);
  }

}
