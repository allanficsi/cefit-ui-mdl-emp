import { Auditoria } from "../auditoria";
import { Dominio } from "../geral/dominio";

export class Telefone {
    
    codigo: Number;
	ddd: Number;
    numero: Number;
    tipo: Number;
    nsuOrigem: Number;
    flagAtivo: string;
    flagWhats: boolean;
    descricaoTipo: string;
    auditoria: Auditoria;
    nrTelefoneExtenso: string;

    objTipo: Dominio;

}
