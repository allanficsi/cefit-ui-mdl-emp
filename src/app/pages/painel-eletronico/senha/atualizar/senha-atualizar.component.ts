import { Component, OnInit } from '@angular/core';
import { SenhaService } from '../../../../services/painel-eletronico/senha.service';
import { Senha } from '../../../../model/painel-eletronico/senha';
import { ResponseApi } from '../../../../model/response-api';
import { MensagemService } from '../../../../services/shared/mensagem.service';
import { TipoSenhaService } from '../../../../services/painel-eletronico/tipo-senha.service';
import { TipoSenha } from '../../../../model/painel-eletronico/tipo-senha';


@Component({
  selector: 'app-senha-atualizar',
  templateUrl: './senha-atualizar.component.html',
  styleUrls: ['./senha-atualizar.component.css']
})
export class SenhaAtualizarComponent implements OnInit{ 

  listaTipoSenha = [];

  constructor(private tipoSenhaService: TipoSenhaService,
              private senhaService: SenhaService,
              private mensagem: MensagemService,) {
  }

  ngOnInit() {
    let tipoSenha: TipoSenha = new TipoSenha();
    tipoSenha.flagAtivo = "S";

    this.tipoSenhaService.pesquisar(tipoSenha)
                .subscribe((responseApi:ResponseApi) => {
      this.listaTipoSenha = responseApi['data'];
    } , err => {
      this.mensagem.tratarErro(err);
    });
  }

  gerar(codigo) {
    
      let senha: Senha = new Senha();
      senha.codigoTipoSenha = codigo;
      senha.data = new Date();
      senha.flagAtivo = true;

      this.senhaService.inserir(senha)
                  .subscribe((responseApi:ResponseApi) => {
          
      } , err => {
        this.mensagem.tratarErro(err);
      });
  
  }

}
