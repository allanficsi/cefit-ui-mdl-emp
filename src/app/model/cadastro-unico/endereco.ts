import { Auditoria } from "../auditoria";
import { Correio } from "../correio/correio";
import { Dominio } from "../geral/dominio";
import { ExtensaoEndereco } from "./extensao-endereco";

export class Endereco {
    
    codigo: Number;
    codigoCadastroUnico: Number;
    cep: Number;
    cepFormatado: string;
    numero: string;
    complemento: string;
    flagAtivo: string;
    tipo: Number;
    descricaoTipo: string;
    enderecoCompleto: string;
    logradouroGenerico: string;
    pontoReferencia: string;

    objTipo: Dominio;
    auditoria: Auditoria;
    extensaoEndereco: ExtensaoEndereco;
    correio: Correio;

}