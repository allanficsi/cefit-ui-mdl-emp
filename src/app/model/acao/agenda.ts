import { Auditoria } from "../auditoria";

export class Agenda {
    
    codigo: Number;
    codigoEspaco: Number;
    dataAgenda: Date;;
    fgFeriado: boolean;
    fgFds: boolean;
    nrHor1: string;
    nrHor2: string;
    nrHor3: string;
    nrHor4: string;
    flagAtivo: string;
    nomeDia: string;
    
    auditoria: Auditoria;

}