import { Injectable } from '@angular/core';
import { AptareCrudService } from '../shared/aptare-crud.service';
import { Empregador } from '../../model/empregador/empregador';

@Injectable()
export class EmpregadorService extends AptareCrudService<Empregador> {

    public static SITUACAO_PENDENTE = 1;
    public static SITUACAO_ATIVA = 2;
    public static SITUACAO_INATIVA = 3;

    artefato(): string {    
        return "empregador";
    }

}