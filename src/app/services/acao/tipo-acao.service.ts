import { Injectable } from '@angular/core';
import { TipoAcao } from 'src/app/model/acao/tipo-acao';
import { AptareCrudService } from '../shared/aptare-crud.service';

@Injectable()
export class TipoAcaoService extends AptareCrudService<TipoAcao> {
    
    artefato(): string {    
        return "tipoAcao";
    }

}