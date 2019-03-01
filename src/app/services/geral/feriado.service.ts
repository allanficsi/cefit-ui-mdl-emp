import { Injectable } from '@angular/core';
import { Feriado } from 'src/app/model/geral/feriado';
import { AptareCrudService } from '../shared/aptare-crud.service';

@Injectable()
export class FeriadoService extends AptareCrudService<Feriado> {
    
    artefato(): string {    
        return "feriado";
    }

}