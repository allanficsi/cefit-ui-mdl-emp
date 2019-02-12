import { CadastroUnico } from "../cadastro-unico/cadastro-unico";
import { Cnae } from "./cnae";
import { Auditoria } from "../auditoria";

export class Empregador {
    
    codigo: Number;
    codigoCadastroUnico: Number;
    codigoCnae: Number;
    codigoProgramaCredito: Number;
    numeroFuncionarios: Number;
    codigoPorteEmpresa: Number;
    dataAtualizacaoPorteEmpresa: Date;
    codigoUsuarioAtualizacaoProteEmpresa: Number;
    situacao: Number;
    descricaoSituacao: string;
    numeroCei: Number;
    observacao: string;

    cadastroUnico: CadastroUnico;
    cnae: Cnae;
    auditoria: Auditoria;

}
