import { Auditoria } from "../auditoria";
import { FeriadoFiltro } from "./filtro/feriado-filtro";

export class Feriado {
    
    dataFeriado: Number;
    descricao: string;
    auditoria: Auditoria;
    filtro: FeriadoFiltro;
    
}
