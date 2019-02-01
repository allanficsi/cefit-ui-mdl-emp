import { Injectable } from '@angular/core';
import { AptareCrudService } from '../shared/aptare-crud.service';
import { Profissional } from '../../model/profissional/profissional';

@Injectable()
export class ProfissionalService extends AptareCrudService<Profissional> {
    
    artefato(): string {    
        return "profissional";
    }

}