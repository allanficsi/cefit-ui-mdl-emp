import { Injectable } from '@angular/core';
import { AptareCrudService } from '../shared/aptare-crud.service';
import { Espaco } from '../../model/espaco/espaco';
import { HOST_CEFIT } from '../cefit.api';
import { HttpClient} from '@angular/common/http';

@Injectable()
export class EspacoService extends AptareCrudService<Espaco> {

    constructor(public http: HttpClient) {
        super(http);
    }

    salvarManutencao(obj: Espaco) {
        return this.http.post(`${HOST_CEFIT}/api/`+this.artefato()+`/salvarManutencao`, obj)
    }

    artefato(): string {    
        return "espaco";
    }

}