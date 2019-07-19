import { Injectable } from '@angular/core';
import { AptareCrudService } from '../shared/aptare-crud.service';
import { Cargo } from '../../model/cadastro-unico/cargo';
import {EXTERNO, HOST_CEFIT} from '../cefit.api';

@Injectable()
export class CargoService extends AptareCrudService<Cargo> {

    artefato(): string {
        return "cargo";
    }

  pesquisarExterno(obj: Cargo) {
    return this.http.post(`${HOST_CEFIT}/api/` + this.artefato() + `/${EXTERNO}/${EXTERNO}` + `/pesquisar`, obj);
  }

}
