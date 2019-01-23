import { PessoaJuridica } from "./pessoa-juridica";
import { PessoaFisica } from "./pessoa-fisica";
import { Endereco } from "./endereco";
import { Auditoria } from "../auditoria";

export class CadastroUnico {
    
    codigo: Number;
    nome: string;
    email: string;
    tipoPessoa: string;
    cpfCnpj: Number;
    pessoaJuridica: PessoaJuridica;
    pessoaFisica: PessoaFisica;
    cpf: string;
    cnpj: string;

    auditoria: Auditoria;
    listaEndereco: Endereco[];

}
