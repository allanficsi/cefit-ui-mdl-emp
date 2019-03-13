import { Routes } from '@angular/router';
import { CargoAtualizarComponent } from '../../pages/cargo/atualizar/cargo-atualizar.component';
import { CargoPesquisarComponent } from '../../pages/cargo/pesquisar/cargo-pesquisar.component';
import { EmpregadorAtualizarComponent } from '../../pages/empregador/atualizar/empregador-atualizar.component';
import { EmpregadorPesquisarComponent } from '../../pages/empregador/pesquisar/empregador-pesquisar.component';
import { EspacoAtualizarComponent } from '../../pages/espaco/atualizar/espaco-atualizar.component';
import { EspacoPesquisarComponent } from '../../pages/espaco/pesquisar/espaco-pesquisar.component';
import { ModalCargoComponent } from '../../pages/geral/modal-cargo/modal-cargo.component';
import { ModalEditarContatoComponent } from '../../pages/geral/modal-editar-contato/modal-editar-contato.component';
import { ModalEditarItemEspacoComponent } from '../../pages/geral/modal-editar-item-espaco/modal-editar-item-espaco.component';
import { ModalItemEspacoComponent } from '../../pages/geral/modal-item-espaco/modal-item-espaco.component';
import { ModalItemManutencaoComponent } from '../../pages/geral/modal-item-manutencao/modal-item-manutencao.component';
import { ModalQualificacaoComponent } from '../../pages/geral/modal-qualificacao/modal-qualificacao.component';
import { ModalTelefoneComponent } from '../../pages/geral/modal-telefone/modal-telefone.component';
import { HomeComponent } from '../../pages/home/home.component';
import { ItemEspacoAtualizarComponent } from '../../pages/item-espaco/atualizar/item-espaco-atualizar.component';
import { ItemEspacoPesquisarComponent } from '../../pages/item-espaco/pesquisar/item-espaco-pesquisar.component';
import { ProfissionalAtualizarComponent } from '../../pages/profissional/atualizar/profissional-atualizar.component';
import { ProfissionalPesquisarComponent } from '../../pages/profissional/pesquisar/profissional-pesquisar.component';
import { QualificacaoAtualizarComponent } from '../../pages/qualificacao/atualizar/qualificacao-atualizar.component';
import { QualificacaoPesquisarComponent } from '../../pages/qualificacao/pesquisar/qualificacao-pesquisar.component';
import { TrabalhadorAtualizarComponent } from '../../pages/trabalhador/atualizar/trabalhador-atualizar.component';
import { TrabalhadorPesquisarComponent } from '../../pages/trabalhador/pesquisar/trabalhador-pesquisar.component';
import { AuthGuard } from '../security/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { LovModalComponent } from './lov-modal/lov-modal.component';
import { LocalAtualizarComponent } from '../../pages/local/atualizar/local-atualizar.component';
import { LocalPesquisarComponent } from '../../pages/local/pesquisar/local-pesquisar.component';
import { ModalLocalComponent } from '../../pages/geral/modal-local/modal-local.component';
import { EspacoManutencaoComponent } from '../../pages/espaco/manutencao/espaco-manutencao.component';
import { TipoAcaoPesquisarComponent } from '../../pages/tipo-acao/pesquisar/tipo-acao-pesquisar.component';
import { TipoAcaoAtualizarComponent } from '../../pages/tipo-acao/atualizar/tipo-acao-atualizar.component';
import { AcaoPesquisarComponent } from '../../pages/acao/pesquisar/acao-pesquisar.component';
import { AcaoAtualizarComponent } from '../../pages/acao/atualizar/acao-atualizar.component';
import { ModalTipoAcaoComponent } from '../../pages/geral/modal-tipo-acao/modal-tipo-acao.component';


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

    { path : 'local-pesquisar', component: LocalPesquisarComponent, canActivate: [AuthGuard] },
    { path : 'local-atualizar', component: LocalAtualizarComponent, canActivate: [AuthGuard] },
    { path : 'local-atualizar/:id', component: LocalAtualizarComponent, canActivate: [AuthGuard] },

    { path : 'item-espaco-pesquisar', component: ItemEspacoPesquisarComponent, canActivate: [AuthGuard] },
    { path : 'item-espaco-atualizar', component: ItemEspacoAtualizarComponent, canActivate: [AuthGuard] },
    { path : 'item-espaco-atualizar/:id', component: ItemEspacoAtualizarComponent, canActivate: [AuthGuard] },

    { path : 'espaco-pesquisar', component: EspacoPesquisarComponent, canActivate: [AuthGuard] },
    { path : 'espaco-atualizar', component: EspacoAtualizarComponent, canActivate: [AuthGuard] },
    { path : 'espaco-atualizar/:id', component: EspacoAtualizarComponent, canActivate: [AuthGuard] },
    { path : 'espaco-manutencao', component: EspacoManutencaoComponent, canActivate: [AuthGuard] },

    { path : 'acao-pesquisar', component: AcaoPesquisarComponent, canActivate: [AuthGuard] },
    { path : 'acao-atualizar', component: AcaoAtualizarComponent, canActivate: [AuthGuard] },
    { path : 'acao-atualizar/:id', component: AcaoAtualizarComponent, canActivate: [AuthGuard] },

    { path : 'qualificacao-pesquisar', component: QualificacaoPesquisarComponent, canActivate: [AuthGuard] },
    { path : 'qualificacao-atualizar', component: QualificacaoAtualizarComponent, canActivate: [AuthGuard] },
    { path : 'qualificacao-atualizar/:id', component: QualificacaoAtualizarComponent, canActivate: [AuthGuard] },

    { path : 'tipo-acao-pesquisar', component: TipoAcaoPesquisarComponent, canActivate: [AuthGuard] },
    { path : 'tipo-acao-atualizar', component: TipoAcaoAtualizarComponent, canActivate: [AuthGuard] },
    { path : 'tipo-acao-atualizar/:id', component: TipoAcaoAtualizarComponent, canActivate: [AuthGuard] },

    { path : 'modal-telefone', component: ModalTelefoneComponent, canActivate: [AuthGuard] },
    { path : 'modal-cargo', component: ModalCargoComponent, canActivate: [AuthGuard] },
    { path : 'modal-qualificacao', component: ModalQualificacaoComponent, canActivate: [AuthGuard] },
    { path : 'modal-editar-contato', component: ModalEditarContatoComponent, canActivate: [AuthGuard] },
    { path : 'modal-item-espaco', component: ModalItemEspacoComponent, canActivate: [AuthGuard] },
    { path : 'modal-editar-item-espaco', component: ModalEditarItemEspacoComponent, canActivate: [AuthGuard] },
    { path : 'modal-manutencao-item', component: ModalItemManutencaoComponent, canActivate: [AuthGuard] },
    { path : 'modal-local-item', component: ModalLocalComponent, canActivate: [AuthGuard] },
    { path : 'modal-tipo-acao-item', component: ModalTipoAcaoComponent, canActivate: [AuthGuard] },

    { path : 'layout-pesquisar', component: LayoutComponent, canActivate: [AuthGuard] },


]
