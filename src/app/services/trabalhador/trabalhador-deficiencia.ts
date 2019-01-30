import { Injectable } from '@angular/core';
import { TrabalhadorDeficiencia } from '../../model/trabalhador/trabalhador-deficiencia';
import { AptareCrudService } from '../shared/aptare-crud.service';

@Injectable()
export class TrabalhadorDeficienciaService extends AptareCrudService<TrabalhadorDeficiencia> {
    artefato(): string {
        return "trabalhador-deficiencia";
    }
}
