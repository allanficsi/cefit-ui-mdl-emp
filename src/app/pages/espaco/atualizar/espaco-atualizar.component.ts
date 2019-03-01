import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Endereco } from 'src/app/model/cadastro-unico/endereco';
import { ExtensaoEndereco } from 'src/app/model/cadastro-unico/extensao-endereco';
import { Correio } from 'src/app/model/correio/correio';
import { Dominio } from 'src/app/model/geral/dominio';
import { CorreioService } from 'src/app/services/correio/correio.service';
import { DominioService } from 'src/app/services/geral/dominio.service';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { DialogService } from '../../../dialog-service';
import { Auditoria } from '../../../model/auditoria';
import { Espaco } from '../../../model/espaco/espaco';
import { ResponseApi } from '../../../model/response-api';
import { EspacoService } from '../../../services/espaco/espaco.service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { ItemEspaco } from '../../../model/espaco/item-espaco';
import { ItemEspacoService } from 'src/app/services/espaco/item-espaco.service';
import { ModalItemEspacoComponent } from '../../geral/modal-item-espaco/modal-item-espaco.component';
import { EspacoItemEspaco } from '../../../model/espaco/espaco-item-espaco';
import { ModalEditarItemEspacoComponent } from '../../geral/modal-editar-item-espaco/modal-editar-item-espaco.component';
import { LocalService } from '../../../services/espaco/local.service';
import { Local } from '../../../model/espaco/local';
import { ModalLocalComponent } from '../../geral/modal-local/modal-local.component';
import { ConfirmDialogService } from 'src/app/services/shared/confirm-dialog.service';


@Component({
  selector: 'app-espaco-atualizar',
  templateUrl: './espaco-atualizar.component.html',
  styleUrls: ['./espaco-atualizar.component.css']
})
export class EspacoAtualizarComponent extends AptareCrudController<Espaco, {new(): Espaco}>{ 

  listaTipoEndereco = [];
  listaItemEspaco = [];
  listaLocal = [];

  itemEspaco: ItemEspaco;
  isLogradouroReadOnly: boolean;
  isBairroReadOnly: boolean;
  isLocalidadeReadOnly: boolean;
  isUfReadOnly: boolean;

  espacoItemEspaco: EspacoItemEspaco;

  constructor(router: Router,
              dialogService: DialogService,
              route: ActivatedRoute,  
              dialog: MatDialog,                   
              service: EspacoService,
              private localService: LocalService,
              private dominioService: DominioService,
              private correioService: CorreioService,
              private itemEspacoService: ItemEspacoService,
              private _location: Location,
              mensagem: MensagemService,
              confirm: ConfirmDialogService) {
    super(router, route, dialogService, dialog, Espaco, service, mensagem, confirm);
  }

  voltar() {
    this._location.back();
  }

  setListasStaticas() {
    super.setListasStaticas();
    this.popularTipoEndereco();
    this.popularLocal(null);
    this.popularItemEspaco(null);
  }

  popularLocal(codigo) {
    let obj: Local = new Local();

    this.localService.pesquisar(obj)
                .subscribe((responseApi:ResponseApi) => {
      this.listaLocal = responseApi['data']; 
      if(codigo != null && typeof codigo !== "undefined") {
        for(let i = 0; i < this.listaLocal.length; i++) {
          if(codigo == this.listaLocal[i].codigo) {
            this.objetoAtualiza.codigoLocal = this.listaLocal[i].codigo;
          }
        }
      } else {
        this.objetoAtualiza.codigoLocal = null;
      }
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  popularItemEspaco(codigo) {
    let itemEspaco: ItemEspaco = new ItemEspaco();

    this.itemEspacoService.pesquisar(itemEspaco)
                .subscribe((responseApi:ResponseApi) => {
      this.listaItemEspaco = responseApi['data']; 
      if(codigo != null && typeof codigo !== "undefined") {
        for(let i = 0; i < this.listaItemEspaco.length; i++) {
          if(codigo == this.listaItemEspaco[i].codigo) {
            this.itemEspaco = this.listaItemEspaco[i];
          }
        }
      } else {
        this.itemEspaco = null;
      }
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
      this.objetoAtualiza.endereco.objTipo = this.listaTipoEndereco[0]; 
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  iniciarPaginaInserir() {
    this.objetoAtualiza.endereco = new Endereco();
    this.objetoAtualiza.endereco.extensaoEndereco = new ExtensaoEndereco();
    this.objetoAtualiza.listaEspacoItemEspaco = [];

    this.objetoAtualiza.endereco.extensaoEndereco.uf = 'AC';

    this.espacoItemEspaco = new EspacoItemEspaco();
  }

  iniciarPaginaAlterar() {
    this.objetoAtualiza.endereco = new Endereco();
    this.objetoAtualiza.endereco.extensaoEndereco = new ExtensaoEndereco();
    this.objetoAtualiza.listaEspacoItemEspaco = [];
    this.espacoItemEspaco = new EspacoItemEspaco();

    let espaco: Espaco = new Espaco();
    espaco.codigo = +this.codigo;

    // GET EMPREGADOR COM O CODIGO
    this.service.get(espaco).subscribe((responseApi:ResponseApi) => {
      this.objetoAtualiza = responseApi.data;
      this.objetoAtualiza.endereco.objTipo = new Dominio();
      this.objetoAtualiza.endereco.objTipo.valorCampo = this.objetoAtualiza.endereco.tipo;
      this.objetoAtualiza.endereco.objTipo.nomeValor = this.objetoAtualiza.endereco.descricaoTipo;
      
      this.listaTipoEndereco.forEach(element => {
        if(element.valorCampo == this.objetoAtualiza.endereco.objTipo.valorCampo) 
        {
          this.objetoAtualiza.endereco.objTipo = element;
        }
      });

      let eex: ExtensaoEndereco = new ExtensaoEndereco();

      if(this.objetoAtualiza.endereco.correio != null) {
        eex.logradouro = this.objetoAtualiza.endereco.correio.logradouro;
        eex.bairro = this.objetoAtualiza.endereco.correio.bairro;
        eex.localidade = this.objetoAtualiza.endereco.correio.localidade;
        eex.uf = this.objetoAtualiza.endereco.correio.uf;
      } else {
        eex.logradouro = this.objetoAtualiza.endereco.extensaoEndereco.logradouro;
        eex.bairro = this.objetoAtualiza.endereco.extensaoEndereco.bairro;
        eex.localidade = this.objetoAtualiza.endereco.extensaoEndereco.localidade;
        eex.uf = this.objetoAtualiza.endereco.extensaoEndereco.uf;
      }

      
      this.objetoAtualiza.endereco.extensaoEndereco = eex;
      
      this.objetoAtualiza.endereco.extensaoEndereco.logradouro == "" ? this.isLogradouroReadOnly = false : this.isLogradouroReadOnly = true;
      this.objetoAtualiza.endereco.extensaoEndereco.bairro == "" ? this.isBairroReadOnly = false : this.isBairroReadOnly = true;
      this.objetoAtualiza.endereco.extensaoEndereco.localidade == "" ? this.isLocalidadeReadOnly = false : this.isLocalidadeReadOnly = true;
      this.objetoAtualiza.endereco.extensaoEndereco.uf == "" ? this.isUfReadOnly = false : this.isUfReadOnly = true;

    } , err => {
      this.mensagem.tratarErro(err);  
    });
  }

  completarInserir() {

    this.objetoAtualiza.endereco.tipo = this.objetoAtualiza.endereco.objTipo.codigo;
    this.objetoAtualiza.endereco.cep = Number(this.objetoAtualiza.endereco.cepFormatado);

    this.objetoAtualiza.flagAtivo = 'S';
    this.objetoAtualiza.auditoria = new Auditoria();
    this.objetoAtualiza.auditoria.codigoUsuarioInclusao = this.getCodigoUsuarioLogado();
    this.objetoAtualiza.auditoria.dataInclusao = new Date();

    //
    this.objetoAtualiza.endereco.auditoria = new Auditoria();
    this.objetoAtualiza.endereco.auditoria.codigoUsuarioInclusao = this.getCodigoUsuarioLogado();
    this.objetoAtualiza.endereco.auditoria.dataInclusao = new Date();
    this.objetoAtualiza.endereco.flagAtivo = 'S';
  }

  completarAlterar() {
    
    this.objetoAtualiza.endereco.tipo = this.objetoAtualiza.endereco.objTipo.codigo;
    this.objetoAtualiza.endereco.cep = Number(this.objetoAtualiza.endereco.cepFormatado);

    this.objetoAtualiza.auditoria = new Auditoria();
    this.objetoAtualiza.auditoria.codigoUsuarioAlteracao = this.getCodigoUsuarioLogado();
    this.objetoAtualiza.auditoria.dataAlteracao = new Date();

    // AUDITORIA ENDERECO
    this.objetoAtualiza.auditoria.codigoUsuarioAlteracao = this.getCodigoUsuarioLogado();
    this.objetoAtualiza.auditoria.dataAlteracao = new Date();
  }

  completarPosInserir() {
    this.router.navigate(['espaco-pesquisar']);
  }

  completarPosAlterar() {
    this.router.navigate(['espaco-pesquisar']);
  }

  preparaAddItem() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '710px';
    dialogConfig.height = '250px';

    this.dialog.open(ModalItemEspacoComponent, dialogConfig)
                            .afterClosed().subscribe((data) => {
      this.popularItemEspaco(data.codigo);
    });

  }

  preparaEditarItemEspaco(index) {

    let espacoItemEspaco = new EspacoItemEspaco();

    espacoItemEspaco.codigoItem = this.objetoAtualiza.listaEspacoItemEspaco[index].codigoItem;
    espacoItemEspaco.itemEspaco = this.objetoAtualiza.listaEspacoItemEspaco[index].itemEspaco;
    espacoItemEspaco.codigoEspaco = this.objetoAtualiza.listaEspacoItemEspaco[index].codigoEspaco;

    espacoItemEspaco.quantidadeAtivos = this.objetoAtualiza.listaEspacoItemEspaco[index].quantidadeAtivos;
    espacoItemEspaco.quantidadeManutencao = this.objetoAtualiza.listaEspacoItemEspaco[index].quantidadeManutencao;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    //dialogConfig.height = '280px';
    dialogConfig.width = '680px';
    dialogConfig.data = espacoItemEspaco;
   
    this.dialog.open(ModalEditarItemEspacoComponent, dialogConfig)
               .afterClosed().subscribe((data) => {
      if(typeof data !== "undefined") {
        this.editarItemEspaco(data, index);
      }
    });  

  }

  preparaAddLocal() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '710px';
    dialogConfig.height = '250px';

    this.dialog.open(ModalLocalComponent, dialogConfig)
                            .afterClosed().subscribe((data) => {
      this.popularLocal(data.codigo);
    });

  }

  editarItemEspaco(data, index) {
    this.objetoAtualiza.listaEspacoItemEspaco[index] = data;
  }

  validarInserir() {
    // VALIDACAO DE CAMPOS OBRIGATORIOS (DADOS GERAIS)
    if(this.objetoAtualiza.nome == null || this.objetoAtualiza.nome == '') {
      this.mensagem.tratarErroPersonalizado("", "O campo Nome é obrigatório.");
      return false;
    }

    if(this.objetoAtualiza.codigoLocal == null){
      this.mensagem.tratarErroPersonalizado("", "O campo Local é obrigatório.");
      return false;
    }


    if(this.objetoAtualiza.capacidade == null || this.objetoAtualiza.capacidade < 0) {
      this.mensagem.tratarErroPersonalizado("", "O campo Capacidade é obrigatório.");
      return false;
    }

    if(this.objetoAtualiza.descricao == null || this.objetoAtualiza.descricao == '') {
      this.mensagem.tratarErroPersonalizado("", "O campo Descrição é obrigatório.");
      return false;
    }

    // VALIDACAO DE CAMPOS OBRIGATORIOS (ENDERECO)
    if(this.objetoAtualiza.endereco.cepFormatado == null || this.objetoAtualiza.endereco.cepFormatado == '') {
      this.mensagem.tratarErroPersonalizado("", "O campo CEP é obrigatório.");
      return false;
    }

    if(this.objetoAtualiza.endereco.extensaoEndereco.logradouro == null || this.objetoAtualiza.endereco.extensaoEndereco.logradouro == '') {
      this.mensagem.tratarErroPersonalizado("", "O campo Logradouro é obrigatório.");
      return false;
    }

    if(this.objetoAtualiza.endereco.numero == null || this.objetoAtualiza.endereco.numero == '') {
      this.mensagem.tratarErroPersonalizado("", "O campo Número é obrigatório.");
      return false;
    }

    if(this.objetoAtualiza.endereco.extensaoEndereco.bairro == null || this.objetoAtualiza.endereco.extensaoEndereco.bairro == '') {
      this.mensagem.tratarErroPersonalizado("", "O campo Bairro é obrigatório.");
      return false;
    }

    return true;
  }

  validarAlterar() {
    return this.validarInserir();
  }

  adicionarItemEspaco() {

    if(this.itemEspaco == null) {
      this.mensagem.tratarErroPersonalizado("","O campo Item é obrigatório.");
      return false;
    }

    if(this.espacoItemEspaco == null
      || this.espacoItemEspaco.quantidadeAtivos == null) {
        this.mensagem.tratarErroPersonalizado("","O campo Quantidade Ativos é obrigatório.");
        return false;
    }

    if(this.espacoItemEspaco == null
      || this.espacoItemEspaco.quantidadeManutencao == null) {
        this.espacoItemEspaco.quantidadeManutencao = 0;
    }

    //VERIFICANDO SE O ITEM JA FOI ADICIONADO
    if(this.objetoAtualiza.listaEspacoItemEspaco != null
       && this.objetoAtualiza.listaEspacoItemEspaco.length > 0) {
      for(let i = 0; i < this.objetoAtualiza.listaEspacoItemEspaco.length; i++) {
        if(this.itemEspaco.codigo === this.objetoAtualiza.listaEspacoItemEspaco[i].itemEspaco.codigo) {
          this.mensagem.tratarErroPersonalizado("","Este item já foi adicionado.");
          return false;
        }
      }
    }

    let obj = new EspacoItemEspaco();
    obj.codigoItem = this.itemEspaco.codigo;
    obj.itemEspaco = this.itemEspaco;
    obj.quantidadeAtivos = this.espacoItemEspaco.quantidadeAtivos;
    obj.quantidadeManutencao = this.espacoItemEspaco.quantidadeManutencao;
    
    this.objetoAtualiza.listaEspacoItemEspaco.push(obj);
    this.resetItemEspaco();
  }

  excluirItemEspaco(index) {
    this.objetoAtualiza.listaEspacoItemEspaco.splice(index,1);
  }

  resetItemEspaco() {
    this.espacoItemEspaco = new EspacoItemEspaco();
    this.itemEspaco = null;    
  }

  pesquisarCep() {
    if(this.objetoAtualiza.endereco.cepFormatado != null
        && this.objetoAtualiza.endereco.cepFormatado != '') {
      let correio: Correio = new Correio();
      correio.cep = Number(this.objetoAtualiza.endereco.cepFormatado);
      this.correioService.get(correio)
                  .subscribe((responseApi:ResponseApi) => {
        let correio: Correio = new Correio();
        correio = responseApi['data'];
        
        this.objetoAtualiza.endereco.extensaoEndereco = new ExtensaoEndereco();
        
        if(correio != null) {

          this.objetoAtualiza.endereco.extensaoEndereco.logradouro = correio.logradouro;
          this.objetoAtualiza.endereco.extensaoEndereco.bairro = correio.bairro;
          this.objetoAtualiza.endereco.extensaoEndereco.localidade = correio.localidade;
          this.objetoAtualiza.endereco.extensaoEndereco.uf = correio.uf;

          this.objetoAtualiza.endereco.extensaoEndereco.logradouro == "" ? this.isLogradouroReadOnly = false : this.isLogradouroReadOnly = true;
          this.objetoAtualiza.endereco.extensaoEndereco.bairro == "" ? this.isBairroReadOnly = false : this.isBairroReadOnly = true;
          this.objetoAtualiza.endereco.extensaoEndereco.localidade == "" ? this.isLocalidadeReadOnly = false : this.isLocalidadeReadOnly = true;
          this.objetoAtualiza.endereco.extensaoEndereco.uf == "" ? this.isUfReadOnly = false : this.isUfReadOnly = true;

        } else {

          this.objetoAtualiza.endereco.extensaoEndereco.logradouro = null;
          this.objetoAtualiza.endereco.extensaoEndereco.bairro = null;
          this.objetoAtualiza.endereco.extensaoEndereco.localidade = null;
          this.objetoAtualiza.endereco.extensaoEndereco.uf = 'AC';

          this.isLogradouroReadOnly = false;
          this.isBairroReadOnly = false;
          this.isLocalidadeReadOnly = false;
          this.isUfReadOnly = false;

        }
      } , err => {
        this.mensagem.tratarErro(err);
      });
    } else {
      this.objetoAtualiza.endereco.extensaoEndereco.logradouro = null;
      this.objetoAtualiza.endereco.extensaoEndereco.bairro = null;
      this.objetoAtualiza.endereco.extensaoEndereco.localidade = null;
      this.objetoAtualiza.endereco.extensaoEndereco.uf = "AC";

      this.isLogradouroReadOnly = false;
      this.isBairroReadOnly = false;
      this.isLocalidadeReadOnly = false;
      this.isUfReadOnly = false;
    }
  }

}