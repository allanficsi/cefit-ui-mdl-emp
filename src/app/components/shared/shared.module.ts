import { AptSoNumeroDirective } from './../../diretivas/sonumero/apt-so-numero.directive';
import { ValidaCpfDirective } from './../../diretivas/validaCpf/apt-valida-cpf.directive';
import { AptValidaCnpjDirective } from './../../diretivas/validaCnpj/apt-valida-cnpj.directive';
import { NgModule } from '@angular/core';

import { DialogService } from './../../dialog-service';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

//SHARED COMPONENTS
import { HomeComponent } from '../../pages/home/home.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';

//SERVICES
import { LovService } from '../../services/shared/lov.service';
import { MensagemService } from '../../services/shared/mensagem.service';
import { AptareCrudService } from '../../services/shared/aptare-crud.service';
import { EmpregadorService } from '../../services/empregador/empregador.service';


import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../security/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotfoundComponent } from './notfound/notfound.component';
import { LovComponent } from './lov/lov.component';
import { VariaveisLovService } from '../../services/variaveis-lov.service';

import {NgxMaskModule} from 'ngx-mask'

import { LovModalComponent } from './lov-modal/lov-modal.component';
import { MatDialogModule, MatButtonModule, MatIconModule, MatMenuModule, MatCardModule, MatNativeDateModule, MatToolbarModule, MatDatepickerModule, MAT_DATE_LOCALE } from '@angular/material';

import { ToastrModule } from 'ngx-toastr';
import { EmpregadorPesquisarComponent } from '../../pages/empregador/pesquisar/empregador-pesquisar.component';
import { EmpregadorAtualizarComponent } from '../../pages/empregador/atualizar/empregador-atualizar.component';
import { DominioService } from '../../services/geral/dominio.service';
import { CorreioService } from '../../services/correio/correio.service';
import { CargoService } from '../../services/cadastro-unico/cargo.service';
import { CnaeService } from 'src/app/services/empregador/cnae.service';
import { ModalTelefoneComponent } from '../../pages/geral/modal-telefone/modal-telefone.component';
import { CargoPesquisarComponent } from 'src/app/pages/cargo/pesquisar/cargo-pesquisar.component';
import { CargoAtualizarComponent } from 'src/app/pages/cargo/atualizar/cargo-atualizar.component';
import { ModalCargoComponent } from 'src/app/pages/geral/modal-cargo/modal-cargo.component';


@NgModule({
    exports: [
      FooterComponent,
      MenuComponent,
      HeaderComponent,
      CommonModule
    ],
    imports: [
        RouterModule,
        FormsModule,
        HttpClientModule,
        CommonModule,
        MatDialogModule,
        MatToolbarModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,        
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ToastrModule.forRoot(),
        NgxMaskModule.forRoot()
    ],
    declarations: [
        FooterComponent,
        MenuComponent,
        HeaderComponent,
        HomeComponent,
        NotfoundComponent,
        LovComponent,
        LovModalComponent,
        AptSoNumeroDirective,
        ValidaCpfDirective,
        AptValidaCnpjDirective,

        EmpregadorPesquisarComponent,
        EmpregadorAtualizarComponent,

        CargoPesquisarComponent,
        CargoAtualizarComponent,

        ModalTelefoneComponent,
        ModalCargoComponent,
    ],
    providers: [
      LovService,
      MensagemService,
      AptareCrudService,
      DialogService,
      VariaveisLovService,
      CorreioService,

      DominioService,
      EmpregadorService,
      CargoService,
      CnaeService,
      
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }, 
      {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}
      
    ]
})
export class SharedModule { }
