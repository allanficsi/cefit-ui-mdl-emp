import { TipoSenha } from "./tipo-senha";

export class Senha {
    
    codigo: Number;
    codigoTipoSenha: Number;
    numero: NumberConstructor;
    descricao: string;
    data: Date;
    dataInclusao: Date;
    flagAtivo: boolean;
    dataAlteracao: Date;
    codigoUsuarioAlteracao: Number;

    tipoSenha: TipoSenha;

}
