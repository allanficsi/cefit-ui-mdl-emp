import { Injectable } from '@angular/core';
import { Vaga } from '../../model/vaga/vaga';
import { AptareCrudService } from '../shared/aptare-crud.service';
import { HOST_CEFIT } from '../cefit.api';
import { Encaminhamento } from '../../model/vaga/encaminhamento';

@Injectable()
export class EncaminhamentoService extends AptareCrudService<Encaminhamento> {

    artefato(): string {    
        return "encaminhamento";
    }

}