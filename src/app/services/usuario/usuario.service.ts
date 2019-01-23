import { HOST_CEFIT } from '../cefit.api';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Usuario } from '../../model/usuario';


@Injectable()
export class UsuarioService {

  constructor(private http: HttpClient) {}

  login(usuario: Usuario){
    return this.http.post(`${HOST_CEFIT}/api/auth`, usuario);
  }

  createOrUpdate(usuario: Usuario){
    if(usuario.codigo != null && usuario.codigo > 0){
      return this.http.put(`${HOST_CEFIT}/api/usuario`, usuario);
    } else {
      usuario.codigo = null;
      return this.http.post(`${HOST_CEFIT}/api/usuario`, usuario);
    }
  }

  findAll(page: number, count: number){
    return this.http.get(`${HOST_CEFIT}/api/usuario/${page}/${count}`);
  }

  findById(codigo: number){
    return this.http.get(`${HOST_CEFIT}/api/usuario/${codigo}`);
  }

  delete(codigo: number){
    return this.http.delete(`${HOST_CEFIT}/api/usuario/${codigo}`);
  }

  //METODO QUE VALIDA O TOKEN DO USUARIO
}
