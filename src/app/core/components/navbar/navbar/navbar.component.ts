import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  constructor(
    private authService: AuthService,
    private toast: HotToastService
    ) { }

  logout() {
    this.authService.logout('/login').pipe(this.toast.observe({
      success: 'Logout feito com sucesso.',
      error: 'Um erro ocorreu, tente novamente',
      loading: 'Logout sendo feito, aguarde...'
    })).subscribe();
  }

  ngOnInit(): void {
  }

}
