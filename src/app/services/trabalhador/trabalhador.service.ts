import { Injectable } from '@angular/core';
import { AptareCrudService } from '../shared/aptare-crud.service';
import { Trabalhador } from '../../model/trabalhador/trabalhador';

@Injectable()
export class TrabalhadorService extends AptareCrudService<Trabalhador> {

    public static SITUACAO_PENDENTE = 1;
    public static SITUACAO_ATIVA = 2;
    public static SITUACAO_INATIVA = 3;

    artefato(): string {    
        return "trabalhador";
    }

}