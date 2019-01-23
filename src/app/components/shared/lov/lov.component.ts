import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ViewChild, ElementRef, AfterViewInit, OnDestroy, AfterViewChecked, OnChanges, AfterContentChecked, Renderer } from '@angular/core';
import { VariaveisLovService } from '../../../services/variaveis-lov.service';
import { AptareRestEntidade } from '../../../model/aptare-rest-entidade';
import { GenericLov } from '../../../model/lov/generic-lov';
import { LovService } from '../../../services/shared/lov.service';
import { ResponseApi } from '../../../model/response-api';
import { MatDialog } from "@angular/material";
import { LovModalComponent } from '../lov-modal/lov-modal.component';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MensagemService } from '../../../services/shared/mensagem.service';


const noop = () => {
};

export const LOV_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => LovComponent),
  multi: true
};

@Component({
  selector: 'app-lov',
  templateUrl: './lov.component.html',
  styleUrls: ['./lov.component.css'],
  providers: [ LOV_CONTROL_VALUE_ACCESSOR ]
})
export class LovComponent implements ControlValueAccessor, OnInit {
  
  @Input() visualizar;
  @Input() service;
  @Input() idCodigo;
  @Input() idResult;

  @ViewChild('codigo') inputCodigo: ElementRef

  //VARIAVEL REFERENTE AO VALOR FINAL DO COMPONENTE
  private innerValue: any = '';

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
 
  aptareRestEntidade = new AptareRestEntidade('',null,null,null,'');
  genericLov = new GenericLov('','',null,null,null,null,'',null,'');
  
  codigo: string;
  resultado: string;

  constructor(private lovService: LovService,
              private mensagem: MensagemService,
              private renderer:Renderer,
              private dialog: MatDialog) {}

  ngOnInit() {    
    this.genericLov = VariaveisLovService.getInstance().getLista(this.service);       
  }


  /**
   *  Metodo de buscar
   */
  buscar() {

    if(this.codigo == null || this.codigo.length <= 0)
    {
      this.limparLov();
      return;
    }

    //ENTIDADE
    this.aptareRestEntidade.name = this.genericLov.identificador;
    
    //FILTRO DA LOV
    if(this.genericLov.filtrosBusca.length > 0) {
      let strFilter = "{";
      let count = 0; 

      this.genericLov.filtrosBusca.forEach(element => {
        count = count+1;

        if(element.campoOrigem == this.idCodigo) {
          //FILTRO DO CAMPO CODIGO DA LOV
          strFilter = strFilter + element.nome + ":" + this.codigo;
        } else {
          //OUTROS FILTROS DA TELA
          let id = element.campoOrigem;
          strFilter = strFilter + element.nome + ":" + (<HTMLInputElement>document.getElementById(id)).value;
        } 
        
        if(count != this.genericLov.filtrosBusca.length) {
          strFilter = strFilter + ",";
        } else {
          strFilter = strFilter + "}";
        }
      });

      this.aptareRestEntidade.filterJson = strFilter;
    }

    //ORDENACOES
    if(this.genericLov.ordenacoes.length > 0) {
      let ordenacoes = [];
      
      this.genericLov.ordenacoes.forEach(element => {
        ordenacoes.push(element.nome);
      });

      this.aptareRestEntidade.order = ordenacoes;
    }

    //RESULTADOS
    if(this.genericLov.resultados.length > 0) {
      let resultados = []

      this.genericLov.resultados.forEach(element => {
        resultados.push(element.nome);
      });

      this.aptareRestEntidade.selectedFields = resultados;
    }

    //console.log(this.aptareRestEntidade); 
    this.lovService.buscar(this.aptareRestEntidade)
    .subscribe((responseApi:ResponseApi) => {
      let lista = responseApi['data'];
      
      //SETAR CAMPOS
      if(lista.length > 0) {        
        this.genericLov.resultados.forEach(element => {
          if(element.campoDestino == this.idCodigo) {
            let id = 'lista[0].' + element.nome;            
            this.codigo = eval(id);            
          } else {
            if(element.campoDestino == this.idResult) {              
              let id = 'lista[0].' + element.nome;
              this.resultado = eval(id);
              (<HTMLInputElement>document.getElementById("resultado")).focus();
            } else {
              if(element.tipo != 'exibicao') {           
                let id = 'lista[0].' + element.nome;
                let destino = element.campoDestino;
                (<HTMLInputElement>document.getElementById(destino)).value = eval(id);
              }
            }
          }
        });
      } else {
        this.limparLov();
      }

    } , err => {
      //ERRO NA COMUNICACAO COM O BACKEND
      //console.log(this.mensagem);
      this.mensagem.tratarErro(err);
      //console.log("Ocorreu um erro ao tentar acessar o servidor.");
    });

  }

  /**
   * Metodo para abrir o modal da lov
   */
  public abrirModal() {
    this.limparLov();

    let dialogRef = this.dialog.open(LovModalComponent, {height: '580px', width: '850px', data: {service: this.service}});
    
    dialogRef.afterClosed().subscribe(
      data => {
        if(data != null) {
          for (let i = 0; i < this.genericLov.resultados.length; i++) {
    
            if(this.genericLov.resultados[i].campoDestino == this.idCodigo) {            
              this.codigo = data[i];          
            } else {
              if(this.genericLov.resultados[i].campoDestino == this.idResult) { 
                this.resultado = data[i];
                (<HTMLInputElement>document.getElementById("resultado")).focus();
              } else {
                if(this.genericLov.resultados[i].tipo != 'exibicao') {                           
                  let destino = this.genericLov.resultados[i].campoDestino;
                  (<HTMLInputElement>document.getElementById(destino)).value = data[i];
                }
              }
            }
          }
        }
      }
    ); 
    

  }

  /**
   * Metodo para limpar a lov
   */
  limparLov() {
    this.codigo = null;
    this.resultado = null;

    this.genericLov.resultados.forEach(element => {
      if(element.campoDestino != this.idCodigo
            && element.campoDestino != this.idResult) {

          if(element.campoDestino != null) {
            let destino = element.campoDestino;                                      
              (<HTMLInputElement>document.getElementById(destino)).value = null;            
          }
      }
    });   
  }

  get codigoValor(): any {
    return this.codigo;
  };

  set codigoValor(v: any) {
      if (v !== this.codigo) {
          this.codigo = v;
          this.onChangeCallback(v);
      }
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.codigo) {
        this.codigo = value;
    }
        
    this.buscar();  
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

}