import { FiltroBusca } from './filtro-busca';
import { FiltroPesquisa } from './filtro-pesquisa';
import { Ordenacao } from './ordenacao';
import { Resultado } from './resultado';

export class GenericLov {
    constructor(
        public identificador: string,
        public titulo: string,
        public resultados: Resultado[],
        public filtrosPesquisa: FiltroPesquisa[],
        public filtrosBusca: FiltroBusca[],
        public ordenacoes: Ordenacao[],
        public povoar: string,
        public tamanhoDivResultado: Number,
        public limpar: string
    ){}
}
