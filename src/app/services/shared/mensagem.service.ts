import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class MensagemService {

    constructor(private toastr: ToastrService) { }

    tratarErro(err) {
        if(err.status != 401) {
            if(err['error']['errors'] != null) {      
                this.toastr.error(err['error']['errors'][0], '');
            } else {
                this.toastr.error('Ocorreu um erro insesperado em nosso servidor, favor tentar novamente.', 'Oops!');
            }
        }
    }

    tratarErroPersonalizado(title, msg) {
        this.toastr.error(msg, title);
    } 

    msgSucesso(msg) {
        this.toastr.success(msg);
    }

}