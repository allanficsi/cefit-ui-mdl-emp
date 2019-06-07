import { Guiche } from "./guiche";
import { Senha } from "./senha";

export class Chamada {
    
    codigo: Number;
    codigoSenha: Number;
    codigoGuiche: Number;
    codigoUsuarioInclusao: Number;
    dataInclusao: Date;
    data: Date;

    senha: Senha;
    guiche: Guiche;

}
