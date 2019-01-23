import { Injectable } from '@angular/core';
import { AptareCrudService } from '../shared/aptare-crud.service';
import { Cargo } from '../../model/cadastro-unico/cargo';

@Injectable()
export class CargoService extends AptareCrudService<Cargo> {

    artefato(): string {    
        return "cargo";
    }

}