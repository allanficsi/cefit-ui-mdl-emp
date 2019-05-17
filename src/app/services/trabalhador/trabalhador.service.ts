import { Injectable } from '@angular/core';
import { AptareCrudService } from '../shared/aptare-crud.service';
import { Trabalhador } from '../../model/trabalhador/trabalhador';
import { Espaco } from '../../model/espaco/espaco';
import { HOST_CEFIT } from '../cefit.api';
import { HttpClient } from '@angular/common/http';
import {Acao} from '../../model/acao/acao';

@Injectable()
export class TrabalhadorService extends AptareCrudService<Trabalhador> {

  public static SITUACAO_PENDENTE = 1;
  public static SITUACAO_ATIVA = 2;
  public static SITUACAO_INATIVA = 3;

  //SITUAÇÃO DE INGRESSO NO PROGRAMA
  public static  PENDENTE_DE_AVALIACAO=1;
  public static  PENDENTE_DE_VALIDACAO=2;
  public static  ENCAMINHADO_PARA_A_AVALIACAO=3;
  public static  ENCAMINHADO_PARA_A_CAPACITACAO=4;
  public static  ENCAMINHADO_PARA_A_ENTREVISTA_OCUPACIONAL=5;
  public static  RESTRICAO_POR_AVALIACAO=6;
  public static  RESTRICAO_POR_CAPACITACAO=7;
  public static  RESTRICAO_POR_ENTREVISTA_OCUPACIONAL=8;
  public static  APROVADO=9;
  public static  EXCLUIDO=10;


  constructor(public http: HttpClient) {
    super(http);
  }

  artefato(): string {
    return 'trabalhador';
  }

  salvarManutencao(obj: Trabalhador) {
    return this.http.post(`${HOST_CEFIT}/api/` + this.artefato() + `/salvarManutencao`, obj);
  }
   alterarSituacaoDeIngresso(obj: Trabalhador) {
    return this.http.post(`${HOST_CEFIT}/api/`+this.artefato()+`/alterarSituacaoDeIngresso`, obj)
  }

}
