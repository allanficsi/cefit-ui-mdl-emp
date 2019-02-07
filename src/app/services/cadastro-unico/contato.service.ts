import { Injectable } from '@angular/core';
import { Contato } from '../../model/cadastro-unico/contato';
import { AptareCrudService } from '../shared/aptare-crud.service';

@Injectable()
export class ContatoService extends AptareCrudService<Contato> {

    artefato(): string {    
        return "contato";
    }

}