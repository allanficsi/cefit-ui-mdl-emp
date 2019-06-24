import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './components/shared/notfound/notfound.component';
import { CONTENT_ROUTES } from './components/shared/shared.routes';
import { TemplateComponent } from './components/shared/template/template.component';
import { LoginComponent } from './pages/login/login.component';
import { SenhaAtualizarComponent } from './pages/painel-eletronico/senha/atualizar/senha-atualizar.component';
import { PainelVisualizarComponent } from './pages/painel-eletronico/painel/visualizar/painel-visualizar.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';

const appRoutes : Routes = [


  { path : 'login', component: LoginComponent },
  { path : 'cadastrar', component: CadastroComponent},
  { path : 'senha', component: SenhaAtualizarComponent },
  { path : 'painel', component: PainelVisualizarComponent },
    
  { path: '', component: TemplateComponent, data: { title: 'full Views' }, children: CONTENT_ROUTES },
  { path : '**', component: NotfoundComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
