import { Injectable } from '@angular/core';
import { AptareCrudService } from '../shared/aptare-crud.service';
import { Cnae } from '../../model/empregador/cnae';

@Injectable()
export class CnaeService extends AptareCrudService<Cnae> {
    artefato(): string {
        return "cnae";
    }
}
