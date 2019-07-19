import {EXTERNO, HOST_CEFIT} from '../cefit.api';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Usuario } from '../../model/usuario';
import {AptareCrudService} from '../shared/aptare-crud.service';
import {Empregador} from '../../model/empregador/empregador';


@Injectable()
export class UsuarioService extends AptareCrudService<Usuario>{

  artefato(): string {
    return 'usuario';
  }

  login(usuario: Usuario){
    return this.http.post(`${HOST_CEFIT}/api/auth`, usuario);
  }

  redefinirSenha(usuario: Usuario){
    return this.http.post(`${HOST_CEFIT}/api/` + this.artefato() +`/redefinirSenha`, usuario);
  }
  resetarSenha(usuario: Usuario){
    return this.http.post(`${HOST_CEFIT}/api/`+this.artefato() +`/${EXTERNO}/${EXTERNO}/resetarSenha`, usuario);
  }

}
