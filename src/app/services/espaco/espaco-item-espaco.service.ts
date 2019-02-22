import { Injectable } from '@angular/core';
import { AptareCrudService } from '../shared/aptare-crud.service';
import { EspacoItemEspaco } from '../../model/espaco/espaco-item-espaco';

@Injectable()
export class EspacoItemEspacoService extends AptareCrudService<EspacoItemEspaco> {

    artefato(): string {    
        return "espacoItemEspaco";
    }

}