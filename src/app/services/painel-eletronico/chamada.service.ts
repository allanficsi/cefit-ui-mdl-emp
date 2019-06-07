import { Injectable } from '@angular/core';
import { AptareCrudService } from '../shared/aptare-crud.service';
import { Chamada } from '../../model/painel-eletronico/chamada';
import { HOST_CEFIT } from '../cefit.api';
import { Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { ChamadaWebsocketService } from './websocket/chamada-websocket.service';

const WS_URL = 'ws://echo.websocket.org';


@Injectable()
export class ChamadaService extends AptareCrudService<Chamada> {
    
    public chamada: Subject<Chamada>;

    artefato(): string {    
        return "chamada";
    }

    listarUltimasChamadas() {
        return this.http.get(`${HOST_CEFIT}/api/` + this.artefato() + `/listarUltimasChamadas`);
    }

    retornarUltima() {
        return this.http.get(`${HOST_CEFIT}/api/` + this.artefato() + `/retornarUltima`);
    }

    retornarProxima(chamada) {
        return this.http.post(`${HOST_CEFIT}/api/` + this.artefato() + `/retornarProxima`, chamada);
    }

    resetarSenha() {
        return this.http.get(`${HOST_CEFIT}/api/` + this.artefato() + `/resetarSenha`);
    }

}