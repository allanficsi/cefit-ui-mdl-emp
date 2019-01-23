import { PessoaJuridica } from "./pessoa-juridica";
import { PessoaFisica } from "./pessoa-fisica";
import { ExtensaoEndereco } from "./extensao-endereco";
import { Auditoria } from "../auditoria";
import { Correio } from "../correio/correio";
import { Dominio } from "../geral/dominio";

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