import { Injectable } from '@angular/core';
import { TrabalhadorCbo } from '../../model/trabalhador/trabalhador-cbo';
import { AptareCrudService } from '../shared/aptare-crud.service';

@Injectable()
export class TrabalhadorCboService extends AptareCrudService<TrabalhadorCbo> {
    artefato(): string {
        return "trabalhador-cbo";
    }
}
