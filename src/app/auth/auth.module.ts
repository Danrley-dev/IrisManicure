import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { RecuperarSenhaComponent } from './components/recuperar-senha/recuperar-senha.component';
import { AgendamentoComponent } from './components/agendamento/agendamento.component';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    LoginComponent,
    CadastroComponent,
    RecuperarSenhaComponent,
    AgendamentoComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxMaskModule.forRoot()
  ]
})
export class AuthModule { }
