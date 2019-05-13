import { Injectable } from '@angular/core';
import { Vaga } from '../../model/vaga/vaga';
import { AptareCrudService } from '../shared/aptare-crud.service';

@Injectable()
export class VagaService extends AptareCrudService<Vaga> {

    public static SITUACAO_PENDENTE = 1;
    public static SITUACAO_ATIVA = 2;

    artefato(): string {    
        return "vaga";
    }

}