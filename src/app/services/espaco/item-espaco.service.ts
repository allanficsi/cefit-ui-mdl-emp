import { Injectable } from '@angular/core';
import { AptareCrudService } from '../shared/aptare-crud.service';
import { ItemEspaco } from '../../model/espaco/item-espaco';

@Injectable()
export class ItemEspacoService extends AptareCrudService<ItemEspaco> {

    artefato(): string {    
        return "itemEspaco";
    }

}