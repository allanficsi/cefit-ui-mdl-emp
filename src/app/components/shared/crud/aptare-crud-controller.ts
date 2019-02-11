import { UtilService } from './../../../services/util.service';
import { AptareCrudService } from './../../../services/shared/aptare-crud.service';
import { OnInit, AfterViewInit, AfterContentInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ResponseApi } from '../../../model/response-api';
import { MensagemService } from '../../../services/shared/mensagem.service';
import { DialogService } from '../../../dialog-service';
import { MatDialog } from '@angular/material';

export class AptareCrudController<Entity, 
                                  CT extends { new(itemEntity?: any): Entity },> 
                                  implements OnInit {

  listaResultado: Entity[];
  objetoAtualiza: Entity;
  objetoPesquisa: Entity; 
  
  classCss : {};

  codigo: string;

  util: UtilService;

  listaUf = [];

  constructor(public router: Router, 
              public route: ActivatedRoute,          
              public dialogService: DialogService,
              public dialog: MatDialog,
              public typeEntity: CT, 
              public service: AptareCrudService<Entity>,
              public mensagem: MensagemService) {}

  ngOnInit(): void {
    this.util = UtilService.getInstance();
    this.objetoAtualiza = this.getNewEntityInstance();
    this.objetoPesquisa = this.getNewEntityInstance();    
    this.listaResultado = null;
    
    this.setListasStaticas();

    this.codigo = this.route.snapshot.params['id'];

    if(this.codigo == undefined) {
       this.iniciarPaginaInserir();
       this.iniciarPaginaPesquisar();
    } else {
       this.iniciarPaginaAlterar();
    }
  }

  pesquisar() {    
    if(!this.validaPesquisar()){
      this.listaResultado = [];
      return;
    }
    
    this.completarPesquisar();
    this.service.pesquisar(this.objetoPesquisa)
                          .subscribe((responseApi:ResponseApi) => {
      this.listaResultado = responseApi['data'];
      
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  get(obj) {
    this.service.get(obj).subscribe((responseApi:ResponseApi) => {        
      responseApi.data = this.executarPosGet(responseApi.data);
      this.objetoAtualiza = responseApi.data;
    } , err => {
      this.mensagem.tratarErro(err);  
    });

  }

  completarPesquisar() {}

  inserir() {    
    if(this.validarInserir()) {
      this.completarInserir();
      console.log(this.objetoAtualiza);
      this.service.inserir(this.objetoAtualiza).subscribe((responseApi:ResponseApi) => {
        //RETORNO DO OBJETO PERSISTIDO
        let objeto : Entity = responseApi.data;
        this.objetoAtualiza = objeto;
        this.completarPosInserir();
        this.mensagem.msgSucesso('O registro foi inserido com sucesso.');
        
        // this.spinnerService.hide();
      } , err => {
        this.mensagem.tratarErro(err);
      });
    }
  }

  validarInserir():boolean{ return true }
  completarInserir() {}
  completarPosInserir() {}

  alterar() {
    if(this.validarAlterar()) {
      this.completarAlterar();
      this.service.alterar(this.objetoAtualiza).subscribe((responseApi:ResponseApi) => {
        //RETORNO DO OBJETO PERSISTIDO
        let objeto : Entity = responseApi.data;
              
        this.completarPosAlterar();
        this.mensagem.msgSucesso('O registro foi alterado com sucesso.');
        
        // this.spinnerService.hide();
      } , err => {
        this.mensagem.tratarErro(err);
      });
    }
  } 

  validarAlterar():boolean{ return true }
  completarAlterar() {}
  completarPosAlterar() {}

  inativar(obj: Entity){
    this.dialogService.confirm('Tem certeza que deseja inativar este registro?')
      .then((candelete:boolean) => {
          if(candelete){
            this.service.inativar(obj).subscribe((responseApi:ResponseApi) => {
                this.mensagem.msgSucesso('O registro foi inativado com sucesso.');
                this.statusInativar(obj);
            } , err => {
              this.mensagem.tratarErro(err);
            });
          }
      });
  }

  ativar(obj: Entity){
    this.dialogService.confirm('Tem certeza que deseja ativar este registro?')
      .then((candelete:boolean) => {
          if(candelete){
            this.service.ativar(obj).subscribe((responseApi:ResponseApi) => {
                this.mensagem.msgSucesso('O registro foi ativado com sucesso.');
                this.statusAtivar(obj);
            } , err => {
              this.mensagem.tratarErro(err);
            });
          }
      });
  }

  getNewEntityInstance(itemEntity?: any): Entity {    
    return new this.typeEntity(itemEntity);
  }

  abrirModal(component, config) {
    this.dialog.open(component, config);
  }

  id<T>(x: T) { return x; }

  logout() {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

  protected executarPosGet(obj){ return obj }
  protected setListaPesquisar(){}
  protected iniciarPaginaInserir() {}  
  protected iniciarPaginaPesquisar() {}  
  protected iniciarPaginaAlterar() {}  
  protected statusInativar(obj: Entity) {}
  protected statusAtivar(obj: Entity) {}
  protected validaPesquisar(): boolean{ return true }

  getCodigoUsuarioLogado()
  {
    return this.getUsuarioLogado().codigo;
  }

  getUsuarioLogado()
  {
    return JSON.parse(localStorage.getItem("usuario"));
  }

  setListasStaticas() {
    if(this.listaUf.length == 0) {
      this.listaUf.push({nome:"AC", valor:"AC"});
      this.listaUf.push({nome:"AL", valor:"AL"});
      this.listaUf.push({nome:"AP", valor:"AP"});
      this.listaUf.push({nome:"AM", valor:"AM"});
      this.listaUf.push({nome:"BA", valor:"BA"});
      this.listaUf.push({nome:"CE", valor:"CE"});
      this.listaUf.push({nome:"DF", valor:"DF"});
      this.listaUf.push({nome:"ES", valor:"ES"});
      this.listaUf.push({nome:"GO", valor:"GO"});
      this.listaUf.push({nome:"MA", valor:"MA"});
      this.listaUf.push({nome:"MT", valor:"MT"});
      this.listaUf.push({nome:"MS", valor:"MS"});
      this.listaUf.push({nome:"MG", valor:"MG"});
      this.listaUf.push({nome:"PA", valor:"PA"});
      this.listaUf.push({nome:"PB", valor:"PB"});
      this.listaUf.push({nome:"PR", valor:"PR"});
      this.listaUf.push({nome:"PE", valor:"PE"});
      this.listaUf.push({nome:"PI", valor:"PI"});
      this.listaUf.push({nome:"RR", valor:"RR"});
      this.listaUf.push({nome:"RO", valor:"RO"});
      this.listaUf.push({nome:"RJ", valor:"RJ"});
      this.listaUf.push({nome:"RN", valor:"RN"});
      this.listaUf.push({nome:"RS", valor:"RS"});
      this.listaUf.push({nome:"SC", valor:"SC"});
      this.listaUf.push({nome:"SP", valor:"SP"});
      this.listaUf.push({nome:"SE", valor:"SE"});
      this.listaUf.push({nome:"TO", valor:"TO"});

    }
  }

}