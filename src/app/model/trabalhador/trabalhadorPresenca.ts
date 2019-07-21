import { Trabalhador } from './trabalhador';
import {Empregador} from '../empregador/empregador';
import {PresencaFiltro} from "./filtro/presenca-filtro";

export class TrabalhadorPresenca {

    codigo:Number;
    codigoTrabalhador:Number;
    dataPresenca:Date;
    nrHor1:string;
    nrHor2:string;
    codigoUsuarioInclusao:Number;
    dataInclusao:Date;
    codigoUsuarioAlteracao:Number;
    dataAlteracao:Date;
    flagAtivoPresenca:string;
    trabalhador:Trabalhador;
    flagSel: boolean;
    nomeDia:string;

    filtro:PresencaFiltro;

}
