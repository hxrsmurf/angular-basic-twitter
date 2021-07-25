import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorage,AngularFireStorageModule } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { GetTweetsService } from 'src/app/get-tweets.service';
import { Tweet } from 'src/app/Tweet';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  message: any;
  publicPost?: boolean;
  pictures: any;

  constructor(
    public auth: AuthService,
    public tweets: GetTweetsService,
    public afs: AngularFirestore,    
    public as: AngularFireStorage,
    public afsm: AngularFireStorageModule
  ) {
    this.message = this.tweets.getTweets()
  }

  ngOnInit(): void {
  }

  item?: Observable<Tweet>
  itemDoc?: AngularFirestoreDocument<Tweet>

  click(itemID: any){
    console.log(itemID)
    this.itemDoc = this.afs.doc<Tweet>('items/'+itemID);
    this.itemDoc.update({public:this.publicPost})
  }

}
