import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { DialogService } from '../../../dialog-service';
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
import { MensagemService } from '../../../services/shared/mensagem.service';
import { ModalQualificacaoComponent } from '../../geral/modal-qualificacao/modal-qualificacao.component';
import { ConfirmDialogService } from '../../../services/shared/confirm-dialog.service';

@Component({
  selector: 'app-profissional-atualizar',
  templateUrl: './profissional-atualizar.component.html',
  styleUrls: ['./profissional-atualizar.component.css']
})
export class ProfissionalAtualizarComponent extends AptareCrudController<Profissional, {new(): Profissional}>{ 

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

  constructor(router: Router,
              dialogService: DialogService,
              route: ActivatedRoute,  
              dialog: MatDialog,                   
              service: ProfissionalService,
              private dominioService: DominioService,
              private qualificacaoService: QualificacaoService,
              private correioService: CorreioService,
              mensagem: MensagemService,
              confirm: ConfirmDialogService) {
    super(router, route, dialogService, dialog, Profissional, service, mensagem, confirm);    
  }

  setListasStaticas() {

    super.setListasStaticas();
    this.popularTipoEndereco();
    this.popularEstadoCivil();
    this.popularTipoTelefone();
    this.popularQualificacao(null);
  
  }

  iniciarPaginaInserir() {

    this.objetoAtualiza.ufCtps = 'AC';
    this.objetoAtualiza.flagPsicologo = 'N';

    this.endereco = new Endereco();
    this.endereco.extensaoEndereco = new ExtensaoEndereco();
    this.endereco.extensaoEndereco.uf = 'AC';

    this.objetoAtualiza.cadastroUnico = new CadastroUnico();
    this.objetoAtualiza.cadastroUnico.tipoPessoa = 'F';

    this.objetoAtualiza.cadastroUnico.pessoaFisica = new PessoaFisica();
    this.objetoAtualiza.cadastroUnico.pessoaFisica.ufOrgaoEmissorRg = 'AC';
    this.objetoAtualiza.cadastroUnico.pessoaFisica.sexo = 'M';
    this.objetoAtualiza.cadastroUnico.pessoaFisica.estadoCivil = 1;

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

  popularQualificacao(codigo) {
    let obj: Qualificacao = new Qualificacao();

    this.qualificacaoService.pesquisar(obj)
                .subscribe((responseApi:ResponseApi) => {
      this.listaQualificacao = responseApi['data']; 
      if(codigo != null && typeof codigo !== "undefined") {
        for(let i = 0; i < this.listaQualificacao.length; i++) {
          if(codigo == this.listaQualificacao[i].codigo) {
            this.qualificacao = this.listaQualificacao[i];
          }
        }
      } else {
        this.qualificacao = null;
      }
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  preparaAddQualificacao() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '710px';
    dialogConfig.height = '250px';

    this.dialog.open(ModalQualificacaoComponent, dialogConfig)
                            .afterClosed().subscribe((data) => {
      this.popularQualificacao(data.codigo);
    });

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

  adicionarQualificacao() {
    if(this.validarQualificacao()) {
      let profissionalQualificacaoAdicionar: ProfissionalQualificacao = new ProfissionalQualificacao();

      profissionalQualificacaoAdicionar.codigoQualificacao = this.qualificacao.codigo;
      profissionalQualificacaoAdicionar.descricaoQualificacao = this.qualificacao.descricao;
      this.listaProfissionalQualificacao.push(profissionalQualificacaoAdicionar);
      this.resetQualificacao();
    }
  }

  adicionarTelefonePf() {

    if(this.validarTelefonePf()) {
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

  }

  resetQualificacao() {
    this.qualificacao = new Qualificacao();
  }

  resetTelefonePf() {
    this.telefonePf = new Telefone();
    this.telefonePf.objTipo = this.listaTipoTelefone[0];
  }

  resetEndereco() {
    this.endereco = new Endereco();
    this.endereco.extensaoEndereco = new ExtensaoEndereco();
    this.endereco.extensaoEndereco.uf = 'AC';
    this.endereco.objTipo = this.listaTipoEndereco[0];
  }

  excluirEndereco(index) {
    this.listaEndereco.splice(index,1);
  }

  excluirTelefonePf(index) {
    this.listaTelefonePf.splice(index,1);
  }

  excluirQualificacao(index) {
    this.listaProfissionalQualificacao.splice(index,1);
  }

  completarInserir() {

    if(this.objetoAtualiza.cadastroUnico.tipoPessoa == "F") {
      this.objetoAtualiza.cadastroUnico.cpfCnpj = Number(this.objetoAtualiza.cadastroUnico.cpf);
      this.objetoAtualiza.cadastroUnico.pessoaFisica.listaTelefone = this.listaTelefonePf;
    }

    //QUALIFICACAO
    this.objetoAtualiza.listaProfissionalQualificacao = [];
    for(let i = 0; i < this.listaProfissionalQualificacao.length; i++) {
      this.objetoAtualiza.listaProfissionalQualificacao.push(this.listaProfissionalQualificacao[i]);
    }

    //ENDERECO
    this.objetoAtualiza.cadastroUnico.listaEndereco = [];
    for(let i = 0; i < this.listaEndereco.length; i++) {
      this.objetoAtualiza.cadastroUnico.listaEndereco.push(this.listaEndereco[i]);
    }

    //AUDITORIA
    this.objetoAtualiza.flagAtivo = 'S';  //ATIVO
    this.objetoAtualiza.auditoria = new Auditoria();
    this.objetoAtualiza.auditoria.dataInclusao = new Date();
    this.objetoAtualiza.auditoria.codigoUsuarioInclusao = this.getCodigoUsuarioLogado();

    //AUDITORIA CUN
    this.objetoAtualiza.cadastroUnico.auditoria = new Auditoria();
    this.objetoAtualiza.cadastroUnico.auditoria.dataInclusao = new Date();
    this.objetoAtualiza.cadastroUnico.auditoria.codigoUsuarioInclusao = this.getCodigoUsuarioLogado();

  }

  completarAlterar() {

    if(this.objetoAtualiza.cadastroUnico.tipoPessoa == "F") {
      this.objetoAtualiza.cadastroUnico.cpfCnpj = Number(this.objetoAtualiza.cadastroUnico.cpf);
      this.objetoAtualiza.cadastroUnico.pessoaFisica.listaTelefone = this.listaTelefonePf;
    }

    //CBO
    this.objetoAtualiza.listaProfissionalQualificacao = [];
    for(let i = 0; i < this.listaProfissionalQualificacao.length; i++) {
      this.objetoAtualiza.listaProfissionalQualificacao.push(this.listaProfissionalQualificacao[i]);
    }

    //ENDERECO
    this.objetoAtualiza.cadastroUnico.listaEndereco = [];
    for(let i = 0; i < this.listaEndereco.length; i++) {
      this.objetoAtualiza.cadastroUnico.listaEndereco.push(this.listaEndereco[i]);
    }

    //AUDITORIA
    this.objetoAtualiza.auditoria = new Auditoria();
    this.objetoAtualiza.auditoria.dataAlteracao = new Date();
    this.objetoAtualiza.auditoria.codigoUsuarioAlteracao = this.getCodigoUsuarioLogado();

    //AUDITORIA CUN
    this.objetoAtualiza.cadastroUnico.auditoria = new Auditoria();
    this.objetoAtualiza.cadastroUnico.auditoria.dataAlteracao = new Date();
    this.objetoAtualiza.cadastroUnico.auditoria.codigoUsuarioAlteracao = this.getCodigoUsuarioLogado();

    //AUDITORIA TELEFONE PF
    for(let i = 0; i < this.objetoAtualiza.cadastroUnico.pessoaFisica.listaTelefone.length; i++) {
      this.objetoAtualiza.cadastroUnico.pessoaFisica.listaTelefone[i].auditoria = new Auditoria();
      this.objetoAtualiza.cadastroUnico.pessoaFisica.listaTelefone[i].auditoria.codigoUsuarioAlteracao = this.getCodigoUsuarioLogado();
      this.objetoAtualiza.cadastroUnico.pessoaFisica.listaTelefone[i].auditoria.dataAlteracao = new Date();
    }

  }

  completarPosInserir() {
    this.router.navigate(['profissional-pesquisar']);
  }

  completarPosAlterar() {
    this.router.navigate(['profissional-pesquisar']);
  }

  validarTelefonePf() {
    if((typeof this.telefonePf.ddd === "undefined") || this.telefonePf.ddd <= 0) {
      this.mensagem.tratarErroPersonalizado("", "O campo DDD é obrigatório.");
      return false;
    }

    if((typeof this.telefonePf.numero === "undefined") || this.telefonePf.numero <= 0) {
      this.mensagem.tratarErroPersonalizado("", "O campo Telefone é obrigatório.");
      return false;
    }

    return true;
  }

  validarInserir() {

    console.log(this.objetoAtualiza);

    //VALIDACAO DE CAMPOS OBRIGATORIOS PF
    if(this.objetoAtualiza.cadastroUnico.cpf == null || this.objetoAtualiza.cadastroUnico.cpf == '') {
      this.mensagem.tratarErroPersonalizado("", "O campo CPF é obrigatório.");
      return false;
    }

    if(this.objetoAtualiza.cadastroUnico.pessoaFisica.registroGeral == null || this.objetoAtualiza.cadastroUnico.pessoaFisica.registroGeral <= 0) {
      this.mensagem.tratarErroPersonalizado("", "O campo RG é obrigatório.");
      return false;
    }

    //console.log(this.objetoAtualiza.cadastroUnico.pessoaFisica.dataEmissaoRg);
    if(this.objetoAtualiza.cadastroUnico.pessoaFisica.dataEmissaoRg == null 
      || (typeof this.objetoAtualiza.cadastroUnico.pessoaFisica.dataEmissaoRg == 'undefined'
      || this.objetoAtualiza.cadastroUnico.pessoaFisica.dataEmissaoRg.toString() == '')) {
      this.mensagem.tratarErroPersonalizado("", "O campo Data de Expedição é obrigatório.");
      return false;
    }

    if(this.objetoAtualiza.cadastroUnico.pessoaFisica.orgaoEmissorRg == null || this.objetoAtualiza.cadastroUnico.pessoaFisica.orgaoEmissorRg == '') {
      this.mensagem.tratarErroPersonalizado("", "O campo Org. Emissor é obrigatório.");
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

    //PELO MENOS UMA QUALIFICACAO OBRIGATORIA
    if(this.listaProfissionalQualificacao == null || this.listaProfissionalQualificacao.length <= 0) {
      this.mensagem.tratarErroPersonalizado("", "Pelo menos uma Qualificação deve ser adicionada.");
      return false;
    }

    //PELO MENOS UM ENDERECO OBRIGATORIO
    if(this.listaEndereco == null || this.listaEndereco.length <= 0) {
      this.mensagem.tratarErroPersonalizado("", "Pelo menos um Endereço deve ser adicionado.");
      return false;
    }

    //PELO MENOS UM CONTATO OBRIGATORIO (PF)
    if(this.listaTelefonePf == null || this.listaTelefonePf.length <= 0) {
      this.mensagem.tratarErroPersonalizado("", "Pelo menos um Telefone deve ser adicionado.");
      return false;
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
  
  validarQualificacao() {
    
    if(this.qualificacao == null || (typeof this.qualificacao === "undefined")) {
      this.mensagem.tratarErroPersonalizado("", "O campo Qualificação é obrigatório.");
      return false;
    }
    
    return true;
  }

  validarAlterar() {
    return this.validarInserir();
  }


  inserir() {
    if(this.objetoAtualiza.flagPsicologo == "S") {
      this.confirmDialogService.openConfirmDialog('Você confirma que este profissional possui a formação exigida?')
      .afterClosed().subscribe(res =>{
        if(res){
          super.inserir();
        } else {
          this.objetoAtualiza.flagPsicologo = "N";
        }
      });
    } else {
      super.inserir();
    }
  }
}