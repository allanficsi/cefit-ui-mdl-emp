import { Injectable } from '@angular/core';
import {AptareCrudService} from '../shared/aptare-crud.service';
import {AgendaTrabalhador} from '../../model/trabalhador/agenda-trabalhador';

@Injectable()
export class AgendaTrabalhadorService extends AptareCrudService<AgendaTrabalhador>{

  artefato(): string {
    return "agenda";
  }
}
