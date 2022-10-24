import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss']
})
export class AgendamentoComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toast: HotToastService,
  ) { }

  agendamentoForm = this.fb.group(
    {
      data: ['', [Validators.required]],
      contato: ['', [Validators.required]],
    }
  );

  onSubmit() {
    this.toast.observe({
      success: 'Conta criada com sucesso, seja bem-vindo(a)',
      error: 'Um erro ocorreu',
      loading: 'Criando usuário...',
    })
  }

  ngOnInit(): void {
  }

}
