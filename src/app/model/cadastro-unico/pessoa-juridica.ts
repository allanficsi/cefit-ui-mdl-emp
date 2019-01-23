import { Contato } from "./contato";

export class PessoaJuridica {
    
    codigoCadastroUnico: Number;
    nomeFantasia: string;
    inscricaoEstadual: Number;
    dataRegistroJunta: Date;

    listaContato: Contato[];
}
