import { Auditoria } from "../auditoria";
import { Dominio } from "../geral/dominio";

export class Telefone {
    
    codigo: Number;
	ddd: Number;
    numero: Number;
    tipo: Number;
    nsuOrigem: Number;
    flagAtivo: string;
    descricaoTipo: string;
    auditoria: Auditoria;

    objTipo: Dominio;

}
