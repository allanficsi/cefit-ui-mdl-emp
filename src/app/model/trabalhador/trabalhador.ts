import { CadastroUnico } from "../cadastro-unico/cadastro-unico";
import { Auditoria } from "../auditoria";
import { Cbo } from "./cbo";
import { TrabalhadorCbo } from "./trabalhador-cbo";
import { TrabalhadorDeficiencia } from "./trabalhador-deficiencia";
import { TrabalhadorAgenda } from './trabalhador-agenda';
import { TrabalhadorLog } from './trabalhador-log';

export class Trabalhador {
    
    codigo: Number;
    codigoCadastroUnico: Number;
    numeroPis: Number;
    numeroCtps: Number;
    dataEmissaoCtps: Date;
    situacao: Number;
    descricaoSituacao: string;
    situacaoIngresso: Number;
    descricaoSituacaoIngresso: string;
    motivoInativacao: string;
    motivoAtivacao: string;
    flagTrabalhadorInformal:boolean;
    flagTrabalhadorFormal:boolean;
    observacao: string;
    ufCtps: string;
    numeroSerieCtps: Number;
    numeroInscricaoPrefeitura: Number;
    numeroInss: Number;
    flagPsicologo: string;
    codigoQualificacao;

    cadastroUnico: CadastroUnico;
    auditoria: Auditoria;

    listaTrabalhadorCbo: TrabalhadorCbo[];
    listaTrabalhadorDeficiencia: TrabalhadorDeficiencia[];
    listaTrabalhadorAgenda:TrabalhadorAgenda[];
    listaTrabalhadorLog:TrabalhadorLog[];
    listaTrabalhadorLogOrdenada:TrabalhadorLog[];

}
