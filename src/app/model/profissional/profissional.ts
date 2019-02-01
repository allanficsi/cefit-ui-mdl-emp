import { Auditoria } from "../auditoria";
import { CadastroUnico } from "../cadastro-unico/cadastro-unico";
import { ProfissionalQualificacao } from "./profissional-qualificacao";

export class Profissional {
    
    codigo: Number;
    codigoCadastroUnico: Number;
    numeroPis: Number;
    numeroCtps: Number;
    dataEmissaoCtps: Date;
    observacao: string;
    ufCtps: string;
    numeroSerieCtps: Number;
    numeroInscricaoPrefeitura: Number;
    numeroInss: Number;
    flagAtivo: string;
    flagPsicologo: string;
    codigoQualificacao: Number;

    cadastroUnico: CadastroUnico;
    auditoria: Auditoria;

    listaProfissionalQualificacao: ProfissionalQualificacao[];

}
