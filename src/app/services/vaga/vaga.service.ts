import { Injectable } from '@angular/core';
import { Vaga } from '../../model/vaga/vaga';
import { AptareCrudService } from '../shared/aptare-crud.service';
import { HOST_CEFIT } from '../cefit.api';

@Injectable()
export class VagaService extends AptareCrudService<Vaga> {

    public static SITUACAO_ABERTA = 1;
    public static SITUACAO_EM_ANDAMENTO = 2;
    public static SITUACAO_SUSPENSA = 3;
    public static SITUACAO_CANCELADA = 4;
    public static SITUACAO_FINALIZADA = 5;

    artefato(): string {    
        return "vaga";
    }

    alterarSituacaoVaga(obj: Vaga) {
        return this.http.post(`${HOST_CEFIT}/api/`+this.artefato()+`/alterarSituacaoVaga`, obj)
    }

    listarVagasEncaminhamento(obj: Vaga) {
        return this.http.post(`${HOST_CEFIT}/api/`+this.artefato()+`/listarVagasEncaminhamento`, obj)
    }
}