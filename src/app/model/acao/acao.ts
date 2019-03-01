import { Auditoria } from "../auditoria";
import { Espaco } from "../espaco/espaco";
import { TipoAcao } from "./tipo-acao";

export class Acao {
    
   codigo: Number;
   codigoEspaco: Number;
   nome: string;
   codigoTipoAcao: Number;
   numeroVagas: Number;
   flagValeTransporte: boolean;
   flagValeRefeicao: boolean;
   observacao: string;
   codigoAgendamento: Number;
   situacao: Number;

   auditoria: Auditoria;
   espaco: Espaco;
   tipoAcao: TipoAcao;

}
