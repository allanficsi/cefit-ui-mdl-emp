import { Injectable } from '@angular/core';
import { AptareCrudService } from '../shared/aptare-crud.service';
import { TipoSenha } from '../../model/painel-eletronico/tipo-senha';

@Injectable()
export class TipoSenhaService extends AptareCrudService<TipoSenha> {
    
    artefato(): string {
        return "tipoSenha";
    }

}