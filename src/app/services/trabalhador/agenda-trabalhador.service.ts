import { Injectable } from '@angular/core';
import { AptareCrudService } from '../shared/aptare-crud.service';
import { TrabalhadorAgenda } from '../../model/trabalhador/trabalhador-agenda';

@Injectable()
export class AgendaTrabalhadorService extends AptareCrudService<TrabalhadorAgenda>{

  artefato(): string {
    return "agenda";
  }
}
