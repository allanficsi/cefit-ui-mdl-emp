import { element } from 'protractor';
import { Component, OnInit, Inject } from '@angular/core';
import { GenericLov } from '../../../model/lov/generic-lov';
import { AptareRestEntidade } from '../../../model/aptare-rest-entidade';
import { VariaveisLovService } from '../../../services/variaveis-lov.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FiltroPesquisa } from '../../../model/lov/filtro-pesquisa';
import { LovService } from '../../../services/shared/lov.service';
import { ResponseApi } from '../../../model/response-api';
import { MensagemService } from '../../../services/shared/mensagem.service';

@Component({
  selector: 'app-lov-modal',
  templateUrl: './lov-modal.component.html',
  styleUrls: ['./lov-modal.component.css']
})
export class LovModalComponent implements OnInit {

  aptareRestEntidade = new AptareRestEntidade('',null,null,null,'');
  genericLov = new GenericLov('','',null,null,null,null,'',null,'');

  listaFiltros: FiltroPesquisa[];  
  listaColunas: string[];
  listaResult = [];

  constructor(private dialogRef: MatDialogRef<LovModalComponent>,
              private mensagem: MensagemService,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private lovService: LovService) { }

  ngOnInit() {
    if(this.data.service != undefined){
      this.genericLov = VariaveisLovService.getInstance().getLista(this.data.service);
      this.listaFiltros = this.genericLov.filtrosPesquisa;
      
      //LISTAR COLUNAS DA LOV
      this.listaColunas = [];
      this.genericLov.resultados.forEach(element => {
        this.listaColunas.push(element.alias);
      });

      //PREENCHER AO ABRIR      
      if(this.genericLov.povoar == 'S') {        
        this.pesquisar();
      }
    }
  }

  pesquisar() {

    //ENTIDADE
    this.aptareRestEntidade.name = this.genericLov.identificador;

    //FILTROS
    if(this.listaFiltros.length > 0) {
      let strFilter = "{";
      let count = 0;

      this.listaFiltros.forEach(element => {
        count = count+1;
      
        if(element.valor != null && element.valor != '') {
          strFilter = strFilter + element.nome;
          strFilter = strFilter + "=";
          strFilter = strFilter + element.valor;

          if(count != this.listaFiltros.length) {
            strFilter = strFilter + ",";
          } else {
            strFilter = strFilter + "}";
          }
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

    this.lovService.buscar(this.aptareRestEntidade)
    .subscribe((responseApi:ResponseApi) => {
      let lista = responseApi['data'];      
      
      let listaFinal = [];
      for (let i = 0; i < lista.length; i++) {
        
        let listaItens = [];

        for (let j = 0; j < this.genericLov.resultados.length; j++) {       
          let campo = eval('lista['+i+'].'+this.genericLov.resultados[j].nome);
          
          listaItens.push(campo);
        }

        listaFinal.push(listaItens);
      }
      
      this.listaResult = listaFinal;           
    } , err => {
      //ERRO NA COMUNICACAO COM O BACKEND
      this.mensagem.tratarErro(err);
      //console.log("Ocorreu um erro ao tentar acessar o servidor.");
    });
  }

  setarResultado(item) {
    this.dialogRef.close(item);
  }

  closeModal() {
    this.dialogRef.close();
  }

}
