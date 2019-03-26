import { Component, OnInit, Input, forwardRef, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CadastroUnico } from '../../../model/cadastro-unico/cadastro-unico';
import { CadastroUnicoService } from 'src/app/services/cadastro-unico/cadastro-unico.service';
import { ResponseApi } from '../../../model/response-api';
import { DialogService } from 'src/app/services/shared/dialog.service';
import { MensagemService } from 'src/app/services/shared/mensagem.service';
import { EventEmitter } from '@angular/core';
import { PessoaFisica } from 'src/app/model/cadastro-unico/pessoa-fisica';
import { Auditoria } from 'src/app/model/auditoria';

const noop = () => {
};

export const CPF_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AptCpfComponent),
  multi: true
};

@Component({
  selector: 'apt-cpf',
  templateUrl: './apt-cpf.component.html',
  styleUrls: ['./apt-cpf.component.css'],
  providers: [ CPF_CONTROL_VALUE_ACCESSOR ]
})
export class AptCpfComponent implements ControlValueAccessor, OnInit {

  @Input() isReadOnly;
  @Output() cadastroUnicoChange = new EventEmitter();

  cpf: string;

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;


  constructor(private cadastroUnicoService: CadastroUnicoService,
              private mensagemService: MensagemService,
              private dialogService: DialogService) { }

    ngOnInit() {
    }
  
    validarCpf() {

      if (this.cpfValor == null || this.cpfValor == '') {
        this.cadastroUnicoChange.emit(this.getInstanceCadastroUnico());
        return;
      }

      let reg1 = /\./gi;
      let reg2 = /\-/gi;
      let str1 = this.cpfValor.replace(reg1,"");
      let cpf = str1.replace(reg2, "");
  
      if (cpf.length != 11) { 
        this.dialogService.openAlertDialog('Este CPF é inválido, favor informar um CPF válido.');
        this.cpfValor = '';
        this.cadastroUnicoChange.emit(this.getInstanceCadastroUnico());
        return;
      }
  
      if ((cpf == '00000000000') || (cpf == '11111111111') || (cpf == '22222222222') || (cpf == '33333333333') || (cpf == '44444444444') || (cpf == '55555555555') || (cpf == '66666666666') || (cpf == '77777777777') || (cpf == '88888888888') || (cpf == '99999999999')) {
        this.dialogService.openAlertDialog('Este CPF é inválido, favor informar um CPF válido.');
        this.cpfValor = '';
        this.cadastroUnicoChange.emit(this.getInstanceCadastroUnico());
        return;
      }
  
      let numero: number = 0;
      let caracter: string = '';
      let numeros: string = '0123456789';
      let j: number = 10;
      let somatorio: number = 0;
      let resto: number = 0;
      let digito1: number = 0;
      let digito2: number = 0;
      let cpfAux: string = '';
      cpfAux = cpf.substring(0, 9);
      for (let i: number = 0; i < 9; i++) {
          caracter = cpfAux.charAt(i);
          if (numeros.search(caracter) == -1) {
              return false;
          }
          numero = Number(caracter);
          somatorio = somatorio + (numero * j);
          j--;
      }
      resto = somatorio % 11;
      digito1 = 11 - resto;
      if (digito1 > 9) {
          digito1 = 0;
      }
      j = 11;
      somatorio = 0;
      cpfAux = cpfAux + digito1;
      for (let i: number = 0; i < 10; i++) {
          caracter = cpfAux.charAt(i);
          numero = Number(caracter);
          somatorio = somatorio + (numero * j);
          j--;
      }
      resto = somatorio % 11;
      digito2 = 11 - resto;
      if (digito2 > 9) {
          digito2 = 0;
      }
      cpfAux = cpfAux + digito2;
      if (cpf != cpfAux) {
        this.cpfValor = '';
        this.cadastroUnicoChange.emit(this.getInstanceCadastroUnico());
        this.dialogService.openAlertDialog('Este CPF é inválido, favor informar um CPF válido.');
        return;
      }
    }
  
    get cpfValor(): any {
      return this.cpf;
    };
  
    set cpfValor(v: any) {
        if (v !== this.cpf) {
            this.cpf = v;
            this.onChangeCallback(v);
        }
    }

    getInstanceCadastroUnico(): CadastroUnico {
      
      let cadastroUnico: CadastroUnico = new CadastroUnico();
      
      cadastroUnico = new CadastroUnico();
      cadastroUnico.tipoPessoa = 'F';

      cadastroUnico.pessoaFisica = new PessoaFisica();
      cadastroUnico.pessoaFisica.ufOrgaoEmissorRg = 'AC';
      cadastroUnico.pessoaFisica.sexo = 'M';
      cadastroUnico.pessoaFisica.estadoCivil = 1; 

      return cadastroUnico;
    }

    getCadastroUnico() {
      if(this.cpfValor != null
          && this.cpfValor != '') {

        // Busca CUN
        let cadastroUnico: CadastroUnico = new CadastroUnico();
        cadastroUnico.cpfCnpj = this.cpfValor;

        this.cadastroUnicoService.get(cadastroUnico).subscribe((responseApi:ResponseApi) => {
          
          let obj: CadastroUnico = responseApi["data"];

          if(obj !== null) {
            obj.pessoaFisica.dataNascimento = new Date(obj.pessoaFisica.dataNascimento);
            obj.pessoaFisica.dataEmissaoRg = new Date(obj.pessoaFisica.dataEmissaoRg);
  
            this.cadastroUnicoChange.emit(obj)
          } else {
            obj = this.getInstanceCadastroUnico();
            obj.cpf = this.cpfValor;
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
      if (value !== this.cpf) {
        this.cpfValor = value;
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
