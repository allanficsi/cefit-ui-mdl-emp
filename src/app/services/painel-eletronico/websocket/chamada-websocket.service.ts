import { Injectable } from "@angular/core";
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { HOST_CEFIT } from '../../cefit.api';


@Injectable()
export class ChamadaWebsocketService {

  ws: WebSocket;
  stompClient;

  connect() {
    let ws = new SockJS(`${HOST_CEFIT}/api/socket/chamadaws`);
    this.stompClient = Stomp.over(ws);
    let that = this;
    
    this.stompClient.connect({}, function () {
      that.stompClient.subscribe("/chamada", (message) => {
        if (message.body) {
        }
      });
    });
  }

  create() {
    let ws = new SockJS(`${HOST_CEFIT}/api/socket/chamadaws`);
    this.stompClient = Stomp.over(ws);

    return this.stompClient;
  }

  call() {
    this.stompClient.send("/cefit/chamar", {}, "s");
  }



}