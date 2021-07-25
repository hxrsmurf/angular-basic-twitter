import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Tweet } from 'src/app/Tweet';
import { Tweets } from 'src/app/tweets';
import { map } from 'rxjs/operators'
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-public-tweets',
  templateUrl: './public-tweets.component.html',
  styleUrls: ['./public-tweets.component.css']
})
export class PublicTweetsComponent implements OnInit {

  tweets = Tweets;

  itemsCollection?: AngularFirestoreCollection<Tweet>;
  items?: Observable<Tweet[]>

  constructor(
    private afs: AngularFirestore,
    public auth: AuthService
    ) {}

  ngOnInit(): void {
    this.itemsCollection = this.afs.collection<Tweet>('items', ref=> ref.orderBy('time','desc'));
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Tweet;
        const id = a.payload.doc.id;
        return {id, ...data}
      }))
    )
  }
}
