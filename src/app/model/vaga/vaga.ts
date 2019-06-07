import { Auditoria } from "../auditoria";
import { Trabalhador } from "../trabalhador/trabalhador";
import { VagaAgendamento } from "./vaga-agendamento";
import { VagaDia } from "./vaga-dia";
import { FiltroVaga } from "./filtro/filtro-vaga";
import { Cbo } from "../trabalhador/cbo";
import { Empregador } from "../empregador/empregador";

export class Vaga {
    
    codigo: Number;
    descricao: string;
    tipoVaga: string;
    tipoDescricaoVaga: string;
    codigoTrabalhador: Number;
    codigoCbo: Number;
    descricaoCbo: string;
    codigoEmpregador: Number;
    dataInicio: Date;
    dataFim: Date;
    dataLimite: Date;// trb_formal
    direcionamento:Number;
    situacao: Number;
    descricaoSituacao: string;
    observacao: string;
    flagRealizada: boolean;
    flagControleExibicao: boolean;
    valorPago: number;
    auditoria: Auditoria;
    filtro: FiltroVaga;

    empregadorEntity: Empregador;
    cboEntity: Cbo;
    trabalhadorEntity: Trabalhador;
    listaVagaAgendamento: VagaAgendamento[];
    listaVagaAgendamentoOrdenada: VagaAgendamento[];
    listaVagaDia: VagaDia[];
}
