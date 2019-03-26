import { HttpClientModule } from '@angular/common/http';
import { forwardRef, NgModule } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { AuthGuard } from './components/security/auth.guard';
import { LovComponent } from './components/shared/lov/lov.component';
import { SharedModule } from './components/shared/shared.module';
import { TemplateComponent } from './components/shared/template/template.component';
import { LoginComponent } from './pages/login/login.component';
import { TokenService } from './services/token/token.service';
import { UsuarioService } from './services/usuario/usuario.service';
import { AptCpfComponent } from './components/shared/cpf/apt-cpf.component';
import { AptEmailComponent } from './components/shared/email/apt-email.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TemplateComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    AppRoutingModule,
    Ng4LoadingSpinnerModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [    
    TokenService,
    UsuarioService,
    AuthGuard,
    {provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LovComponent),
      multi: true},
    {provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AptCpfComponent),
      multi: true},
    {provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AptEmailComponent),
      multi: true}
          
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
