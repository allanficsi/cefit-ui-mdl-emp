import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Chamada } from 'src/app/model/painel-eletronico/chamada';
import { ChamadaService } from '../../../../services/painel-eletronico/chamada.service';
import { AptareCrudController } from '../../../../components/shared/crud/aptare-crud-controller';
import { DialogService } from '../../../../services/shared/dialog.service';
import { MensagemService } from '../../../../services/shared/mensagem.service';
import { SenhaService } from '../../../../services/painel-eletronico/senha.service';
import { ResponseApi } from '../../../../model/response-api';
import { Senha } from 'src/app/model/painel-eletronico/senha';
import { Guiche } from 'src/app/model/painel-eletronico/guiche';
import { ChamadaWebsocketService } from 'src/app/services/painel-eletronico/websocket/chamada-websocket.service';


@Component({
  selector: 'app-painel-atualizar',
  templateUrl: './painel-visualizar.component.html',
  styleUrls: ['./painel-visualizar.component.css']
})
export class PainelVisualizarComponent extends AptareCrudController<Chamada, {new(): Chamada}>{


  listaUltimasChamadas = [];
  chamadaAtual: Chamada;
  audio = new Audio();

  stompClient;

  constructor(router: Router,
              route: ActivatedRoute,  
              dialog: MatDialog,                   
              public service: ChamadaService,
              private senhaService: SenhaService,
              private _location: Location,
              private chamadaWebsocketService: ChamadaWebsocketService,
              mensagem: MensagemService,
              dialogService: DialogService) {
    super(router, route, dialog, Chamada, service, mensagem, dialogService);
  }

  iniciarPaginaInserir() {
    let stompClient = this.chamadaWebsocketService.create();
    let that = this;
    stompClient.connect({}, function () {
      stompClient.subscribe("/chamada", (message) => {
        if (message.body) {
          that.setListasStaticas();
        }
      });
    });
  }

  setListasStaticas() {
    this.chamadaAtual = new Chamada();
    this.chamadaAtual.senha = new Senha();
    this.chamadaAtual.guiche = new Guiche();
    this.listarUltimasChamadas();
  }

  listarUltimasChamadas() {
    this.service.listarUltimasChamadas().subscribe((responseApi:ResponseApi) => {
      this.listaUltimasChamadas = responseApi.data;
      this.chamadaAtual = this.listaUltimasChamadas[0];
      this.listaUltimasChamadas.splice(0,1);
    } , err => {
      this.mensagem.tratarErro(err);
    });

    if(this.chamadaAtual != null) {
      this.tocarAudio();
    }
  }

  tocarAudio() {
    this.promisseAudio().then(function() {});
  }

  promisseAudio() {
    return new Promise(function(resolve, reject) {
      var audio = new Audio();
      audio.preload = "auto";
      audio.autoplay = true;
      audio.onerror = reject;
      audio.onended = resolve;

      audio.src = "assets/sound/beep.mp3";
    });
  }

}
