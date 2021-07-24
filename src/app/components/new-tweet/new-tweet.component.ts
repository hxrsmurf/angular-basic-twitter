import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TimeService } from 'src/app/time.service';
import { Tweet } from 'src/app/Tweet';
import { Tweets } from 'src/app/tweets';

@Component({
  selector: 'app-new-tweet',
  templateUrl: './new-tweet.component.html',
  styleUrls: ['./new-tweet.component.css']
})

export class NewTweetComponent implements OnInit {
  itemsCollection: any;
  items: Observable<any>;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private afs: AngularFirestore,
    private timeService: TimeService

  ) {
    this.itemsCollection = afs.collection<Tweet>('items');
    this.items = this.itemsCollection.valueChanges();
  }
  
  textInput: string = '';
  todayString: string = new Date().toISOString();
  today = formatDate(this.todayString, 'HH:mm:ss dd-MM-yyyy', this.locale)

  tweet = Tweets

  ngOnInit(): void {
  }

  onClick() {
    if (!this.textInput) {
      return;
    }

    this.afs.collection('items').add(
      {
        profile: 'Photo',
        displayName: 'Kevin Murphy',
        username: '@hxrsmurf',
        time: this.timeService.myFunction(),
        tweet: this.textInput
      }
    )
    this.textInput = '';
  }
}
