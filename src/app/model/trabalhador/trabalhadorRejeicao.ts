import { Trabalhador } from './trabalhador';
import {Empregador} from '../empregador/empregador';

export class TrabalhadorRejeicao {

    codigo:Number;
    codigoTrabalhador:Number;
    codigoEmpregador:Number;
    motivoRejeicao:string;
    flagAtivo:string;
    codigoUsuarioInclusao:Number;
    dataInclusao:Date;
    codigoUsuarioAlteracao:Number;
    dataAlteracao:Date;
    tipoOrigemRejeicao:Number;
    codigoMotivoRejeicao:Number;
    trabalhador:Trabalhador;
    empregador:Empregador;

}
