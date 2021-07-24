import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Tweet } from 'src/app/Tweet';
import { Tweets } from 'src/app/tweets';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})

export class TweetsComponent implements OnInit {
  tweets = Tweets;

  itemsCollection?: AngularFirestoreCollection<Tweet>;
  items?: Observable<Tweet[]>

  constructor(private afs: AngularFirestore) {}

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
  onDelete(tweetId: any){
    this.afs.doc('items/'+tweetId).delete();    
  }
}