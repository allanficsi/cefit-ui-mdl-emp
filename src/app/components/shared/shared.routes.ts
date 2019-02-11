import { Routes } from '@angular/router';
import { HomeComponent } from '../../pages/home/home.component';
import { AuthGuard } from '../security/auth.guard';
import { LovModalComponent } from './lov-modal/lov-modal.component';
import { EmpregadorAtualizarComponent } from '../../pages/empregador/atualizar/empregador-atualizar.component';
import { EmpregadorPesquisarComponent } from '../../pages/empregador/pesquisar/empregador-pesquisar.component';
import { ModalTelefoneComponent } from '../../pages/geral/modal-telefone/modal-telefone.component';
import { CargoPesquisarComponent } from '../../pages/cargo/pesquisar/cargo-pesquisar.component';
import { CargoAtualizarComponent } from '../../pages/cargo/atualizar/cargo-atualizar.component';
import { ModalCargoComponent } from '../../pages/geral/modal-cargo/modal-cargo.component';
import { TrabalhadorPesquisarComponent } from '../../pages/trabalhador/pesquisar/trabalhador-pesquisar.component';
import { TrabalhadorAtualizarComponent } from '../../pages/trabalhador/atualizar/trabalhador-atualizar.component';
import { QualificacaoPesquisarComponent } from '../../pages/qualificacao/pesquisar/qualificacao-pesquisar.component';
import { QualificacaoAtualizarComponent } from '../../pages/qualificacao/atualizar/qualificacao-atualizar.component';
import { ProfissionalPesquisarComponent } from '../../pages/profissional/pesquisar/profissional-pesquisar.component';
import { ProfissionalAtualizarComponent } from '../../pages/profissional/atualizar/profissional-atualizar.component';
import { ModalQualificacaoComponent } from '../../pages/geral/modal-qualificacao/modal-qualificacao.component';
import { ModalEditarContatoComponent } from '../../pages/geral/modal-editar-contato/modal-editar-contato.component';
import { ItemEspacoPesquisarComponent } from '../../pages/item-espaco/pesquisar/item-espaco-pesquisar.component';
import { ItemEspacoAtualizarComponent } from '../../pages/item-espaco/atualizar/item-espaco-atualizar.component';


export const CONTENT_ROUTES: Routes = [

    { path : '', component: HomeComponent, canActivate: [AuthGuard] },
    { path : 'lov-modal', component: LovModalComponent, canActivate: [AuthGuard] },

    { path : 'empregador-pesquisar', component: EmpregadorPesquisarComponent, canActivate: [AuthGuard] },
    { path : 'empregador-atualizar', component: EmpregadorAtualizarComponent, canActivate: [AuthGuard] },
    { path : 'empregador-atualizar/:id', component: EmpregadorAtualizarComponent, canActivate: [AuthGuard] },

    { path : 'trabalhador-pesquisar', component: TrabalhadorPesquisarComponent, canActivate: [AuthGuard] },
    { path : 'trabalhador-atualizar', component: TrabalhadorAtualizarComponent, canActivate: [AuthGuard] },
    { path : 'trabalhador-atualizar/:id', component: TrabalhadorAtualizarComponent, canActivate: [AuthGuard] },

    { path : 'profissional-pesquisar', component: ProfissionalPesquisarComponent, canActivate: [AuthGuard] },
    { path : 'profissional-atualizar', component: ProfissionalAtualizarComponent, canActivate: [AuthGuard] },
    { path : 'profissional-atualizar/:id', component: ProfissionalAtualizarComponent, canActivate: [AuthGuard] },

    { path : 'cargo-pesquisar', component: CargoPesquisarComponent, canActivate: [AuthGuard] },
    { path : 'cargo-atualizar', component: CargoAtualizarComponent, canActivate: [AuthGuard] },
    { path : 'cargo-atualizar/:id', component: CargoAtualizarComponent, canActivate: [AuthGuard] },

    { path : 'item-espaco-pesquisar', component: ItemEspacoPesquisarComponent, canActivate: [AuthGuard] },
    { path : 'item-espaco-atualizar', component: ItemEspacoAtualizarComponent, canActivate: [AuthGuard] },
    { path : 'item-espaco-atualizar/:id', component: ItemEspacoAtualizarComponent, canActivate: [AuthGuard] },

    { path : 'qualificacao-pesquisar', component: QualificacaoPesquisarComponent, canActivate: [AuthGuard] },
    { path : 'qualificacao-atualizar', component: QualificacaoAtualizarComponent, canActivate: [AuthGuard] },
    { path : 'qualificacao-atualizar/:id', component: QualificacaoAtualizarComponent, canActivate: [AuthGuard] },

    { path : 'modal-telefone', component: ModalTelefoneComponent, canActivate: [AuthGuard] },
    { path : 'modal-cargo', component: ModalCargoComponent, canActivate: [AuthGuard] },
    { path : 'modal-qualificacao', component: ModalQualificacaoComponent, canActivate: [AuthGuard] },
    { path : 'modal-editar-contato', component: ModalEditarContatoComponent, canActivate: [AuthGuard] },


]
