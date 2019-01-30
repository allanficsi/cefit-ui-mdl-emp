import { Injectable } from '@angular/core';
import { AptareCrudService } from '../shared/aptare-crud.service';
import { Trabalhador } from '../../model/trabalhador/trabalhador';

@Injectable()
export class TrabalhadorService extends AptareCrudService<Trabalhador> {

    artefato(): string {    
        return "trabalhador";
    }

}