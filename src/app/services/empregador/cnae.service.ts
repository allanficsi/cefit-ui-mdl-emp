import { Injectable } from '@angular/core';
import { AptareCrudService } from '../shared/aptare-crud.service';
import { Cnae } from '../../model/empregador/cnae';
import {Cargo} from '../../model/cadastro-unico/cargo';
import {EXTERNO, HOST_CEFIT} from '../cefit.api';

@Injectable()
export class CnaeService extends AptareCrudService<Cnae> {

  //EXTERNO  = 'externo';

  artefato(): string {
        return "cnae";
    }
  pesquisarExterno(obj: Cnae) {
    return this.http.post(`${HOST_CEFIT}/api/` + this.artefato() + `/${EXTERNO}/${EXTERNO}` + `/pesquisar`, obj);
  }
}
