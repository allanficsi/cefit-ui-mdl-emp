import { AptSoNumeroDirective } from './../../diretivas/sonumero/apt-so-numero.directive';
import { ValidaCpfDirective } from './../../diretivas/validaCpf/apt-valida-cpf.directive';
import { AptValidaCnpjDirective } from './../../diretivas/validaCnpj/apt-valida-cnpj.directive';
import { NgModule } from '@angular/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';

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
import { MatDialogModule, MatButtonModule, MatIconModule, MatMenuModule, MatCardModule, MatNativeDateModule, MatToolbarModule, MatDatepickerModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter, MatAutocompleteModule, MatFormFieldModule } from '@angular/material';

import { ToastrModule } from 'ngx-toastr';
import { EmpregadorPesquisarComponent } from '../../pages/empregador/pesquisar/empregador-pesquisar.component';
import { EmpregadorAtualizarComponent } from '../../pages/empregador/atualizar/empregador-atualizar.component';
import { DominioService } from '../../services/geral/dominio.service';
import { CorreioService } from '../../services/correio/correio.service';
import { CargoService } from '../../services/cadastro-unico/cargo.service';
import { CnaeService } from 'src/app/services/empregador/cnae.service';
import { ModalTelefoneComponent } from '../../pages/geral/modal-telefone/modal-telefone.component';
import { CargoPesquisarComponent } from '../../pages/cargo/pesquisar/cargo-pesquisar.component';
import { CargoAtualizarComponent } from '../../pages/cargo/atualizar/cargo-atualizar.component';
import { ModalCargoComponent } from '../../pages/geral/modal-cargo/modal-cargo.component';
import { TrabalhadorPesquisarComponent } from '../../pages/trabalhador/pesquisar/trabalhador-pesquisar.component';
import { TrabalhadorService } from '../../services/trabalhador/trabalhador.service';
import { TrabalhadorAtualizarComponent } from '../../pages/trabalhador/atualizar/trabalhador-atualizar.component';
import { CboService } from '../../services/trabalhador/cbo.service';
import { QualificacaoPesquisarComponent } from '../../pages/qualificacao/pesquisar/qualificacao-pesquisar.component';
import { QualificacaoService } from '../../services/profissional/qualificacao.service';
import { QualificacaoAtualizarComponent } from '../../pages/qualificacao/atualizar/qualificacao-atualizar.component';
import { ProfissionalPesquisarComponent } from '../../pages/profissional/pesquisar/profissional-pesquisar.component';
import { ProfissionalService } from '../../services/profissional/profissional.service';
import { ProfissionalAtualizarComponent } from '../../pages/profissional/atualizar/profissional-atualizar.component';
import { ModalQualificacaoComponent } from '../../pages/geral/modal-qualificacao/modal-qualificacao.component';
import { ModalEditarContatoComponent } from '../../pages/geral/modal-editar-contato/modal-editar-contato.component';
import { ContatoService } from '../../services/cadastro-unico/contato.service';
import { DateFormat } from './util/date-format';


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
        MatAutocompleteModule,
        MatFormFieldModule,  
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

        TrabalhadorPesquisarComponent,
        TrabalhadorAtualizarComponent,

        ProfissionalPesquisarComponent,
        ProfissionalAtualizarComponent,

        CargoPesquisarComponent,
        CargoAtualizarComponent,

        QualificacaoPesquisarComponent,
        QualificacaoAtualizarComponent,

        ModalTelefoneComponent,
        ModalCargoComponent,
        ModalQualificacaoComponent,
        ModalEditarContatoComponent,
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
      TrabalhadorService,
      ProfissionalService,
      CargoService,
      QualificacaoService,
      CnaeService,
      CboService,
      ContatoService,
      
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }, 
      { provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
      { provide: DateAdapter, useClass: DateFormat },
      
    ]
})
export class SharedModule { }