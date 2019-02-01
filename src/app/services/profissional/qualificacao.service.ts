import { Injectable } from '@angular/core';
import { AptareCrudService } from '../shared/aptare-crud.service';
import { Qualificacao } from '../../model/profissional/qualificacao';

@Injectable()
export class QualificacaoService extends AptareCrudService<Qualificacao> {
    
    artefato(): string {    
        return "qualificacao";
    }

}