import { Injectable } from '@angular/core';
import { AptareCrudService } from '../shared/aptare-crud.service';
import { Dominio } from '../../model/geral/dominio';

@Injectable()
export class DominioService extends AptareCrudService<Dominio> {
    
    artefato(): string {
        return "dominio";
    }

}