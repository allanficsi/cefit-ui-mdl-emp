import { Injectable } from '@angular/core';
import { AptareCrudService } from '../shared/aptare-crud.service';
import { Correio } from '../../model/correio/correio';

@Injectable()
export class CorreioService extends AptareCrudService<Correio> {

    artefato(): string {    
        return "correio";
    }

}