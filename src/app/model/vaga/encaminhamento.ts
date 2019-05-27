import { Auditoria } from "../auditoria";
import { Trabalhador } from "../trabalhador/trabalhador";
import { Vaga } from "./vaga";

export class Encaminhamento {
    
    codigo: Number;
    codigoTrabalhador: Number;
    codigoVaga: Number;

    trabalhadorEntity: Trabalhador;
    vagaEntity: Vaga;
    auditoria: Auditoria;

}
