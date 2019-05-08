import {Injectable} from '@angular/core';
import {AptareCrudService} from '../shared/aptare-crud.service';
import {Trabalhador} from '../../model/trabalhador/trabalhador';
import {Espaco} from '../../model/espaco/espaco';
import {HOST_CEFIT} from '../cefit.api';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TrabalhadorService extends AptareCrudService<Trabalhador> {

  constructor(public http: HttpClient) {
    super(http);
  }

  salvarManutencao(obj: Trabalhador) {
    return this.http.post(`${HOST_CEFIT}/api/` + this.artefato() + `/salvarManutencao`, obj);
  }

  artefato(): string {
    return 'trabalhador';
  }

}
