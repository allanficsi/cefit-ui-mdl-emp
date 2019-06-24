import {Empregador} from './empregador/empregador';

export class Usuario {
    constructor(
        public codigo: Number,
        public login: string,
        public senha: string,
        public codigoCadastroUnico: Number,
        public empregador:Empregador
    ){}
}
