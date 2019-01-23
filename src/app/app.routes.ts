import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './components/security/auth.guard';
import { TemplateComponent } from './components/shared/template/template.component';
import { CONTENT_ROUTES } from './components/shared/shared.routes';
import { NotfoundComponent } from './components/shared/notfound/notfound.component';

const appRoutes : Routes = [


    { path : 'login', component: LoginComponent },
    { path: '', component: TemplateComponent, data: { title: 'full Views' }, children: CONTENT_ROUTES },
    { path : '**', component: NotfoundComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
