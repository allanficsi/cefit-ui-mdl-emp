import { Injectable } from '@angular/core';
import { Encaminhamento } from '../../model/vaga/encaminhamento';
import { HOST_CEFIT } from '../cefit.api';
import { HttpHeaders } from '@angular/common/http';
import { AptareCrudService } from '../shared/aptare-crud.service';

@Injectable()
export class EncaminhamentoService extends AptareCrudService<Encaminhamento> {

    artefato(): string {    
        return "encaminhamento";
    }

    imprimir(codigo) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/pdf; charset=utf-8');
        return this.http.get(`${HOST_CEFIT}/api/`+this.artefato()+`/imprimir/`+codigo, {headers:headers, responseType: 'blob'});
    }

}