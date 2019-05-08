import { Auditoria } from "../auditoria";
import { Trabalhador } from "../trabalhador/trabalhador";
import { VagaAgendamento } from "./vaga-agendamento";
import { VagaDia } from "./vaga-dia";
import { FiltroVaga } from "./filtro/filtro-vaga";

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
    situacao: Number;
    descricaoSituacao: string;
    auditoria: Auditoria;
    filtro: FiltroVaga;

    trabalhador: Trabalhador;
    listaVagaAgendamento: VagaAgendamento[];
    listaVagaDia: VagaDia[];
}
