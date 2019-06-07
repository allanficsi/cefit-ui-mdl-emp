import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CadastroUnico } from 'src/app/model/cadastro-unico/cadastro-unico';
import { Parametro } from 'src/app/model/geral/parametro';
import { Cbo } from 'src/app/model/trabalhador/cbo';
import { VagaAgendamento } from 'src/app/model/vaga/vaga-agendamento';
import { VagaDia } from 'src/app/model/vaga/vaga-dia';
import { CboService } from 'src/app/services/trabalhador/cbo.service';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { Auditoria } from '../../../model/auditoria';
import { Empregador } from '../../../model/empregador/empregador';
import { ResponseApi } from '../../../model/response-api';
import { Trabalhador } from '../../../model/trabalhador/trabalhador';
import { Vaga } from '../../../model/vaga/vaga';
import { EmpregadorService } from '../../../services/empregador/empregador.service';
import { ParametroService } from '../../../services/geral/parametro.service';
import { DialogService } from '../../../services/shared/dialog.service';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { TrabalhadorService } from '../../../services/trabalhador/trabalhador.service';
import { VagaService } from '../../../services/vaga/vaga.service';
import { ModalEmpregadorComponent } from '../../geral/modal-empregador/modal-empregador.component';


@Component({
  selector: 'app-vaga-visualizar',
  templateUrl: './vaga-visualizar.component.html',
  styleUrls: ['./vaga-visualizar.component.css']
})
export class VagaVisualizarComponent extends AptareCrudController<Vaga, {new(): Vaga}>{ 

  trabalhador: Trabalhador;
  empregador: Empregador;
  cbo: Cbo;
  listaTrabalhador = [];
  listaEmpregador = [];
  listaCbo = [];
  listaVagaAgendamento = [];
  listaDirecionamento = [];

  constructor(router: Router,
              route: ActivatedRoute,  
              dialog: MatDialog,                   
              service: VagaService,
              mensagem: MensagemService,
              private trabalhadorService: TrabalhadorService,
              private empregadorService: EmpregadorService,
              private cboService: CboService,
              private parametroService: ParametroService,
              dialogService: DialogService) {
    super(router, route, dialog, Vaga, service, mensagem, dialogService);
  }

  iniciarPaginaAlterar() {
    this.cbo = new Cbo();
    let vaga: Vaga = new Vaga();
    vaga.codigo = +this.codigo;

    // GET VAGA COM O CODIGO
    this.service.get(vaga).subscribe((responseApi:ResponseApi) => {      
      this.objetoAtualiza = responseApi.data;
console.log(this.objetoAtualiza);
      this.objetoAtualiza.dataInicio = new Date(this.objetoAtualiza.dataInicio);

      if(this.objetoAtualiza.dataLimite != null) {
        this.objetoAtualiza.dataLimite = new Date(this.objetoAtualiza.dataLimite);
      } else {
        this.objetoAtualiza.dataLimite = null;
      }

      if(this.objetoAtualiza.dataFim != null) {
        this.objetoAtualiza.dataFim = new Date(this.objetoAtualiza.dataFim);
      } else {
        this.objetoAtualiza.dataFim = null;
      }
      
      // Nominal
      if(this.objetoAtualiza.tipoDescricaoVaga == 'N') {
        this.trabalhador = this.objetoAtualiza.trabalhadorEntity;
      }
      
      // Freguesia
      if(this.objetoAtualiza.tipoDescricaoVaga == 'F') {
        this.objetoAtualiza.listaVagaDia.forEach(elementVagaDia => {
          this.listaDia.forEach(elementDia => {
            if(elementVagaDia.codigoDia == elementDia.valor) {
              elementDia.fgSelecionada = true;
            }
          });
        });
      }

      this.cbo = this.objetoAtualiza.cboEntity;
      this.empregador = this.objetoAtualiza.empregadorEntity;
      this.listaVagaAgendamento = this.objetoAtualiza.listaVagaAgendamentoOrdenada;

      this.carregarVagaAgendamento();
    } , err => {
      this.mensagem.tratarErro(err);  
    });
  }

  setListasStaticas() {
    super.setListasStaticas();

    this.popularDirecionamento();
    this.popularTrabalhador();
    this.popularCbo();
  }

  carregarVagaAgendamento() {
    if(this.listaVagaAgendamento != null && typeof this.listaVagaAgendamento !== 'undefined') {
      for (let i = 0; i < this.listaVagaAgendamento.length; i++) {
        for (let j = 0; j < this.listaDia.length; j++) {
          if(this.listaVagaAgendamento[i].numeroDia == this.listaDia[j].valor) {
            this.listaVagaAgendamento[i].nomeDia = this.listaDia[j].nome;
          }
        }
      }
    }
  }

  popularCbo() {
    let cbo = new Cbo();

    this.cboService.pesquisar(cbo)
                .subscribe((responseApi:ResponseApi) => {
      this.listaCbo = responseApi['data'];
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  popularDirecionamento() {
    this.listaDirecionamento = [
      { nome:"ATENDIMENTO", valor : 1},
      { nome:"CONVOCAÇÃO NÃO VISÍVEL AO ATENDIMENTO", valor : 2},
      { nome:"INDIFERENTE", valor : 3}
    ]
  }
  popularTrabalhador() {
    let trabalhador: Trabalhador = new Trabalhador();
    trabalhador.situacao = TrabalhadorService.SITUACAO_ATIVA;

    this.trabalhadorService.pesquisar(trabalhador)
                .subscribe((responseApi:ResponseApi) => {
      this.listaTrabalhador = responseApi['data'];
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  voltar() {
    this.back('vaga-pesquisar');
  }

  completarPosInserir() {
    this.router.navigate(['vaga-pesquisar']);
  }

  completarPosAlterar() {
    this.router.navigate(['vaga-pesquisar']);
  }

}
