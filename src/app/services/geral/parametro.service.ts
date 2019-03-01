import { Injectable } from '@angular/core';
import { AptareCrudService } from '../shared/aptare-crud.service';
import { Parametro } from '../../model/geral/parametro';

@Injectable()
export class ParametroService extends AptareCrudService<Parametro> {
    
    artefato(): string {    
        return "parametro";
    }

}