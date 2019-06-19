import { Auditoria } from "../auditoria";
import { Trabalhador } from "../trabalhador/trabalhador";
import { Vaga } from "./vaga";

export class EncaminhamentoNaoAtendido {
    
    codigo: Number;
    codigoTrabalhador: Number;
    codigoVaga: Number;
    flagAtivo: string;

    trabalhador: Trabalhador;
    vagaEntity: Vaga;
    auditoria: Auditoria;

}
