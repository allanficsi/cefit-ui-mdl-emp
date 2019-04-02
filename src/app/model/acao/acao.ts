import { Auditoria } from "../auditoria";
import { Espaco } from "../espaco/espaco";
import { TipoAcao } from "./tipo-acao";
import { AcaoProfissional } from "./acao-profissional";
import { Agenda } from "./agenda";

export class Acao {
    
   codigo: Number;
   codigoEsp: Number;
   nome: string;
   codigoTac: Number;
   numeroVagas: Number;
   flagValeTransporte: boolean;
   flagValeRefeicao: boolean;
   observacao: string;
   codigoAgendamento: Number;
   descricaoSituacao: string;
   situacao: Number;

   auditoria: Auditoria;
   espaco: Espaco;
   tipoAcao: TipoAcao;
   listaAcaoProfissional: AcaoProfissional[];
   listaAgenda: Agenda[];
   listaAgendaOrdenada: Agenda[];

}
