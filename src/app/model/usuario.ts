import { Empregador } from './empregador/empregador';
import { FiltroUsuario } from './FiltroUsuario';

export class Usuario {

        public codigo: Number;
        public login: String;
        public senha: String;
        public codigoCadastroUnico: Number;
        public empregador:Empregador;
        public filtro: FiltroUsuario;
}
