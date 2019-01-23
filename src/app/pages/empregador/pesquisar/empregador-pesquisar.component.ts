import { Component, OnInit } from '@angular/core';
import { Empregador } from '../../../model/empregador/empregador';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpregadorService } from '../../../services/empregador/empregador.service';
import { MatDialog } from '@angular/material';
import { DialogService } from '../../../dialog-service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { CadastroUnico } from 'src/app/model/cadastro-unico/cadastro-unico';
import { PessoaJuridica } from 'src/app/model/cadastro-unico/pessoa-juridica';

@Component({
  selector: 'app-empregador-pesquisar',
  templateUrl: './empregador-pesquisar.component.html',
  styleUrls: ['./empregador-pesquisar.component.css']
})
export class EmpregadorPesquisarComponent extends AptareCrudController<Empregador, {new(): Empregador}>{

  constructor(router: Router, 
              route: ActivatedRoute,             
              service: EmpregadorService,
              dialog: MatDialog,
              dialogService: DialogService,
              mensagem: MensagemService) {
    super(router, route, dialogService, dialog, Empregador, service, mensagem);   
  }

  iniciarPaginaPesquisar() {
    this.objetoPesquisa.cadastroUnico = new CadastroUnico();
    this.objetoPesquisa.cadastroUnico.pessoaJuridica = new PessoaJuridica();
  }

  inativarEmpregador(codigo) {
    let empregador: Empregador = new Empregador();
    empregador.codigo = codigo;

    this.inativar(empregador);
  }

  statusInativar(obj: Empregador) {
    this.listaResultado.forEach(function (value) {
      if(value.codigo == obj.codigo) {
        value.flagAtivo = 'N';
      }
    });
  }

  editar(id:string){    
    this.router.navigate(['/empregador-atualizar',id]);
  }

}
