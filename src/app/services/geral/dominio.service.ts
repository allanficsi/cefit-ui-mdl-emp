import { Injectable } from '@angular/core';
import { AptareCrudService } from '../shared/aptare-crud.service';
import { Dominio } from '../../model/geral/dominio';
import { EXTERNO, HOST_CEFIT } from '../cefit.api';

@Injectable()
export class DominioService extends AptareCrudService<Dominio> {

  artefato(): string {
    return 'dominio';
  }

  pesquisarExterno(obj: Dominio) {
    console.log(obj);
    return this.http.post(`${HOST_CEFIT}/api/`+this.artefato() + `/${EXTERNO}/${EXTERNO}` + `/pesquisar`, obj);
  }
}
