import { Telefone } from "./telefone";

export class PessoaFisica {
    
    codigoCadastroUnico: Number;
    registroGeral: Number;
    nomeMae: string;
    dataNascimento: Date;
    sexo: string;
    dataEmissaoRg: Date;
    orgaoEmissorRg: string;
    ufOrgaoEmissorRg: string;
    naturalidade: string;
    ufNaturalidade: string;
    nacionalidade: string;
    estadoCivil: Number;
    descricaoEstadoCivil: string;
    identificadorPrincipal: string;

    listaTelefone: Telefone[];
}
