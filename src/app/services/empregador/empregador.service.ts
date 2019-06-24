import { Injectable } from '@angular/core';
import { AptareCrudService } from '../shared/aptare-crud.service';
import { Empregador } from '../../model/empregador/empregador';
import { HttpClient } from '@angular/common/http';
import { Trabalhador } from '../../model/trabalhador/trabalhador';
import { HOST_CEFIT } from '../cefit.api';

@Injectable()
export class EmpregadorService extends AptareCrudService<Empregador> {

    public static SITUACAO_PENDENTE = 1;
    public static SITUACAO_ATIVA = 2;
    public static SITUACAO_INATIVA = 3;

  constructor(public http: HttpClient) {
    super(http);
  }

    artefato(): string {    
        return "empregador";
    }

  resetarSenha(obj: Empregador) {
    return this.http.post(`${HOST_CEFIT}/api/` + this.artefato() + `/resetarSenha`, obj);
  }

}
