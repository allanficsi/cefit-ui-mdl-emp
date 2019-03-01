import { Injectable } from '@angular/core';
import { Acao } from '../../model/acao/acao';
import { AptareCrudService } from '../shared/aptare-crud.service';

@Injectable()
export class AcaoService extends AptareCrudService<Acao> {
    
    artefato(): string {    
        return "acao";
    }

}