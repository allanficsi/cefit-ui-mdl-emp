import { Component, Inject, OnInit } from '@angular/core';
import { AptareCrudController } from '../../../components/shared/crud/aptare-crud-controller';
import { TrabalhadorAgenda } from '../../../model/trabalhador/trabalhador-agenda';
import { ActivatedRoute, Router } from '@angular/router';
import { ContatoService } from '../../../services/cadastro-unico/contato.service';
import { CargoService }  from '../../../services/cadastro-unico/cargo.service';
import { DominioService } from '../../../services/geral/dominio.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { DialogService } from '../../../services/shared/dialog.service';
import { Contato } from '../../../model/cadastro-unico/contato';
import { AgendaTrabalhadorService } from '../../../services/trabalhador/agenda-trabalhador.service';
import { Cargo } from '../../../model/cadastro-unico/cargo';
import { ResponseApi } from '../../../model/response-api';
import { Trabalhador } from '../../../model/trabalhador/trabalhador';
import { TrabalhadorService } from '../../../services/trabalhador/trabalhador.service';
import { UtilService} from '../../../services/util.service';
import { Empregador } from '../../../model/empregador/empregador';
import { EmpregadorService } from '../../../services/empregador/empregador.service';
import { ModalEmpregadorComponent } from '../modal-empregador/modal-empregador.component';
import { TrabalhadorDeficiencia } from '../../../model/trabalhador/trabalhador-deficiencia';
import { Dominio } from '../../../model/geral/dominio';
import { TrabalhadorRejeicao } from '../../../model/trabalhador/trabalhadorRejeicao';
import { Auditoria } from '../../../model/auditoria';

@Component({
  selector: 'app-modal-editar-agenda',
  templateUrl: './modal-empregador-rejeicao.component.html',
  styleUrls: ['./modal-empregador-rejeicao.component.css']
})
export class ModalEmpregadorRejeicaoComponent extends AptareCrudController<Trabalhador, {new():Trabalhador}> {


  trabalahdor:Trabalhador;
  empregador: Empregador;
  trabalhadorRejeicao:TrabalhadorRejeicao;
  filtroEmpregador: string;
  listaEmpregador = [];
  listaMotivoRejeicao = [];
  listaOrigemRejeicao = [];
  listaTrabalhadorRejeicao = [];

  constructor(router: Router,
              route: ActivatedRoute,
              public service: TrabalhadorService,
              private trabalhadorService: TrabalhadorService,
              private dominioService: DominioService,
              private empregadorService:EmpregadorService,
              dialog: MatDialog,
              public dialogRef: MatDialogRef<ModalEmpregadorRejeicaoComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              mensagem: MensagemService,
              dialogService: DialogService) {
    super(router, route, dialog, Trabalhador, service, mensagem, dialogService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.setListasStaticas();
    this.carregarTrabalhador();

  }

  protected iniciarPaginaInserir() {
   this.trabalhadorRejeicao =  new TrabalhadorRejeicao();
   this.trabalahdor = null;
   this.trabalhadorRejeicao.codigoMotivoRejeicao = null;
   this.trabalhadorRejeicao.tipoOrigemRejeicao = null;
  }

  setListasStaticas() {
    this.popularMotivoRejeicao();
    this.popularOrigemRejeicao()
  }

  popularMotivoRejeicao() {
    let dominio: Dominio = new Dominio();
    dominio.nomeCampo = 'CD_MTV_RJC';

    this.dominioService.pesquisar(dominio)
      .subscribe((responseApi:ResponseApi) => {
        this.listaMotivoRejeicao = responseApi['data'];
      } , err => {
        this.mensagem.tratarErro(err);
      });
  }

  popularOrigemRejeicao() {
    let dominio: Dominio = new Dominio();
    dominio.nomeCampo = 'TP_ORG_RJC';

    this.dominioService.pesquisar(dominio)
      .subscribe((responseApi:ResponseApi) => {
        this.listaOrigemRejeicao = responseApi['data'];
      } , err => {
        this.mensagem.tratarErro(err);
      });
  }

  pesquisarEmpregador() {
    if(this.filtroEmpregador != null && this.filtroEmpregador.length >= 3) {
      let empregador = new Empregador();
      empregador.situacao = EmpregadorService.SITUACAO_ATIVA;
      empregador.filtroGenerico = this.filtroEmpregador;

      this.empregadorService.pesquisar(empregador)
        .subscribe((responseApi:ResponseApi) => {
          this.listaEmpregador = responseApi['data'];

          if(this.listaEmpregador.length > 1) {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.width = '900px';
            dialogConfig.height = '450px';
            dialogConfig.data = {listaResultado: this.listaEmpregador};

            this.dialog.open(ModalEmpregadorComponent, dialogConfig)
              .afterClosed().subscribe((data) => {
              this.empregador = data;
            });
          } else {
            this.empregador = this.listaEmpregador[0];
          }
        } , err => {
          this.mensagem.tratarErro(err);
        });
    } else {
      this.mensagem.tratarErroPersonalizado("","Informe pelo menos 3 caracteres para selecionar o empregador.");
    }
  }

  adicionarRejeicao() {
    if(this.validarAdicionarRejeicao()){

    let rejeicao: TrabalhadorRejeicao = new TrabalhadorRejeicao();

     rejeicao.codigoTrabalhador = this.data;
     rejeicao.codigoEmpregador = this.empregador.codigo;
     rejeicao.motivoRejeicao = this.trabalhadorRejeicao.motivoRejeicao;
     rejeicao.flagAtivo = 'S';
     rejeicao.tipoOrigemRejeicao = this.trabalhadorRejeicao.tipoOrigemRejeicao;
     rejeicao.codigoMotivoRejeicao = this.trabalhadorRejeicao.codigoMotivoRejeicao;
     rejeicao.empregador = null;


    this.listaTrabalhadorRejeicao.push(rejeicao);
    this.limparCampos();
    }
  }


  validarAdicionarRejeicao(){
    if(this.empregador == null ) {
      this.mensagem.tratarErroPersonalizado(""," O campo Empregador é obrigatório.");
      return false;
    }

    if(this.trabalhadorRejeicao.codigoMotivoRejeicao == null ) {
      this.mensagem.tratarErroPersonalizado("","Selecione o Motivo da Rejeição.");
      return false;
    }

    if(this.trabalhadorRejeicao.tipoOrigemRejeicao == null ) {
      this.mensagem.tratarErroPersonalizado("","Selecione a Origem da Rejeição.");
      return false;
    }


    return true;
  }

  Salvar() {
      this.dialogService.openConfirmDialog("Deseja realizar essa Operação ?")
        .afterClosed().subscribe(res =>{
          if(res){
            this.completarInserir();
            this.service.adicionarRetiraRejeicao(this.objetoAtualiza)
              .subscribe((responseApi: ResponseApi) => {
                this.fechar();
                this.mensagem.msgSucesso('Operação realizada com sucesso');
              }, err => {
                this.mensagem.tratarErro(err);
              });
          }
      } );
  }

  validarInserirAlterar() {

    if( typeof this.listaTrabalhadorRejeicao == null || this.listaTrabalhadorRejeicao.length <= 0 ) {
      this.mensagem.tratarErroPersonalizado("","Adicione pelo menos uma Rejeição.");
      return false;
    }
    // //VALIDA SE DURANTE O ALTERAR/INSERIR A LISTA DE REIJEIÇOES TEM ALGUEM flagAtivo 'S'
    // if (this.listaTrabalhadorRejeicao != null && this.listaTrabalhadorRejeicao.length > 0) {
    //   let restricaoAtivo = false;
    //
    //   this.listaTrabalhadorRejeicao.forEach(element => {
    //     if(element.flagAtivo == 'S'){
    //       restricaoAtivo = true;//POSSUI UM REST
    //       return ;
    //     }
    //   });
    //
    //   if(restricaoAtivo){
    //     return true;
    //   }
    //
    //   this.mensagem.tratarErroPersonalizado("", "Adicione pelo menos uma Rejeição.");
    //   return false;
    // }

    return true;
  }
  completarInserir(){
    this.listaTrabalhadorRejeicao.forEach(element => {
      if(element.codigo == null){
        element.codigoUsuarioInclusao = this.getCodigoUsuarioLogado();
        element.dataInclusao = new Date();
      }
    });

    this.objetoAtualiza.listaTrabalhadorRejeicao = [];

    this.listaTrabalhadorRejeicao.forEach(element => {
      this.objetoAtualiza.listaTrabalhadorRejeicao.push(element);
    });

  }

  private carregarTrabalhador() {
      let trabalhador = new Trabalhador();

      trabalhador.codigo = this.data;

      this.service.get(trabalhador).subscribe((responseApi:ResponseApi) => {

      this.objetoAtualiza = responseApi['data'];

      //POPULANDO LISTA DE REJEIÇÕES CASO EXISTA
        if(typeof this.objetoAtualiza.listaTrabalhadorRejeicao !== 'undefined') {
          for(let i = 0; i < this.objetoAtualiza.listaTrabalhadorRejeicao.length; i++) {
            this.listaTrabalhadorRejeicao.push(this.objetoAtualiza.listaTrabalhadorRejeicao[i]);
          }
        }

      },
     err => this.mensagem.tratarErro(err));
  }

  excluirRejeicao(index) {
    this.dialogService.openConfirmDialog('Deseja remover essa Rejeição')
      .afterClosed().subscribe(res => {
      if (this.listaTrabalhadorRejeicao[index].codigo != null && typeof this.listaTrabalhadorRejeicao[index].codigo !== 'undefined') {
        this.listaTrabalhadorRejeicao[index].flagAtivo = 'N';
        this.listaTrabalhadorRejeicao[index].codigoUsuarioAlteracao = this.getCodigoUsuarioLogado();
        this.listaTrabalhadorRejeicao[index].dataAlteracao = new Date();
      } else {
        this.listaTrabalhadorRejeicao.splice(index, 1);
      }

    });
  }

  fechar() {
    this.dialogRef.close();
  }
   limparCampos() {
    this.iniciarPaginaInserir();
  }
}
