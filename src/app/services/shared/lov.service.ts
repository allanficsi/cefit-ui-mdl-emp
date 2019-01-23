import { HOST_CEFIT } from '../cefit.api';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AptareRestEntidade } from '../../model/aptare-rest-entidade';


@Injectable()
export class LovService {

    constructor(public http: HttpClient) { }

    buscar(aptareRestEntidade: AptareRestEntidade) {           
        return this.http.post(`${HOST_CEFIT}/api/crud/pesquisarGenerico`, aptareRestEntidade);
    }
    listar(aptareRestEntidade: AptareRestEntidade) {
        return this.http.post(`${HOST_CEFIT}/api/crud/pesquisarGenerico`, aptareRestEntidade);
    }

}