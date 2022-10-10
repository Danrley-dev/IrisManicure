import { Injectable } from '@angular/core';
import { collectionData } from '@angular/fire/firestore';
import { collection, Firestore } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Feed, FeedConverter } from '../../models/feed/feed';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private db: Firestore) { }

  feed = collection(this.db, 'feed').withConverter(FeedConverter);

  getFeed(): Observable<Feed[]> {
    return collectionData(this.feed, {idField: 'id'});
  }
}
