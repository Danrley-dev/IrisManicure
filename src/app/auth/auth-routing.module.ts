import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendamentoComponent } from './components/agendamento/agendamento.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { LoginComponent } from './components/login/login.component';
import { RecuperarSenhaComponent } from './components/recuperar-senha/recuperar-senha.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'recuperarSenha', component: RecuperarSenhaComponent },
  { path: 'agendamento', component: AgendamentoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
