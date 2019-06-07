import { Injectable } from '@angular/core';
import { AptareCrudService } from '../shared/aptare-crud.service';
import { Senha } from '../../model/painel-eletronico/senha';

@Injectable()
export class SenhaService extends AptareCrudService<Senha> {
    
    artefato(): string {    
        return "senha";
    }

}