import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { DialogService } from '../../../dialog-service';
import { Auditoria } from '../../../model/auditoria';
import { CadastroUnico } from '../../../model/cadastro-unico/cadastro-unico';
import { Cargo } from '../../../model/cadastro-unico/cargo';
import { Contato } from '../../../model/cadastro-unico/contato';
import { Endereco } from '../../../model/cadastro-unico/endereco';
import { ExtensaoEndereco } from '../../../model/cadastro-unico/extensao-endereco';
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
import { MensagemService } from '../../../services/shared/mensagem.service';
import { ModalCargoComponent } from '../../geral/modal-cargo/modal-cargo.component';
import { ModalTelefoneComponent } from '../../geral/modal-telefone/modal-telefone.component';
import { PessoaFisica } from '../../../model/cadastro-unico/pessoa-fisica';
import { ModalEditarContatoComponent } from '../../geral/modal-editar-contato/modal-editar-contato.component';
import { elementProperty } from '@angular/core/src/render3/instructions';
import { ContentObserver } from '@angular/cdk/observers';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-empregador-atualizar',
  templateUrl: './empregador-atualizar.component.html',
  styleUrls: ['./empregador-atualizar.component.css']
})
export class EmpregadorAtualizarComponent extends AptareCrudController<Empregador, {new(): Empregador}>{ 
  @Input() value: any;
  @Output() valueChange = new EventEmitter();
 

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
  
  myControlCnae: FormControl = new FormControl();
  filteredOptions: Observable<Cnae[]>;

  constructor(router: Router,
              dialogService: DialogService,
              route: ActivatedRoute,  
              dialog: MatDialog,                   
              service: EmpregadorService,
              private dominioService: DominioService,
              private correioService: CorreioService,
              private cargoService: CargoService,
              private cnaeService: CnaeService,
              mensagem: MensagemService) {
    super(router, route, dialogService, dialog, Empregador, service, mensagem);
 }

 ngOnInit(): void {
    super.ngOnInit();
    this.filteredOptions = this.myControlCnae.valueChanges
      .pipe(
        startWith<string | Cnae>(''),
        map(value => typeof value === 'string' ? value : value.descricao),
        map(descricao => descricao ? this._filter(descricao) : this.listaCnae.slice())
      );
 }

  displayFn(cnae?: Cnae): string | undefined {
    return cnae ? cnae.descricao : undefined;
  }

  private _filter(descricao: string): Cnae[] {
    const filterValue = descricao.toLowerCase();

    return this.listaCnae.filter(option => option.descricao.toLowerCase().indexOf(filterValue) === 0);
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

  iniciarPaginaInserir() {

    this.endereco = new Endereco();
    this.contato = new Contato();
    this.endereco.extensaoEndereco = new ExtensaoEndereco();
    this.endereco.extensaoEndereco.uf = 'AC';

    this.objetoAtualiza.cadastroUnico = new CadastroUnico();

    this.objetoAtualiza.cadastroUnico.pessoaJuridica = new PessoaJuridica();
    this.objetoAtualiza.cadastroUnico.tipoPessoa = 'J';
    this.objetoAtualiza.codigoPorteEmpresa = 1;
    this.objetoAtualiza.codigoCnae = null;

    this.objetoAtualiza.cadastroUnico.pessoaFisica = new PessoaFisica();
    this.objetoAtualiza.cadastroUnico.pessoaFisica.ufOrgaoEmissorRg = 'AC';
    this.objetoAtualiza.cadastroUnico.pessoaFisica.sexo = 'M';

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
        } else {
          this.endereco.extensaoEndereco.logradouro = null;
          this.endereco.extensaoEndereco.bairro = null;
          this.endereco.extensaoEndereco.localidade = null;
          this.endereco.extensaoEndereco.uf = 'AC';
        }
      } , err => {
        this.mensagem.tratarErro(err);
      });
    } else {
      this.endereco.extensaoEndereco.logradouro = null;
          this.endereco.extensaoEndereco.bairro = null;
          this.endereco.extensaoEndereco.localidade = null;
          this.endereco.extensaoEndereco.uf = "AC";
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

  adicionarEndereco() {
    if(this.validarEndereco()) {
      
      let enderecoAdicionar: Endereco = new Endereco();
      enderecoAdicionar.extensaoEndereco = new ExtensaoEndereco();

      enderecoAdicionar.tipo = this.endereco.objTipo.valorCampo;
      enderecoAdicionar.descricaoTipo = this.endereco.objTipo.nomeValor;
      enderecoAdicionar.cepFormatado = this.endereco.cepFormatado;
      enderecoAdicionar.cep = Number(this.endereco.cepFormatado);
      enderecoAdicionar.extensaoEndereco.logradouro = this.endereco.extensaoEndereco.logradouro;
      enderecoAdicionar.numero = this.endereco.numero;
      enderecoAdicionar.complemento = this.endereco.complemento;
      enderecoAdicionar.pontoReferencia = this.endereco.pontoReferencia;
      enderecoAdicionar.extensaoEndereco.bairro = this.endereco.extensaoEndereco.bairro;
      enderecoAdicionar.extensaoEndereco.localidade = this.endereco.extensaoEndereco.localidade;
      enderecoAdicionar.extensaoEndereco.uf = this.endereco.extensaoEndereco.uf;
      enderecoAdicionar.flagAtivo = 'S';
      enderecoAdicionar.auditoria = new Auditoria();
      enderecoAdicionar.auditoria.codigoUsuarioInclusao = this.getCodigoUsuarioLogado();
      enderecoAdicionar.auditoria.dataInclusao = new Date();

      this.listaEndereco.push(enderecoAdicionar);
      this.resetEndereco();

    }
  }

  adicionarContato() {
    if(this.contato.nome == null || this.contato.nome == '') {
      this.mensagem.tratarErroPersonalizado("","O campo Nome é obrigatório.");
      return false;
    }

    let contatoAdicionar: Contato = new Contato();
    contatoAdicionar.codigoCargo = this.contato.cargo.codigo;
    contatoAdicionar.cargo = this.contato.cargo;
    contatoAdicionar.dataNascimento = this.contato.dataNascimento;
    contatoAdicionar.email = this.contato.email;
    contatoAdicionar.nome = this.contato.nome;
    contatoAdicionar.tipoContato = this.contato.objTipoContato.valorCampo;
    contatoAdicionar.descricaoTipoContato = this.contato.objTipoContato.nomeValor;
    contatoAdicionar.objTipoContato = this.contato.objTipoContato;
    contatoAdicionar.flagAtivo = "S";
    contatoAdicionar.auditoria = new Auditoria();
    contatoAdicionar.auditoria.codigoUsuarioInclusao = this.getCodigoUsuarioLogado();
    contatoAdicionar.auditoria.dataInclusao = new Date();

    this.listaContato.push(contatoAdicionar);
    this.resetContato();
  }

  preparaAdicionarTelefone(index) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '280px';
    dialogConfig.width = '550px';
    dialogConfig.data = {index: index};    

    //this.abrirModal(ModalTelefoneComponent, dialogConfig);
   
    
    this.dialog.open(ModalTelefoneComponent, dialogConfig)
               .afterClosed().subscribe((data) => {
      if(typeof data !== "undefined") {
        this.adicionarTelefone(data, index);
      }
    });  
  }

  adicionarTelefone(telefone: Telefone, index) {

    for(let i = 0; i < this.listaContato.length; i++) {
      if(i == index) {
        if(typeof this.listaContato[i].listaTelefone == "undefined") {
          this.listaContato[i].listaTelefone = [];
        }

        telefone.auditoria = new Auditoria();
        telefone.auditoria.codigoUsuarioInclusao = this.getCodigoUsuarioLogado();
        telefone.auditoria.dataInclusao = new Date();
        telefone.flagAtivo = 'S';
        this.listaContato[i].listaTelefone.push(telefone);
      }
    }

  }

  adicionarTelefonePf() {

    let telefoneAdicionar: Telefone = new Telefone();

    telefoneAdicionar.descricaoTipo = this.telefonePf.objTipo.nomeValor;
    telefoneAdicionar.tipo = this.telefonePf.objTipo.valorCampo;
    telefoneAdicionar.ddd = this.telefonePf.ddd;
    telefoneAdicionar.numero = this.telefonePf.numero;
    telefoneAdicionar.auditoria = new Auditoria();
    telefoneAdicionar.auditoria.dataInclusao = new Date();
    telefoneAdicionar.auditoria.codigoUsuarioInclusao = this.getCodigoUsuarioLogado();
    telefoneAdicionar.flagAtivo = 'S';

    this.listaTelefonePf.push(telefoneAdicionar);
    this.resetTelefonePf();

  }

  resetTelefonePf() {
    this.telefonePf = new Telefone();
    this.telefonePf.objTipo = this.listaTipoTelefone[0];
  }

  resetContato() {
    this.contato = new Contato();
    this.contato.cargo = this.listaCargo[0];
    this.contato.objTipoContato = this.listaTipoContato[0];
  }

  resetEndereco() {
    this.endereco = new Endereco();
    this.endereco.extensaoEndereco = new ExtensaoEndereco();
    this.endereco.extensaoEndereco.uf = 'AC';
    this.endereco.objTipo = this.listaTipoEndereco[0];
  }

  preparaAddCargo() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '710px';
    dialogConfig.height = '250px';

    this.dialog.open(ModalCargoComponent, dialogConfig)
                            .afterClosed().subscribe((data) => {
      this.popularCargo(data.codigo);
    });

  }

  preparaEditarContato(index) {

    let contato = new Contato();
    contato.codigo = this.listaContato[index].codigo;
    contato.cargo = this.listaContato[index].cargo;
    contato.codigoCargo = this.listaContato[index].codigoCargo;
    contato.tipoContato = this.listaContato[index].tipoContato;
    contato.objTipoContato = this.listaContato[index].objTipoContato;
    contato.descricaoTipoContato = this.listaContato[index].descricaoTipoContato;
    contato.nome = this.listaContato[index].nome;
    contato.email = this.listaContato[index].email;
    contato.auditoria = this.listaContato[index].auditoria;
    contato.flagAtivo = this.listaContato[index].flagAtivo;
    contato.listaTelefone = this.listaContato[index].listaTelefone;


    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    //dialogConfig.height = '280px';
    dialogConfig.width = '680px';
    dialogConfig.data = contato;
   
    this.dialog.open(ModalEditarContatoComponent, dialogConfig)
               .afterClosed().subscribe((data) => {
      if(typeof data !== "undefined") {
        this.editarContato(data, index);
      }
    });  

  }

  editarContato(data, index) {
    this.listaContato[index] = data;
    this.listaContato[index].descricaoTipoContato = data.objTipoContato.nomeValor;
    this.listaContato[index].codigoCargo = data.cargo.codigo;
  } 


  excluirContato(index) {
    if(this.listaContato[index].codigo != null && typeof this.listaContato[index].codigo !== "undefined") {
      this.listaContato[index].flagAtivo = "N";
      this.listaContato[index].codigoUsuarioAlteracao = this.getCodigoUsuarioLogado();
      this.listaContato[index].dataAlteracao = new Date();
    } else {
      this.listaContato.splice(index,1);
    }
  }

  excluirEndereco(index) {
    this.listaEndereco.splice(index,1);
  }

  excluirTelefonePf(index) {
    this.listaTelefonePf.splice(index,1);
  }

  completarInserir() {
    
    if(this.objetoAtualiza.cadastroUnico.tipoPessoa == "J") {
      this.objetoAtualiza.cadastroUnico.cpfCnpj = Number(this.objetoAtualiza.cadastroUnico.cnpj);
      this.objetoAtualiza.cadastroUnico.pessoaJuridica.listaContato = this.listaContato;

      // AUDITORIA CONTATO
      if(this.objetoAtualiza.cadastroUnico.pessoaJuridica.listaContato.length > 0) {
        this.objetoAtualiza.cadastroUnico.pessoaJuridica.listaContato.forEach(element => {
          element.auditoria = new Auditoria();
          element.auditoria.codigoUsuarioInclusao = this.getCodigoUsuarioLogado();
          element.auditoria.dataInclusao = new Date();
          element.flagAtivo = 'S';
        });
      }
    }

    if(this.objetoAtualiza.cadastroUnico.tipoPessoa == "F") {
      this.objetoAtualiza.cadastroUnico.cpfCnpj = Number(this.objetoAtualiza.cadastroUnico.cpf);
      this.objetoAtualiza.cadastroUnico.pessoaFisica.listaTelefone = this.listaTelefonePf;
    }

    //ENDERECO
    this.objetoAtualiza.cadastroUnico.listaEndereco = [];
    for(let i = 0; i < this.listaEndereco.length; i++) {
      this.objetoAtualiza.cadastroUnico.listaEndereco.push(this.listaEndereco[i]);
    }

    //AUDITORIA
    this.objetoAtualiza.situacao = 2;  //ATIVO
    this.objetoAtualiza.auditoria = new Auditoria();
    this.objetoAtualiza.auditoria.dataInclusao = new Date();
    this.objetoAtualiza.auditoria.codigoUsuarioInclusao = this.getCodigoUsuarioLogado();

    //AUDITORIA CUN
    this.objetoAtualiza.cadastroUnico.auditoria = new Auditoria();
    this.objetoAtualiza.cadastroUnico.auditoria.dataInclusao = new Date();
    this.objetoAtualiza.cadastroUnico.auditoria.codigoUsuarioInclusao = this.getCodigoUsuarioLogado();

    //LISTA CNAE
    this.objetoAtualiza.codigoCnae = this.objetoAtualiza.cnae.codigo;
  }

  completarAlterar() {

    if(this.objetoAtualiza.cadastroUnico.tipoPessoa == "J") {
      this.objetoAtualiza.cadastroUnico.cpfCnpj = Number(this.objetoAtualiza.cadastroUnico.cnpj);
      this.objetoAtualiza.cadastroUnico.pessoaJuridica.listaContato = this.listaContato;

      // AUDITORIA CONTATO
      if(this.objetoAtualiza.cadastroUnico.pessoaJuridica.listaContato.length > 0) {
        this.objetoAtualiza.cadastroUnico.pessoaJuridica.listaContato.forEach(element => {
          element.codigoCadastroUnico = this.objetoAtualiza.codigoCadastroUnico;
          //element.auditoria = new Auditoria();
          element.auditoria.codigoUsuarioAlteracao = this.getCodigoUsuarioLogado();
          element.auditoria.dataAlteracao = new Date();
        });
      }
    }

    if(this.objetoAtualiza.cadastroUnico.tipoPessoa == "F") {
      this.objetoAtualiza.cadastroUnico.cpfCnpj = Number(this.objetoAtualiza.cadastroUnico.cpf);
      this.objetoAtualiza.cadastroUnico.pessoaFisica.listaTelefone = this.listaTelefonePf;
    }

    //ENDERECO
    this.objetoAtualiza.cadastroUnico.listaEndereco = [];
    for(let i = 0; i < this.listaEndereco.length; i++) {
      this.objetoAtualiza.cadastroUnico.listaEndereco.push(this.listaEndereco[i]);
    }

    //his.objetoAtualiza.cadastroUnico.cpfCnpj = Number(this.objetoAtualiza.cadastroUnico.cnpj.replace(".","").replace("/","").replace("-",""));
    // this.objetoAtualiza.cadastroUnico.listaEndereco = [];
    // this.endereco.cep = Number(this.endereco.cepFormatado.replace(".","").replace("-",""));
    // this.endereco.flagAtivo = 'S';
    // this.endereco.auditoria = new Auditoria();
    // this.endereco.auditoria.dataInclusao = new Date();
    // this.endereco.auditoria.codigoUsuarioInclusao = this.getCodigoUsuarioLogado();
    // this.objetoAtualiza.cadastroUnico.listaEndereco.push(this.endereco);
    // this.objetoAtualiza.cadastroUnico.pessoaJuridica.listaContato = this.listaContato;

    //AUDITORIA
    //this.objetoAtualiza.auditoria = new Auditoria();
    this.objetoAtualiza.auditoria.dataAlteracao = new Date();
    this.objetoAtualiza.auditoria.codigoUsuarioAlteracao = this.getCodigoUsuarioLogado();

    //AUDITORIA CUN
    //this.objetoAtualiza.cadastroUnico.auditoria = new Auditoria();
    this.objetoAtualiza.cadastroUnico.auditoria.dataAlteracao = new Date();
    this.objetoAtualiza.cadastroUnico.auditoria.codigoUsuarioAlteracao = this.getCodigoUsuarioLogado();

    //AUDITORIA TELEFONE PF
    if(this.objetoAtualiza.cadastroUnico.tipoPessoa == "F") {
      for(let i = 0; i < this.objetoAtualiza.cadastroUnico.pessoaFisica.listaTelefone.length; i++) {
        //this.objetoAtualiza.cadastroUnico.pessoaFisica.listaTelefone[i].auditoria = new Auditoria();
        this.objetoAtualiza.cadastroUnico.pessoaFisica.listaTelefone[i].auditoria.codigoUsuarioAlteracao = this.getCodigoUsuarioLogado();
        this.objetoAtualiza.cadastroUnico.pessoaFisica.listaTelefone[i].auditoria.dataAlteracao = new Date();
      }
    }

    //LISTA CNAE
    this.objetoAtualiza.codigoCnae = this.objetoAtualiza.cnae.codigo;
    //console.log(this.objetoAtualiza);

  }

  completarPosInserir() {
    this.router.navigate(['empregador-pesquisar']);
  }

  completarPosAlterar() {
    this.router.navigate(['empregador-pesquisar']);
  }

  validarInserir() {
    
    //VALIDACAO DE CAMPOS OBRIGATORIOS PJ
    if(this.objetoAtualiza.cadastroUnico.tipoPessoa == "J") {
      if(this.objetoAtualiza.cadastroUnico.cnpj == null || this.objetoAtualiza.cadastroUnico.cnpj == '') {
        this.mensagem.tratarErroPersonalizado("", "O campo CNPJ é obrigatório.");
        return false;
      }

      if(this.objetoAtualiza.numeroCei == null || this.objetoAtualiza.numeroCei <=0) {
        this.mensagem.tratarErroPersonalizado("", "O campo CEI é obrigatório.");
        return false;
      }

      if(this.objetoAtualiza.cadastroUnico.nome == null || this.objetoAtualiza.cadastroUnico.nome == '') {
        this.mensagem.tratarErroPersonalizado("", "O campo Razão Social é obrigatório.");
        return false;
      }

      if(this.objetoAtualiza.cadastroUnico.pessoaJuridica.nomeFantasia == null || this.objetoAtualiza.cadastroUnico.pessoaJuridica.nomeFantasia == '') {
        this.mensagem.tratarErroPersonalizado("", "O campo Nome Fantasia é obrigatório.");
        return false;
      }
    }

    //VALIDACAO DE CAMPOS OBRIGATORIOS PF
    if(this.objetoAtualiza.cadastroUnico.tipoPessoa == "F") {
      if(this.objetoAtualiza.cadastroUnico.cpf == null || this.objetoAtualiza.cadastroUnico.cpf == '') {
        this.mensagem.tratarErroPersonalizado("", "O campo CPF é obrigatório.");
        return false;
      }

      if(this.objetoAtualiza.cadastroUnico.nome == null || this.objetoAtualiza.cadastroUnico.nome == '') {
        this.mensagem.tratarErroPersonalizado("", "O campo Nome é obrigatório.");
        return false;
      }

      if(this.objetoAtualiza.cadastroUnico.pessoaFisica.nomeMae == null || this.objetoAtualiza.cadastroUnico.pessoaFisica.nomeMae == '') {
        this.mensagem.tratarErroPersonalizado("", "O campo Nome da Mãe é obrigatório.");
        return false;
      }

      if(this.objetoAtualiza.cadastroUnico.pessoaFisica.dataNascimento == null || typeof this.objetoAtualiza.cadastroUnico.pessoaFisica.dataNascimento === 'undefined') {
        this.mensagem.tratarErroPersonalizado("", "O campo Data de Nascimento é obrigatório.");
        return false;
      }

      if(this.objetoAtualiza.cadastroUnico.pessoaFisica.registroGeral == null || this.objetoAtualiza.cadastroUnico.pessoaFisica.registroGeral <= 0) {
        this.mensagem.tratarErroPersonalizado("", "O campo RG é obrigatório.");
        return false;
      }

      if(this.objetoAtualiza.cadastroUnico.pessoaFisica.orgaoEmissorRg == null || this.objetoAtualiza.cadastroUnico.pessoaFisica.orgaoEmissorRg == '') {
        this.mensagem.tratarErroPersonalizado("", "O campo Org. Emissor é obrigatório.");
        return false;
      }
    }

    //PELO MENOS UM ENDERECO OBRIGATORIO
    if(this.listaEndereco == null || this.listaEndereco.length <= 0) {
      this.mensagem.tratarErroPersonalizado("", "Pelo menos um Endereço deve ser adicionado.");
      return false;
    }

    //PELO MENOS UM CONTATO OBRIGATORIO (PJ)
    if(this.objetoAtualiza.cadastroUnico.tipoPessoa == "J") {
      if(this.listaContato == null || this.listaContato.length <= 0) {
        this.mensagem.tratarErroPersonalizado("", "Pelo menos um Contato deve ser adicionado.");
        return false;
      }
    }

    //PELO MENOS UM CONTATO OBRIGATORIO (PF)
    if(this.objetoAtualiza.cadastroUnico.tipoPessoa == "F") {
      if(this.listaTelefonePf == null || this.listaTelefonePf.length <= 0) {
        this.mensagem.tratarErroPersonalizado("", "Pelo menos um Telefone deve ser adicionado.");
        return false;
      }
    }

    //SE PJ, CNAE E QTD DE FUNCIONARIOS OBRIGATORIOS
    if(this.objetoAtualiza.cadastroUnico.tipoPessoa == "J") {
      if(this.objetoAtualiza.codigoCnae == null || this.objetoAtualiza.codigoCnae <= 0) {
        this.mensagem.tratarErroPersonalizado("", "O campo CNAE é obrigatório.");
        return false;
      }

      // if(this.objetoAtualiza.numeroFuncionarios == null || this.objetoAtualiza.numeroFuncionarios <= 0) {
      //   this.mensagem.tratarErroPersonalizado("", "O campo Quantidade de Funcionários é obrigatório.");
      //   return false;
      // }
    }

    return true;
  }

  validarEndereco() {
    if(this.endereco.objTipo == null || this.endereco.objTipo.valorCampo <= 0) {
      this.mensagem.tratarErroPersonalizado("", "O campo Tipo de Endereço é obrigatório.");
      return false;
    }

    if(this.endereco.cepFormatado == null || this.endereco.cepFormatado == '') {
      this.mensagem.tratarErroPersonalizado("", "O campo CEP é obrigatório.");
      return false;
    }

    if(this.endereco.extensaoEndereco.logradouro == null || this.endereco.extensaoEndereco.logradouro == '') {
      this.mensagem.tratarErroPersonalizado("", "O campo Logradouro é obrigatório.");
      return false;
    }

    if(this.endereco.numero == null || this.endereco.numero == '') {
      this.mensagem.tratarErroPersonalizado("", "O campo Número é obrigatório.");
      return false;
    }

    if(this.endereco.extensaoEndereco.bairro == null || this.endereco.extensaoEndereco.bairro == '') {
      this.mensagem.tratarErroPersonalizado("", "O campo Bairro é obrigatório.");
      return false;
    }

    return true;
  }

  validarAlterar() {
    return this.validarInserir();
  }

}