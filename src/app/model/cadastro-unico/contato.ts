import { Cargo } from "./cargo";
import { Auditoria } from "../auditoria";
import { Telefone } from "./telefone";
import { Dominio } from "../geral/dominio";

export class Contato {
    
    codigo: Number;
    codigoCadastroUnico: Number;
    codigoCargo: Number;
    cargo: Cargo;
    nome: string;
    dataNascimento: Date;
    email: string;
    flagAtivo: string;
    auditoria: Auditoria;
    tipoContato: Number;
    descricaoTipoContato: string;

    objTipoContato: Dominio;
    listaTelefone: Telefone[];
}
