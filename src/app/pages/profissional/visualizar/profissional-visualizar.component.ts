import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { Auditoria } from '../../../model/auditoria';
import { CadastroUnico } from '../../../model/cadastro-unico/cadastro-unico';
import { Endereco } from '../../../model/cadastro-unico/endereco';
import { ExtensaoEndereco } from '../../../model/cadastro-unico/extensao-endereco';
import { PessoaFisica } from '../../../model/cadastro-unico/pessoa-fisica';
import { PessoaJuridica } from '../../../model/cadastro-unico/pessoa-juridica';
import { Telefone } from '../../../model/cadastro-unico/telefone';
import { Correio } from '../../../model/correio/correio';
import { Dominio } from '../../../model/geral/dominio';
import { Profissional } from '../../../model/profissional/profissional';
import { ProfissionalQualificacao } from '../../../model/profissional/profissional-qualificacao';
import { Qualificacao } from '../../../model/profissional/qualificacao';
import { ResponseApi } from '../../../model/response-api';
import { CorreioService } from '../../../services/correio/correio.service';
import { DominioService } from '../../../services/geral/dominio.service';
import { ProfissionalService } from '../../../services/profissional/profissional.service';
import { QualificacaoService } from '../../../services/profissional/qualificacao.service';
import { DialogService } from '../../../services/shared/dialog.service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { ModalQualificacaoComponent } from '../../geral/modal-qualificacao/modal-qualificacao.component';


@Component({
  selector: 'app-profissional-visualizar',
  templateUrl: './profissional-visualizar.component.html',
  styleUrls: ['./profissional-visualizar.component.css']
})
export class ProfissionalVisualizarComponent extends AptareCrudController<Profissional, {new(): Profissional}>{ 

  listaTipoEndereco = [];
  listaTipoTelefone = [];
  listaEstadoCivil = [];
  listaTelefonePf = [];
  listaEndereco = [];
  listaQualificacao = [];
  listaProfissionalQualificacao = [];
  endereco: Endereco;
  telefonePf: Telefone;
  qualificacao: Qualificacao;
  //profissionalQualificacao = [];

  isLogradouroReadOnly: boolean;
  isBairroReadOnly: boolean;
  isLocalidadeReadOnly: boolean;
  isUfReadOnly: boolean;

  myControlQualificacao: FormControl = new FormControl();
  filteredOptionsQualificacao: Observable<Qualificacao[]>;

  constructor(router: Router,
              route: ActivatedRoute,  
              dialog: MatDialog,                   
              service: ProfissionalService,
              private dominioService: DominioService,
              private qualificacaoService: QualificacaoService,
              private correioService: CorreioService,
              mensagem: MensagemService,
              dialogService: DialogService) {
    super(router, route, dialog, Profissional, service, mensagem, dialogService);    
  }

  setListasStaticas() {
    super.setListasStaticas();
    this.popularEstadoCivil();
  }

  popularEstadoCivil() {
    let dominio: Dominio = new Dominio();
    dominio.nomeCampo = 'CD_EST_CIVIL_CPF';

    this.dominioService.pesquisar(dominio)
                .subscribe((responseApi:ResponseApi) => {
      this.listaEstadoCivil = responseApi['data'];
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  iniciarPaginaAlterar() {

    this.objetoAtualiza.cadastroUnico = new CadastroUnico();
    this.objetoAtualiza.cadastroUnico.pessoaJuridica = new PessoaJuridica();
    this.objetoAtualiza.cadastroUnico.pessoaFisica = new PessoaFisica();
    this.endereco = new Endereco();
    this.endereco.extensaoEndereco = new ExtensaoEndereco();
    //this.contato = new Contato();

    let profissional: Profissional = new Profissional();
    profissional.codigo = +this.codigo;

    // GET TRABALHADOR COM O CODIGO
    this.service.get(profissional).subscribe((responseApi:ResponseApi) => {

      this.objetoAtualiza = responseApi.data;

      this.listaEndereco = [];
      for(let i = 0; i < this.objetoAtualiza.cadastroUnico.listaEndereco.length; i++) {

        let eex: ExtensaoEndereco = new ExtensaoEndereco();

        if(this.objetoAtualiza.cadastroUnico.listaEndereco[i].correio != null) {
          eex.logradouro = this.objetoAtualiza.cadastroUnico.listaEndereco[i].correio.logradouro;
          eex.bairro = this.objetoAtualiza.cadastroUnico.listaEndereco[i].correio.bairro;
          eex.localidade = this.objetoAtualiza.cadastroUnico.listaEndereco[i].correio.localidade;
          eex.uf = this.objetoAtualiza.cadastroUnico.listaEndereco[i].correio.uf;
        } else {
          eex.logradouro = this.objetoAtualiza.cadastroUnico.listaEndereco[i].extensaoEndereco.logradouro;
          eex.bairro = this.objetoAtualiza.cadastroUnico.listaEndereco[i].extensaoEndereco.bairro;
          eex.localidade = this.objetoAtualiza.cadastroUnico.listaEndereco[i].extensaoEndereco.localidade;
          eex.uf = this.objetoAtualiza.cadastroUnico.listaEndereco[i].extensaoEndereco.uf;
        }

        this.objetoAtualiza.cadastroUnico.listaEndereco[i].extensaoEndereco = eex;
        this.listaEndereco.push(this.objetoAtualiza.cadastroUnico.listaEndereco[i]);
      }

      this.objetoAtualiza.dataEmissaoCtps = new Date(this.objetoAtualiza.dataEmissaoCtps);
      this.objetoAtualiza.cadastroUnico.pessoaFisica.dataEmissaoRg = new Date(this.objetoAtualiza.cadastroUnico.pessoaFisica.dataEmissaoRg);
      this.objetoAtualiza.cadastroUnico.pessoaFisica.dataNascimento = new Date(this.objetoAtualiza.cadastroUnico.pessoaFisica.dataNascimento);
      
      this.listaTelefonePf = [];
      if(typeof this.objetoAtualiza.cadastroUnico.pessoaFisica.listaTelefone !== 'undefined') {
        for(let i = 0; i < this.objetoAtualiza.cadastroUnico.pessoaFisica.listaTelefone.length; i++) {
          this.listaTelefonePf.push(this.objetoAtualiza.cadastroUnico.pessoaFisica.listaTelefone[i]);
        }
      }

      this.listaProfissionalQualificacao = [];
      if(typeof this.objetoAtualiza.listaProfissionalQualificacao !== 'undefined') {
        for(let i = 0; i < this.objetoAtualiza.listaProfissionalQualificacao.length; i++) {
          this.listaProfissionalQualificacao.push(this.objetoAtualiza.listaProfissionalQualificacao[i]);
        }
      }
      
    } , err => {
      this.mensagem.tratarErro(err);  
    });
  }

  voltar() {
    this.back('profissional-pesquisar');
  }
  
}