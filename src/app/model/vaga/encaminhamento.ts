import { Auditoria } from "../auditoria";
import { Trabalhador } from "../trabalhador/trabalhador";
import { Vaga } from "./vaga";

export class Encaminhamento {
    
    codigo: Number;
    codigoTrabalhador: Number;
    codigoVaga: Number;
    flagAtivo: string;
    dataCancelamento: Date;
    codigoUsuarioCancelamento: Number;

    trabalhador: Trabalhador;
    vaga: Vaga;
    auditoria: Auditoria;

}
