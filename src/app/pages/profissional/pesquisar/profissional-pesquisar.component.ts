import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Profissional } from 'src/app/model/profissional/profissional';
import { ProfissionalService } from 'src/app/services/profissional/profissional.service';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { DialogService } from '../../../dialog-service';
import { CadastroUnico } from '../../../model/cadastro-unico/cadastro-unico';
import { PessoaFisica } from '../../../model/cadastro-unico/pessoa-fisica';
import { DominioService } from '../../../services/geral/dominio.service';
import { MensagemService } from '../../../services/shared/mensagem.service';

@Component({
  selector: 'app-profissional-pesquisar',
  templateUrl: './profissional-pesquisar.component.html',
  styleUrls: ['./profissional-pesquisar.component.css']
})
export class ProfissionalPesquisarComponent extends AptareCrudController<Profissional, {new(): Profissional}>{

  listaSituacao = [];

  constructor(router: Router, 
              route: ActivatedRoute,             
              service: ProfissionalService,
              dialog: MatDialog,
              dialogService: DialogService,
              mensagem: MensagemService) {
    super(router, route, dialogService, dialog, Profissional, service, mensagem);   
  }

  iniciarPaginaPesquisar() {
    this.objetoPesquisa.cadastroUnico = new CadastroUnico();
    this.objetoPesquisa.cadastroUnico.pessoaFisica = new PessoaFisica();

    this.objetoPesquisa.cadastroUnico.tipoPessoa = 'F';
  }

  inativarProfissional(codigo) {
    let profissional: Profissional = new Profissional();
    profissional.codigo = codigo;

    this.inativar(profissional);
  }

  ativarProfissional(codigo) {
    let profissional: Profissional = new Profissional();
    profissional.codigo = codigo;

    this.ativar(profissional);
  }

  statusInativar(obj: Profissional) {
    this.listaResultado.forEach(function (value) {
      if(value.codigo == obj.codigo) {
        value.flagAtivo = 'N';
      }
    });
  }

  statusAtivar(obj: Profissional) {
    this.listaResultado.forEach(function (value) {
      if(value.codigo == obj.codigo) {
        value.flagAtivo = 'S';
      }
    });
  }

  editar(id:string){   
    this.router.navigate(['/profissional-atualizar',id]);
  }

}