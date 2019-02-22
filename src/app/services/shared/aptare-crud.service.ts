import { HOST_CEFIT } from '../cefit.api';
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AptareCrudService<Entity> {

  constructor(public http: HttpClient) {}

  pesquisar(obj: Entity) {
    return this.http.post(`${HOST_CEFIT}/api/`+this.artefato()+`/pesquisar`, obj);
  }

  get(obj: Entity) {
    return this.http.post(`${HOST_CEFIT}/api/`+this.artefato()+`/get`, obj);
  }

  inserir(obj: Entity) {
    return this.http.post(`${HOST_CEFIT}/api/`+this.artefato(), obj)
  }

  alterar(obj: Entity) {
    return this.http.put(`${HOST_CEFIT}/api/`+this.artefato(), obj)
  }

  inativar(obj: Entity) {
    return this.http.post(`${HOST_CEFIT}/api/`+this.artefato()+`/inativar`, obj);
  }

  ativar(obj: Entity) {
    return this.http.post(`${HOST_CEFIT}/api/`+this.artefato()+`/ativar`, obj);
  }

  artefato(): string { return null }
}