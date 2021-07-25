import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth.service';
import { FileuploaderService } from 'src/app/fileuploader.service';
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
  uploadPercent?: Observable<number | undefined>;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private afs: AngularFirestore,
    private timeService: TimeService,
    public auth: AuthService,
    private upload: FileuploaderService,
    private storage: AngularFireStorage

  ) {
    this.itemsCollection = afs.collection<Tweet>('items');
    this.items = this.itemsCollection.valueChanges();
  }

  textInput: string = '';
  fileUpload: string = '';
  todayString: string = new Date().toISOString();
  today = formatDate(this.todayString, 'HH:mm:ss dd-MM-yyyy', this.locale)
  downloadURL?: any;
  photo: string = '';
  showDownloadImage?: boolean;
  publicPost?: boolean;

  tweet = Tweets

  ngOnInit(): void {
  }

  selectedFiles?: FileList;
  selectFile(event: any) {
    const file = event.target.files[0];
    const filePath = this.auth.userData.email + '/' + this.timeService.imageTime() + '-' + file.name;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();

    task.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe(URL => {
          this.downloadURL = URL
        });
        this.showDownloadImage = true;
      })
    ).subscribe()
  }

  onClick() {
    if (!this.textInput) {
      return;
    }

    if (!this.downloadURL) {
      this.downloadURL = '';
    }

    if (!this.publicPost) {
      this.publicPost = false;
    }

    this.afs.collection('items').add(
      {
        profile: this.auth.userData.photoURL,
        displayName: this.auth.userData.displayName,
        email: this.auth.userData.email,
        time: this.timeService.realTime(),
        stringTime: this.timeService.stringTime(),
        picture: this.downloadURL,
        tweet: this.textInput,
        public: this.publicPost
      }
    )

    // Reset Variables
    this.textInput = '';
    this.showDownloadImage = false;
    this.publicPost = false
  }
}
