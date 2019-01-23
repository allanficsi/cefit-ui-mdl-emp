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


export const CONTENT_ROUTES: Routes = [

    { path : '', component: HomeComponent, canActivate: [AuthGuard] },
    { path : 'lov-modal', component: LovModalComponent, canActivate: [AuthGuard] },

    { path : 'empregador-pesquisar', component: EmpregadorPesquisarComponent, canActivate: [AuthGuard] },
    { path : 'empregador-atualizar', component: EmpregadorAtualizarComponent, canActivate: [AuthGuard] },
    { path : 'empregador-atualizar/:id', component: EmpregadorAtualizarComponent, canActivate: [AuthGuard] },

    { path : 'cargo-pesquisar', component: CargoPesquisarComponent, canActivate: [AuthGuard] },
    { path : 'cargo-atualizar', component: CargoAtualizarComponent, canActivate: [AuthGuard] },
    { path : 'cargo-atualizar/:id', component: CargoAtualizarComponent, canActivate: [AuthGuard] },

    { path : 'modal-telefone', component: ModalTelefoneComponent, canActivate: [AuthGuard] },
    { path : 'modal-cargo', component: ModalCargoComponent, canActivate: [AuthGuard] },


]
