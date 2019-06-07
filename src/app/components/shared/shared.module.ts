import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, MatAutocompleteModule, MatButtonModule, MatCardModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatMenuModule, MatNativeDateModule, MatToolbarModule, MAT_DATE_LOCALE } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { AcaoGerenciarComponent } from "src/app/pages/acao/gerenciar/acao-gerenciar.component";
import { TipoSenhaAtualizarComponent } from "../..//pages/painel-eletronico/tipo-senha/atualizar/tipo-senha-atualizar.component";
import { AptValidaEmailDirective } from '../../diretivas/validaEmail/apt-valida-email.directive';
import { AcaoAtualizarComponent } from "../../pages/acao/atualizar/acao-atualizar.component";
import { AcaoPesquisarComponent } from "../../pages/acao/pesquisar/acao-pesquisar.component";
import { AcaoVisualizarComponent } from "../../pages/acao/visualizar/acao-visualizar.component";
import { CargoAtualizarComponent } from '../../pages/cargo/atualizar/cargo-atualizar.component';
import { CargoPesquisarComponent } from '../../pages/cargo/pesquisar/cargo-pesquisar.component';
import { EmpregadorAtualizarComponent } from '../../pages/empregador/atualizar/empregador-atualizar.component';
import { EmpregadorPesquisarComponent } from '../../pages/empregador/pesquisar/empregador-pesquisar.component';
import { EmpregadorVisualizarComponent } from "../../pages/empregador/visualizar/empregador-visualizar.component";
import { EspacoAtualizarComponent } from '../../pages/espaco/atualizar/espaco-atualizar.component';
import { EspacoManutencaoComponent } from "../../pages/espaco/manutencao/espaco-manutencao.component";
import { EspacoPesquisarComponent } from '../../pages/espaco/pesquisar/espaco-pesquisar.component';
import { EspacoVisualizarComponent } from '../../pages/espaco/visualizar/espaco-visualizar.component';
import { ModalCargoComponent } from '../../pages/geral/modal-cargo/modal-cargo.component';
import { ModalEditarAgendaComponent } from '../../pages/geral/modal-editar-agenda/modal-editar-agenda.component';
import { ModalEditarContatoComponent } from '../../pages/geral/modal-editar-contato/modal-editar-contato.component';
import { ModalEditarItemEspacoComponent } from '../../pages/geral/modal-editar-item-espaco/modal-editar-item-espaco.component';
import { ModalItemEspacoComponent } from '../../pages/geral/modal-item-espaco/modal-item-espaco.component';
import { ModalItemManutencaoComponent } from '../../pages/geral/modal-item-manutencao/modal-item-manutencao.component';
import { ModalLocalComponent } from "../../pages/geral/modal-local/modal-local.component";
import { ModalQualificacaoComponent } from '../../pages/geral/modal-qualificacao/modal-qualificacao.component';
import { ModalAtivarInativarTrabalhadorComponent } from '../../pages/geral/modal-situacao-trabalhador/modal-ativar-inativar-trabalhador.component';
import { ModalTelefoneComponent } from '../../pages/geral/modal-telefone/modal-telefone.component';
import { ModalTipoAcaoComponent } from "../../pages/geral/modal-tipo-acao/modal-tipo-acao.component";
import { ModalVagaFinalizarComponent } from "../../pages/geral/modal-vaga-finalizar/modal-vaga-finalizar.component";
import { HomeComponent } from '../../pages/home/home.component';
import { ItemEspacoAtualizarComponent } from '../../pages/item-espaco/atualizar/item-espaco-atualizar.component';
import { ItemEspacoPesquisarComponent } from '../../pages/item-espaco/pesquisar/item-espaco-pesquisar.component';
import { LocalAtualizarComponent } from "../../pages/local/atualizar/local-atualizar.component";
import { LocalPesquisarComponent } from "../../pages/local/pesquisar/local-pesquisar.component";
import { ChamadaAtualizarComponent } from "../../pages/painel-eletronico/chamada/atualizar/chamada-atualizar.component";
import { GuicheAtualizarComponent } from "../../pages/painel-eletronico/guiche/atualizar/guiche-atualizar.component";
import { GuichePesquisarComponent } from "../../pages/painel-eletronico/guiche/pesquisar/guiche-pesquisar.component";
import { TipoSenhaPesquisarComponent } from "../../pages/painel-eletronico/tipo-senha/pesquisar/tipo-senha-pesquisar.component";
import { ProfissionalAtualizarComponent } from '../../pages/profissional/atualizar/profissional-atualizar.component';
import { ProfissionalPesquisarComponent } from '../../pages/profissional/pesquisar/profissional-pesquisar.component';
import { ProfissionalVisualizarComponent } from "../../pages/profissional/visualizar/profissional-visualizar.component";
import { QualificacaoAtualizarComponent } from '../../pages/qualificacao/atualizar/qualificacao-atualizar.component';
import { QualificacaoPesquisarComponent } from '../../pages/qualificacao/pesquisar/qualificacao-pesquisar.component';
import { TipoAcaoAtualizarComponent } from "../../pages/tipo-acao/atualizar/tipo-acao-atualizar.component";
import { TipoAcaoPesquisarComponent } from "../../pages/tipo-acao/pesquisar/tipo-acao-pesquisar.component";
import { TrabalhadorAtualizarComponent } from '../../pages/trabalhador/atualizar/trabalhador-atualizar.component';
import { TrabalhadorGerenciarComponent } from '../../pages/trabalhador/gerenciar/trabalhador-gerenciar.component';
import { TrabalhadorPesquisarComponent } from '../../pages/trabalhador/pesquisar/trabalhador-pesquisar.component';
import { TrabalhadorVisualizarComponent } from '../../pages/trabalhador/visualizar/trabalhador-visualizar.component';
import { VagaAtualizarComponent } from "../../pages/vaga/atualizar/vaga-atualizar.component";
import { VagaGerenciarComponent } from "../../pages/vaga/gerenciar/vaga-gerenciar.component";
import { VagaPesquisarComponent } from "../../pages/vaga/pesquisar/vaga-pesquisar.component";
import { VagaVisualizarComponent } from "../../pages/vaga/visualizar/vaga-visualizar.component";
import { AcaoService } from "../../services/acao/acao.service";
import { TipoAcaoService } from "../../services/acao/tipo-acao.service";
import { CadastroUnicoService } from "../../services/cadastro-unico/cadastro-unico.service";
import { CargoService } from '../../services/cadastro-unico/cargo.service';
import { ContatoService } from '../../services/cadastro-unico/contato.service';
import { CorreioService } from '../../services/correio/correio.service';
import { CnaeService } from '../../services/empregador/cnae.service';
import { EmpregadorService } from '../../services/empregador/empregador.service';
import { EspacoItemEspacoService } from '../../services/espaco/espaco-item-espaco.service';
import { EspacoService } from '../../services/espaco/espaco.service';
import { ItemEspacoService } from '../../services/espaco/item-espaco.service';
import { LocalService } from '../../services/espaco/local.service';
import { DominioService } from '../../services/geral/dominio.service';
import { FeriadoService } from "../../services/geral/feriado.service";
import { ParametroService } from "../../services/geral/parametro.service";
import { ChamadaService } from "../../services/painel-eletronico/chamada.service";
import { GuicheService } from "../../services/painel-eletronico/guiche.service";
import { TipoSenhaService } from "../../services/painel-eletronico/tipo-senha.service";
import { ProfissionalService } from '../../services/profissional/profissional.service';
import { QualificacaoService } from '../../services/profissional/qualificacao.service';
import { AptareCrudService } from '../../services/shared/aptare-crud.service';
import { DialogService } from "../../services/shared/dialog.service";
import { LovService } from '../../services/shared/lov.service';
import { MensagemService } from '../../services/shared/mensagem.service';
import { AgendaTrabalhadorService } from '../../services/trabalhador/agenda-trabalhador.service';
import { CboService } from '../../services/trabalhador/cbo.service';
import { TrabalhadorService } from '../../services/trabalhador/trabalhador.service';
import { VagaService } from "../../services/vaga/vaga.service";
import { VariaveisLovService } from '../../services/variaveis-lov.service';
import { AuthInterceptor } from '../security/auth.interceptor';
import { AptSoNumeroDirective } from './../../diretivas/sonumero/apt-so-numero.directive';
import { AptValidaCnpjDirective } from './../../diretivas/validaCnpj/apt-valida-cnpj.directive';
import { ValidaCpfDirective } from './../../diretivas/validaCpf/apt-valida-cpf.directive';
import { AptCnpjComponent } from "./cnpj/apt-cnpj.component";
import { DialogComponent } from "./confirm-dialog/dialog.component";
import { AptCpfComponent } from "./cpf/apt-cpf.component";
import { AptEmailComponent } from "./email/apt-email.component";
import { ErrorMessageComponent } from './error-message/error-message.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { LovModalComponent } from './lov-modal/lov-modal.component';
import { LovComponent } from './lov/lov.component';
import { MenuComponent } from './menu/menu.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DateFormat } from './util/date-format';
import { ChamadaWebsocketService } from "src/app/services/painel-eletronico/websocket/chamada-websocket.service";

@NgModule({
    exports: [
      FooterComponent,
      MenuComponent,
      HeaderComponent,
      CommonModule
    ],
    imports: [
        RouterModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
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
        MyDateRangePickerModule,
        ToastrModule.forRoot(),
        NgbModule.forRoot(),
        CurrencyMaskModule,
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
        DialogComponent,
        AptSoNumeroDirective,
        ValidaCpfDirective,
        AptValidaCnpjDirective,
        AptValidaEmailDirective,
        AptCpfComponent,
        AptCnpjComponent,

        EmpregadorPesquisarComponent,
        EmpregadorAtualizarComponent,
        EmpregadorVisualizarComponent,

        TrabalhadorPesquisarComponent,
        TrabalhadorAtualizarComponent,
        TrabalhadorVisualizarComponent,
        TrabalhadorGerenciarComponent,

        ProfissionalPesquisarComponent,
        ProfissionalAtualizarComponent,
        ProfissionalVisualizarComponent,

        CargoPesquisarComponent,
        CargoAtualizarComponent,

        LocalPesquisarComponent,
        LocalAtualizarComponent,

        QualificacaoPesquisarComponent,
        QualificacaoAtualizarComponent,

        TipoAcaoPesquisarComponent,
        TipoAcaoAtualizarComponent,

        ItemEspacoAtualizarComponent,
        ItemEspacoPesquisarComponent,

        AcaoAtualizarComponent,
        AcaoPesquisarComponent,
        AcaoGerenciarComponent,
        AcaoVisualizarComponent,
        
        VagaPesquisarComponent,
        VagaAtualizarComponent,
        VagaVisualizarComponent,
        VagaGerenciarComponent,

        GuicheAtualizarComponent,
        GuichePesquisarComponent,

        TipoSenhaPesquisarComponent,
        TipoSenhaAtualizarComponent,

        ChamadaAtualizarComponent,

        EspacoAtualizarComponent,
        EspacoPesquisarComponent,
        EspacoManutencaoComponent,
        EspacoVisualizarComponent,

        ModalTelefoneComponent,
        ModalCargoComponent,
        ModalQualificacaoComponent,
        ModalEditarContatoComponent,
        ModalItemEspacoComponent,
        ModalEditarItemEspacoComponent,
        ModalItemManutencaoComponent,
        ModalLocalComponent,
        ModalTipoAcaoComponent,
        ModalEditarAgendaComponent,
        ModalVagaFinalizarComponent,
		ModalAtivarInativarTrabalhadorComponent,

        LayoutComponent,
        AptCpfComponent,
        AptCnpjComponent,
        AptEmailComponent,
        ErrorMessageComponent,
    ],
    providers: [
      LovService,
      MensagemService,
      AptareCrudService,
      DialogService,
      VariaveisLovService,
      CorreioService,
      DialogService,

      DominioService,
      EmpregadorService,
      TrabalhadorService,
      ProfissionalService,
      CargoService,
      LocalService,
      QualificacaoService,
      TipoAcaoService,
      CnaeService,
      CboService,
      ContatoService,
      ItemEspacoService,
      EspacoService,
      AcaoService,
      FeriadoService,
      ParametroService,
      CadastroUnicoService,
      EspacoItemEspacoService,
      VagaService,
      GuicheService,
      TipoSenhaService,
      ChamadaService,
      ChamadaWebsocketService,
      AgendaTrabalhadorService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }, 
      { provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
      { provide: DateAdapter, useClass: DateFormat },
      
    ],

    entryComponents: [ DialogComponent ],
})
export class SharedModule { }
