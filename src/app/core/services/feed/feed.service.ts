import { Injectable } from '@angular/core';
import { collectionData, docData } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, Firestore, query, updateDoc, where } from 'firebase/firestore';
import { first, from, Observable, switchMap } from 'rxjs';
import { Feed, FeedConverter } from '../../models/feed/feed';
import { AuthService } from '../auth/auth.service';
import { UploadService } from '../upload/upload.service';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(
    private db: Firestore,
    private authService: AuthService,
    private uploadService: UploadService
  ) { }

  feed = collection(this.db, 'feed').withConverter(FeedConverter);

  getFeed(): Observable<Feed[]> {
    return collectionData(this.feed, { idField: 'id' });
  }

  getFeedUsuario(): Observable<Feed[]> {
    return this.authService.logged.pipe(
      first(),
      switchMap((user) => {
        return collectionData(
          query(this.feed, where('usuarioId', '==', user?.uid)),
          { idField: 'id' }
        );
      })
    );
  }

  getFeedById(id: string): Observable<Feed> {
    const feedDoc = doc(this.feed, id);
    return docData(feedDoc, { idField: 'id' });
  }

  addfeed(feed: Feed, imagem?: File) {

    return this.authService.userData.pipe(
      switchMap((user) => {
        return this.uploadService
          .upload(imagem, `feed/${this.authService.uid}/`)
          .pipe(
            switchMap((url) => {
              feed.createdAt = new Date();
              feed.imagem = url ?? 'assets/img/placeholder.png';
              feed.usuarioId = this.authService.uid;
              feed.usuarioName = user['nome'];
              feed.photoURL = user['photoURL'] ?? 'assets/img/image-placeholder.png';
              return from(addDoc(this.feed, feed));
            })
          );
      })
    );
  }

  editfeed(feed: Feed, imagem?: File) {
    const feedDoc = doc(this.feed, feed.id);
    return this.uploadService
      .upload(imagem, `feeds/${feed.usuarioId}/`)
      .pipe(
        switchMap((url) => {
          return from(
            updateDoc(feedDoc, { ...feed, imagem: url ?? feed.imagem })
          );
        })
      );
  }

  deletefeed(feed: Feed) {
    const feedDoc = doc(this.feed, feed.id);
    return from(deleteDoc(feedDoc));
  }
}
