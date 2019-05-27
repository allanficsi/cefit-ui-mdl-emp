import { Injectable } from '@angular/core';
import { Vaga } from '../../model/vaga/vaga';
import { AptareCrudService } from '../shared/aptare-crud.service';
import { HOST_CEFIT } from '../cefit.api';
import { Encaminhamento } from '../../model/vaga/encaminhamento';

@Injectable()
export class EncaminhamentoNaoAtendidoService extends AptareCrudService<EncaminhamentoNaoAtendidoService> {

    artefato(): string {    
        return "encaminhamentoNaoAtendido";
    }

}