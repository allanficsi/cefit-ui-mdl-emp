import { Injectable } from '@angular/core';
import { AptareCrudService } from '../shared/aptare-crud.service';
import { Empregador } from '../../model/empregador/empregador';

@Injectable()
export class EmpregadorService extends AptareCrudService<Empregador> {

    artefato(): string {    
        return "empregador";
    }

}