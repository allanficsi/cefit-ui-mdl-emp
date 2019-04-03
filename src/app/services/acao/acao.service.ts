import { Injectable } from '@angular/core';
import { Acao } from '../../model/acao/acao';
import { AptareCrudService } from '../shared/aptare-crud.service';
import { HOST_CEFIT } from '../cefit.api';

@Injectable()
export class AcaoService extends AptareCrudService<Acao> {
    
    public static SITUACAO_PENDENTE = 1;
    public static SITUACAO_ATIVA = 2;
    public static SITUACAO_ABERTA_INSCRICAO = 3;
    public static SITUACAO_CONFIRMADA = 4;
    public static SITUACAO_REALIZADA = 5;
    public static SITUACAO_CANCELADA = 6;

    artefato(): string {    
        return "acao";
    }

    alterarSituacaoAcao(obj: Acao) {
        return this.http.post(`${HOST_CEFIT}/api/`+this.artefato()+`/alterarSituacaoAcao`, obj)
    }

}