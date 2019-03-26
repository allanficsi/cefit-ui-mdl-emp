import { Injectable } from '@angular/core';
import { CadastroUnico } from '../../model/cadastro-unico/cadastro-unico';
import { AptareCrudService } from '../shared/aptare-crud.service';

@Injectable()
export class CadastroUnicoService extends AptareCrudService<CadastroUnico> {

    artefato(): string {    
        return "cadastroUnico";
    }

}