import { Injectable } from '@angular/core';
import { AptareCrudService } from '../shared/aptare-crud.service';
import { Cbo } from '../../model/trabalhador/cbo';

@Injectable()
export class CboService extends AptareCrudService<Cbo> {
    artefato(): string {
        return "cbo";
    }
}
