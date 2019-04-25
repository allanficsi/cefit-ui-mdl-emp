import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { Auditoria } from '../../../model/auditoria';
import { CadastroUnico } from '../../../model/cadastro-unico/cadastro-unico';
import { Cargo } from '../../../model/cadastro-unico/cargo';
import { Contato } from '../../../model/cadastro-unico/contato';
import { Endereco } from '../../../model/cadastro-unico/endereco';
import { ExtensaoEndereco } from '../../../model/cadastro-unico/extensao-endereco';
import { PessoaFisica } from '../../../model/cadastro-unico/pessoa-fisica';
import { PessoaJuridica } from '../../../model/cadastro-unico/pessoa-juridica';
import { Telefone } from '../../../model/cadastro-unico/telefone';
import { Correio } from '../../../model/correio/correio';
import { Cnae } from '../../../model/empregador/cnae';
import { Empregador } from '../../../model/empregador/empregador';
import { Dominio } from '../../../model/geral/dominio';
import { ResponseApi } from '../../../model/response-api';
import { CargoService } from '../../../services/cadastro-unico/cargo.service';
import { CorreioService } from '../../../services/correio/correio.service';
import { CnaeService } from '../../../services/empregador/cnae.service';
import { EmpregadorService } from '../../../services/empregador/empregador.service';
import { DominioService } from '../../../services/geral/dominio.service';
import { DialogService } from '../../../services/shared/dialog.service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { ModalCargoComponent } from '../../geral/modal-cargo/modal-cargo.component';
import { ModalEditarContatoComponent } from '../../geral/modal-editar-contato/modal-editar-contato.component';
import { ModalTelefoneComponent } from '../../geral/modal-telefone/modal-telefone.component';


@Component({
  selector: 'app-empregador-visualizar',
  templateUrl: './empregador-visualizar.component.html',
  styleUrls: ['./empregador-visualizar.component.css']
})
export class EmpregadorVisualizarComponent extends AptareCrudController<Empregador, {new(): Empregador}>{ 

  listaTipoEndereco = [];
  listaTipoTelefone = [];
  listaCargo = [];
  listaContato = [];
  listaTelefonePf = [];
  listaEndereco = [];
  listaCnae = [];
  listaTipoContato = [];
  listaPorteEmpresa = [];
  endereco: Endereco;
  contato: Contato;
  telefonePf: Telefone;

  isLogradouroReadOnly: boolean;
  isBairroReadOnly: boolean;
  isLocalidadeReadOnly: boolean;
  isUfReadOnly: boolean;
  
  myControlCnae: FormControl = new FormControl();
  filteredOptions: Observable<Cnae[]>;

  constructor(router: Router,
              route: ActivatedRoute,  
              dialog: MatDialog,                   
              service: EmpregadorService,
              private dominioService: DominioService,
              private correioService: CorreioService,
              private cargoService: CargoService,
              private cnaeService: CnaeService,
              mensagem: MensagemService,
              dialogService: DialogService) {
    super(router, route, dialog, Empregador, service, mensagem, dialogService);
  }

  setListasStaticas() {

    super.setListasStaticas();
    this.popularTipoEndereco();
    this.popularCargo(null);
    this.popularPorteEmpresa();
    this.popularCnae();
    this.popularTipoContato();
    this.popularTipoTelefone();

  }

  iniciarPaginaAlterar() {

    this.objetoAtualiza.cadastroUnico = new CadastroUnico();
    this.objetoAtualiza.cadastroUnico.pessoaJuridica = new PessoaJuridica();
    this.objetoAtualiza.cadastroUnico.pessoaFisica = new PessoaFisica();
    this.endereco = new Endereco();
    this.endereco.extensaoEndereco = new ExtensaoEndereco();
    this.contato = new Contato();

    let empregador: Empregador = new Empregador();
    empregador.codigo = +this.codigo;

    // GET EMPREGADOR COM O CODIGO
    this.service.get(empregador).subscribe((responseApi:ResponseApi) => {              

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

      //CONTATO PJ
      if(this.objetoAtualiza.cadastroUnico.tipoPessoa == "J") {
        this.listaContato = [];
        if(typeof this.objetoAtualiza.cadastroUnico.pessoaJuridica.listaContato !== 'undefined') {
          for(let i = 0; i < this.objetoAtualiza.cadastroUnico.pessoaJuridica.listaContato.length; i++) {
            this.listaContato.push(this.objetoAtualiza.cadastroUnico.pessoaJuridica.listaContato[i]);
          }
        }
      }

      //TELEFONE PF
      if(this.objetoAtualiza.cadastroUnico.tipoPessoa == "F") {
        this.objetoAtualiza.cadastroUnico.pessoaFisica.dataNascimento = new Date(this.objetoAtualiza.cadastroUnico.pessoaFisica.dataNascimento);
        this.listaTelefonePf = [];
        if(typeof this.objetoAtualiza.cadastroUnico.pessoaFisica.listaTelefone !== 'undefined') {
          for(let i = 0; i < this.objetoAtualiza.cadastroUnico.pessoaFisica.listaTelefone.length; i++) {
            this.listaTelefonePf.push(this.objetoAtualiza.cadastroUnico.pessoaFisica.listaTelefone[i]);
          }
        }
      }

      //setar valor Cnae
      for(var i=0; i < this.listaCnae.length;i++)
      {
      	 //console.log(this.listaCnae[i].codigo);
      	 if(this.listaCnae[i].codigo == this.objetoAtualiza.codigoCnae)
      	 {
      	 	this.objetoAtualiza.cnae = this.listaCnae[i];
      	 }
      }

      //console.log(this.objetoAtualiza);
    } , err => {
      this.mensagem.tratarErro(err);  
    });
  }

  selecionarTipoPessoa() {

    let tipoPessoa = this.objetoAtualiza.cadastroUnico.tipoPessoa;

    this.objetoAtualiza.cadastroUnico = new CadastroUnico();

    this.objetoAtualiza.cadastroUnico.pessoaJuridica = new PessoaJuridica();
    //this.objetoAtualiza.cadastroUnico.tipoPessoa = 'J';
    this.objetoAtualiza.codigoPorteEmpresa = 1;
    this.objetoAtualiza.codigoCnae = null;

    this.objetoAtualiza.cadastroUnico.pessoaFisica = new PessoaFisica();
    this.objetoAtualiza.cadastroUnico.pessoaFisica.ufOrgaoEmissorRg = 'AC';
    this.objetoAtualiza.cadastroUnico.pessoaFisica.sexo = 'M';

    this.objetoAtualiza.numeroCei = null;

    
    this.objetoAtualiza.cadastroUnico.tipoPessoa = tipoPessoa;
    this.listaTelefonePf = [];
    this.listaContato = [];
    
  }

  popularTipoTelefone() {

    this.telefonePf = new Telefone();

    let dominio: Dominio = new Dominio();
    dominio.nomeCampo = 'TP_TLF';

    this.dominioService.pesquisar(dominio)
                .subscribe((responseApi:ResponseApi) => {
      this.listaTipoTelefone = responseApi['data'];
      this.telefonePf.objTipo = this.listaTipoTelefone[0];
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  popularTipoEndereco() {
    let dominio: Dominio = new Dominio();
    dominio.nomeCampo = 'TP_EDR';

    this.dominioService.pesquisar(dominio)
                .subscribe((responseApi:ResponseApi) => {
      this.listaTipoEndereco = responseApi['data'];
      this.endereco.objTipo = this.listaTipoEndereco[0]; 
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  popularPorteEmpresa() {
    let dominio: Dominio = new Dominio();
    dominio.nomeCampo = 'CD_PEM';

    this.dominioService.pesquisar(dominio)
                .subscribe((responseApi:ResponseApi) => {
      this.listaPorteEmpresa = responseApi['data']; 
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  pesquisarCep() {
    if(this.endereco.cepFormatado != null
        && this.endereco.cepFormatado != '') {
      let correio: Correio = new Correio();
      correio.cep = Number(this.endereco.cepFormatado);

      this.correioService.get(correio)
                  .subscribe((responseApi:ResponseApi) => {
        let correio: Correio = new Correio();
        correio = responseApi['data'];
        
        this.endereco.extensaoEndereco = new ExtensaoEndereco();
        
        if(correio != null) {
          this.endereco.extensaoEndereco.logradouro = correio.logradouro;
          this.endereco.extensaoEndereco.bairro = correio.bairro;
          this.endereco.extensaoEndereco.localidade = correio.localidade;
          this.endereco.extensaoEndereco.uf = correio.uf;

          this.endereco.extensaoEndereco.logradouro == "" ? this.isLogradouroReadOnly = false : this.isLogradouroReadOnly = true;
          this.endereco.extensaoEndereco.bairro == "" ? this.isBairroReadOnly = false : this.isBairroReadOnly = true;
          this.endereco.extensaoEndereco.localidade == "" ? this.isLocalidadeReadOnly = false : this.isLocalidadeReadOnly = true;
          this.endereco.extensaoEndereco.uf == "" ? this.isUfReadOnly = false : this.isUfReadOnly = true;

        } else {
          this.endereco.extensaoEndereco.logradouro = null;
          this.endereco.extensaoEndereco.bairro = null;
          this.endereco.extensaoEndereco.localidade = null;
          this.endereco.extensaoEndereco.uf = 'AC';

          this.isLogradouroReadOnly = false;
          this.isBairroReadOnly = false;
          this.isLocalidadeReadOnly = false;
          this.isUfReadOnly = false;
        }
      } , err => {
        this.mensagem.tratarErro(err);
      });
    } else {
      this.endereco.extensaoEndereco.logradouro = null;
      this.endereco.extensaoEndereco.bairro = null;
      this.endereco.extensaoEndereco.localidade = null;
      this.endereco.extensaoEndereco.uf = "AC";

      this.isLogradouroReadOnly = false;
      this.isBairroReadOnly = false;
      this.isLocalidadeReadOnly = false;
      this.isUfReadOnly = false;
    }
  }

  popularCargo(codigo) {
    let cargo: Cargo = new Cargo();

    this.cargoService.pesquisar(cargo)
                .subscribe((responseApi:ResponseApi) => {
      this.listaCargo = responseApi['data']; 
      if(codigo != null && typeof codigo !== "undefined") {
        for(let i = 0; i < this.listaCargo.length; i++) {
          if(codigo == this.listaCargo[i].codigo) {
            this.contato.cargo = this.listaCargo[i];
          }
        }
      } else {
        this.contato.cargo = this.listaCargo[0];
      }
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  popularCnae() {
    let cnae: Cnae = new Cnae();

    this.cnaeService.pesquisar(cnae)
                .subscribe((responseApi:ResponseApi) => {
      this.listaCnae = responseApi['data']; 
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  popularTipoContato() {
    let dominio: Dominio = new Dominio();
    dominio.nomeCampo = 'TP_CTT';

    this.dominioService.pesquisar(dominio)
                .subscribe((responseApi:ResponseApi) => {
      this.listaTipoContato = responseApi['data']; 
      this.contato.objTipoContato = this.listaTipoContato[0];
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  voltar() {
    this.back('empregador-pesquisar');
  }

}