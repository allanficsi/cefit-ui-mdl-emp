import { Injectable } from '@angular/core';
import { Vaga } from '../../model/vaga/vaga';
import { HOST_CEFIT } from '../cefit.api';
import { AptareCrudService } from '../shared/aptare-crud.service';
import { EncaminhamentoNaoAtendido } from '../../model/vaga/encaminhamento-nao-atendido';

@Injectable()
export class EncaminhamentoNaoAtendidoService extends AptareCrudService<EncaminhamentoNaoAtendido> {

    artefato(): string {    
        return "encaminhamentoNaoAtendido";
    }

}