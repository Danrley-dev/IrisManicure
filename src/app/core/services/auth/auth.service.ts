import { Injectable } from '@angular/core';
import { Auth} from '@angular/fire/auth';
import { doc, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { collection, setDoc } from 'firebase/firestore';
import { from, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuarios = collection(this.db, 'usuarios');

  constructor(
    private auth: Auth,
    private db: Firestore,
    private router: Router
  ) { }

  loginGoogle() {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider())).pipe(
      tap((creds) => {
        const user = creds.user;
        const userDoc = doc(this.usuarios, user.uid);
        setDoc(userDoc, {
          uid: user.uid,
          email: user.email,
          nome: user.displayName,
          nick: 'Um usuário do Google',
          photoURL: user.photoURL
        });
        this.router.navigate(['/']);
      })
    );
  }

  logout(rota: '/login' | '/confirmar-email') {
    return from(this.auth.signOut()).pipe(
      tap(() => {
        this.router.navigate([rota]);
      })
    );
  }

  emailVerificacao(user: any) {
    if (!user.emailVerified) {
      sendEmailVerification(user);
      this.logout('/confirmar-email').subscribe();
    } else {
      this.router.navigate(['/']);
    }
  }

  loginEmail(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      tap((creds) => {
        this.emailVerificacao(creds.user);
      })
    );
  }

  signupEmail(email: string, password: string, nome: string) {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      tap((creds) => {
        const user = creds.user;
        const userDoc = doc(this.usuarios, user.uid);
        setDoc(userDoc, {
          uid: user.uid,
          email: email,
          nome: nome
        });
        this.emailVerificacao(creds.user);
      })
    );
  }
}
