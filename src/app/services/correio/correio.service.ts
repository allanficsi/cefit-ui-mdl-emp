import { Injectable } from '@angular/core';
import { AptareCrudService } from '../shared/aptare-crud.service';
import { Correio } from '../../model/correio/correio';
import {Cnae} from '../../model/empregador/cnae';
import {EXTERNO, HOST_CEFIT} from '../cefit.api';

@Injectable()
export class CorreioService extends AptareCrudService<Correio> {

    artefato(): string {    
        return "correio";
    }


  getExterno(obj: Correio) {
    return this.http.post(`${HOST_CEFIT}/api/` + this.artefato() + `/${EXTERNO}/${EXTERNO}` + `/get`, obj);
  }

}
