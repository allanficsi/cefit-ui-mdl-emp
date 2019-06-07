import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AptareCrudController } from '../../../../components/shared/crud/aptare-crud-controller';
import { Chamada } from '../../../../model/painel-eletronico/chamada';
import { Guiche } from '../../../../model/painel-eletronico/guiche';
import { Senha } from '../../../../model/painel-eletronico/senha';
import { TipoSenha } from '../../../../model/painel-eletronico/tipo-senha';
import { ResponseApi } from '../../../../model/response-api';
import { ChamadaService } from '../../../../services/painel-eletronico/chamada.service';
import { GuicheService } from '../../../../services/painel-eletronico/guiche.service';
import { TipoSenhaService } from '../../../../services/painel-eletronico/tipo-senha.service';
import { DialogService } from '../../../../services/shared/dialog.service';
import { MensagemService } from '../../../../services/shared/mensagem.service';
import { ChamadaWebsocketService } from 'src/app/services/painel-eletronico/websocket/chamada-websocket.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';


@Component({
  selector: 'app-chamada-atualizar',
  templateUrl: './chamada-atualizar.component.html',
  styleUrls: ['./chamada-atualizar.component.css']
})
export class ChamadaAtualizarComponent extends AptareCrudController<Chamada, {new(): Chamada}>{ 

  listaGuiche = [];
  listaTipoSenha = [];
  listaUltimasChamadas = [];
  ultimaChamada: Chamada;
  proximaChamada: Chamada;
  codigoTipoSenha: Number;

  stompClient;
  
  constructor(router: Router,
              route: ActivatedRoute,
              dialog: MatDialog,
              public service: ChamadaService,
              private guicheService: GuicheService,
              private tipoSenhaService: TipoSenhaService,
              private _location: Location,
              private chamadaWebsocketService: ChamadaWebsocketService,
              mensagem: MensagemService,
              dialogService: DialogService) {
    super(router, route, dialog, Chamada, service, mensagem, dialogService);

    // Connect com websocket
    this.chamadaWebsocketService.connect();
  }

  iniciarPaginaInserir() {
    this.objetoAtualiza.senha = new Senha();
    this.proximaChamada = null;
  }

  setListasStaticas() {
    this.popularListaGuiche();
    this.popularListaTipoSenha();

    this.retornarUltimaChamada();
    this.listarUltimasChamadas();
  }

  listarUltimasChamadas() {
    this.service.listarUltimasChamadas().subscribe((responseApi:ResponseApi) => {
      this.listaUltimasChamadas = responseApi.data;
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  retornarUltimaChamada() {
    this.service.retornarUltima().subscribe((responseApi:ResponseApi) => {
      this.ultimaChamada = responseApi.data;
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  retornarProximaChamada() {
    if(this.codigoTipoSenha != null && typeof this.codigoTipoSenha !== 'undefined') {
      let chamada = new Chamada();
      chamada.senha = new Senha();
      chamada.senha.codigoTipoSenha = this.codigoTipoSenha;

      this.service.retornarProxima(chamada).subscribe((responseApi:ResponseApi) => {              
        this.proximaChamada = responseApi.data;
        console.log(this.proximaChamada);
      } , err => {
        this.mensagem.tratarErro(err);  
      });
    }
  }

  popularListaGuiche() {
    let guiche: Guiche = new Guiche();
    guiche.flagAtivo = "S";

    this.guicheService.pesquisar(guiche).subscribe((responseApi:ResponseApi) => {              
      this.listaGuiche = responseApi.data;
      this.objetoAtualiza.codigoGuiche = this.listaGuiche[0].codigo;
    } , err => {
      this.mensagem.tratarErro(err);  
    });
  }

  popularListaTipoSenha() {
    let tipoSenha: TipoSenha = new TipoSenha();
    tipoSenha.flagAtivo = "S";

    this.tipoSenhaService.pesquisar(tipoSenha).subscribe((responseApi:ResponseApi) => {              
      this.listaTipoSenha = responseApi.data;
      this.codigoTipoSenha = null;
    } , err => {
      this.mensagem.tratarErro(err);  
    });
  }

  completarInserir() {
    this.objetoAtualiza.senha.codigoTipoSenha = this.codigoTipoSenha;
    this.objetoAtualiza.senha = this.proximaChamada.senha;
    this.objetoAtualiza.codigoSenha = this.proximaChamada.senha.codigo;
    this.objetoAtualiza.codigoUsuarioInclusao = this.getCodigoUsuarioLogado();
    this.objetoAtualiza.dataInclusao = new Date();
    this.objetoAtualiza.data = new Date();
  }

  validarInserir() {

    if(this.objetoAtualiza.codigoGuiche == null || typeof this.objetoAtualiza.codigoGuiche === 'undefined') {
      this.mensagem.tratarErroPersonalizado("", "Informe o guichê para realizar o próximo chamado.");
      return false;
    }

    if(this.codigoTipoSenha == null || typeof this.codigoTipoSenha === 'undefined') {
      this.mensagem.tratarErroPersonalizado("", "Informe o tipo de senha para realizar o próximo chamado.");
      return false;
    }

    if(this.proximaChamada == null || typeof this.proximaChamada === 'undefined'
          || this.proximaChamada.senha == null || typeof this.proximaChamada.senha === 'undefined'
          || this.proximaChamada.senha.codigo == null || typeof this.proximaChamada.senha.codigo === 'undefined') {
      this.mensagem.tratarErroPersonalizado("", "Não existe uma próxima senha a ser chamada.");
      return false;
    }

    return true;
  }

  resetarSenha() {
    this.dialogService.openConfirmDialog('Deseja realmente resetar as senhas?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.service.resetarSenha().subscribe((responseApi:ResponseApi) => {              
          this.mensagem.msgSucesso('O serviço de senha foi reiniciado com sucesso.');
          this.completarPosInserir();
        } , err => {
          this.mensagem.tratarErro(err);
        });
      } 
    });
  }

  completarPosInserir() {
    this.iniciarPaginaInserir();
    this.setListasStaticas();

    // Enviando 
    this.chamadaWebsocketService.call();
  }

  repetirChamada() {
    let msg = "ok"
    this.chamadaWebsocketService.call();
  }

}
