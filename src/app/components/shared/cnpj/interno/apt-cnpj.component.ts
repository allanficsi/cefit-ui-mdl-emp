import { Component, OnInit, Input, forwardRef, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CadastroUnico } from '../../../../model/cadastro-unico/cadastro-unico';
import { CadastroUnicoService } from 'src/app/services/cadastro-unico/cadastro-unico.service';
import { ResponseApi } from '../../../../model/response-api';
import { DialogService } from 'src/app/services/shared/dialog.service';
import { MensagemService } from 'src/app/services/shared/mensagem.service';
import { EventEmitter } from '@angular/core';
import { PessoaFisica } from 'src/app/model/cadastro-unico/pessoa-fisica';
import { Auditoria } from 'src/app/model/auditoria';
import { PessoaJuridica } from 'src/app/model/cadastro-unico/pessoa-juridica';

const noop = () => {
};

export const CNPJ_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AptCnpjComponent),
  multi: true
};

@Component({
  selector: 'apt-cnpj',
  templateUrl: './apt-cnpj.component.html',
  styleUrls: ['./apt-cnpj.component.css'],
  providers: [ CNPJ_CONTROL_VALUE_ACCESSOR ]
})
export class AptCnpjComponent implements ControlValueAccessor, OnInit {

  @Input() isReadOnly;
  @Output() cadastroUnicoChange = new EventEmitter();

  cnpj: string;

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;


  constructor(private cadastroUnicoService: CadastroUnicoService,
              private mensagemService: MensagemService,
              private dialogService: DialogService) { }

    ngOnInit() {
    }
  
    validarCnpj() {

      if (this.cnpjValor == null || this.cnpjValor == '') {
        this.cadastroUnicoChange.emit(this.getInstanceCadastroUnico());
        return;
      }

      let reg1 = /\./gi;
      let reg2 = /\-/gi;
      let reg3 = /\//gi;
      let str1 = this.cnpjValor.replace(reg1,"");
      let str2 = str1.replace(reg2, "");
      let cnpj = str2.replace(reg3, "");

      let numeros; 
      let digitos; 
      let soma;
      let i;
      let resultado;
      let pos;
      let tamanho;
      let digitos_iguais;

      digitos_iguais = 1;

      if (cnpj.length < 14 && cnpj.length < 15){
        this.dialogService.openAlertDialog('Este CNPJ é inválido, favor informar um CNPJ válido.');
        this.cnpjValor = '';
        this.cadastroUnicoChange.emit(this.getInstanceCadastroUnico());  
        return;
      }
        
    for (i = 0; i < cnpj.length - 1; i++)
        if (cnpj.charAt(i) != cnpj.charAt(i + 1))
    {
        digitos_iguais = 0;
        break;
    }
    if (!digitos_iguais)
    {
        tamanho = cnpj.length - 2
        numeros = cnpj.substring(0,tamanho);
        digitos = cnpj.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--)
        {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

        if (resultado != digitos.charAt(0)) {
          this.dialogService.openAlertDialog('Este CNPJ é inválido, favor informar um CNPJ válido.');
          this.cnpjValor = '';
          this.cadastroUnicoChange.emit(this.getInstanceCadastroUnico());  
          return;
        }
          
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0,tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--)
        {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1)){
          this.dialogService.openAlertDialog('Este CNPJ é inválido, favor informar um CNPJ válido.');
          this.cnpjValor = '';
          this.cadastroUnicoChange.emit(this.getInstanceCadastroUnico()); 
          return;
        }

        console.log(this.cnpjValor);

    }
    else
    {      
      alert("CNPJ Inválido");
      this.cnpjValor = '';   
      return;
    }

    }
  
    get cnpjValor(): any {
      return this.cnpj;
    };
  
    set cnpjValor(v: any) {
        if (v !== this.cnpj) {
            this.cnpj = v;
            this.onChangeCallback(v);
        }
    }

    getInstanceCadastroUnico(): CadastroUnico {
      
      let cadastroUnico: CadastroUnico = new CadastroUnico();
      
      cadastroUnico = new CadastroUnico();
      cadastroUnico.tipoPessoa = 'J';

      cadastroUnico.pessoaJuridica = new PessoaJuridica();

      return cadastroUnico;
    }

    getCadastroUnico() {

      if(this.cnpjValor != null
          && this.cnpjValor != '') {

        // Busca CUN
        let cadastroUnico: CadastroUnico = new CadastroUnico();
        cadastroUnico.cpfCnpj = this.cnpjValor;

        this.cadastroUnicoService.get(cadastroUnico).subscribe((responseApi:ResponseApi) => {
          
          let obj: CadastroUnico = responseApi["data"];

          console.log(obj);

          if(obj !== null) {
            this.cadastroUnicoChange.emit(obj)
          } else {
            obj = this.getInstanceCadastroUnico();
            obj.cnpj = this.cnpjValor;
            this.cadastroUnicoChange.emit(obj);
          }

        } , err => {

          this.cadastroUnicoChange.emit(this.getInstanceCadastroUnico());

        });
      } else {

        this.cadastroUnicoChange.emit(this.getInstanceCadastroUnico());

      }
    }
  
    openPopupMsg(msg) {
      this.dialogService.openAlertDialog(msg)
      .afterClosed().subscribe(res =>{
        if(res){
          // Clique do OK
  
        }
      });
    }
  
    //From ControlValueAccessor interface
    writeValue(value: any) {
      if (value !== this.cnpj) {
        this.cnpjValor = value;
        //console.log(this.cpfValor);
      }
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
