import { Injectable } from '@angular/core';
import { AptareCrudService } from '../shared/aptare-crud.service';
import { Empregador } from '../../model/empregador/empregador';
import { EXTERNO, HOST_CEFIT } from '../cefit.api';

@Injectable()
export class EmpregadorService extends AptareCrudService<Empregador> {

    public static SITUACAO_PENDENTE = 1;
    public static SITUACAO_ATIVA = 2;
    public static SITUACAO_INATIVA = 3;

    artefato(): string {    
        return "empregador";
    }

  getExterno(obj: Empregador) {
    return this.http.post(`${HOST_CEFIT}/api/` + this.artefato() + `/${EXTERNO}/${EXTERNO}` + `/get`, obj);
  }
  inserirExterno(obj: Empregador) {
    return this.http.post(`${HOST_CEFIT}/api/` + this.artefato() + `/${EXTERNO}/${EXTERNO}` + `/inserir`, obj);
  }
}
