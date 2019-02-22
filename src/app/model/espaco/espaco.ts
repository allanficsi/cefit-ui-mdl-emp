import { Auditoria } from "../auditoria";
import { Endereco } from "../cadastro-unico/endereco";
import { EspacoItemEspaco } from "./espaco-item-espaco";
import { Local } from "protractor/built/driverProviders";
import { EspacoFiltro } from "./filtro/espaco-filtro";

export class Espaco {
    
    codigo: Number;
    nome: string;
    capacidade: Number;
    descricao: string;
    codigoEndereco: Number;
    codigoLocal: Number;
    flagAtivo: string;
    
    endereco: Endereco;
    local: Local;
    auditoria: Auditoria;
    filtro: EspacoFiltro;

    listaEspacoItemEspaco: EspacoItemEspaco[];

}
