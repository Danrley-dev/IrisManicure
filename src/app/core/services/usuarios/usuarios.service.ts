import { Injectable } from '@angular/core';
import { collection, doc, docData, Firestore, fromRef, updateDoc } from '@angular/fire/firestore';
import { Observable, switchMap, of, from } from 'rxjs';
import { Perfil } from '../../models/perfilUsuario/perfilUsuario';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  perfis = collection(this.db, 'usuarios');

  constructor(
    private db: Firestore,
    private authService: AuthService
    ) { }

    get usuarioAtual$(): Observable<Perfil | null>{
      return this.authService.currentUser$.pipe(
        switchMap((user) => {
          if(!user?.uid){
            return of(null);
          }
          const ref = doc(this.db, 'usuarios', user?.uid);
          return docData(ref) as Observable<Perfil>;
        })
      )
    }

    atualizarUsuario(user: Perfil): Observable<void>{
      const ref = doc(this.db, 'usuarios', user.uid!);
      return from(updateDoc(ref, {...user}));
    }
}
