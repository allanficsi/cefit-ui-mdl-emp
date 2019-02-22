import { Injectable } from '@angular/core';
import { AptareCrudService } from '../shared/aptare-crud.service';
import { Local } from '../../model/espaco/local';

@Injectable()
export class LocalService extends AptareCrudService<Local> {

    artefato(): string {    
        return "local";
    }

}