import { Injectable } from '@angular/core';
import { CadastroUnico } from '../../model/cadastro-unico/cadastro-unico';
import { AptareCrudService } from '../shared/aptare-crud.service';
import {Cargo} from '../../model/cadastro-unico/cargo';
import {EXTERNO, HOST_CEFIT} from '../cefit.api';

@Injectable()
export class CadastroUnicoService extends AptareCrudService<CadastroUnico> {

    artefato(): string {    
        return "cadastroUnico";
    }

  getExterno(obj: CadastroUnico) {
    return this.http.post(`${HOST_CEFIT}/api/` + this.artefato() + `/${EXTERNO}/${EXTERNO}` + `/get`, obj);
  }
}
