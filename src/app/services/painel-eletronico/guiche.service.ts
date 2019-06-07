import { Injectable } from '@angular/core';
import { AptareCrudService } from '../shared/aptare-crud.service';
import { Guiche } from '../../model/painel-eletronico/guiche';

@Injectable()
export class GuicheService extends AptareCrudService<Guiche> {
    
    artefato(): string {    
        return "guiche";
    }

}