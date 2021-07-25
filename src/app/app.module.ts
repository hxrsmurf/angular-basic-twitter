import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { NewTweetComponent } from './components/new-tweet/new-tweet.component';
import { TweetsComponent } from './components/tweets/tweets.component';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from 'src/environments/environment';
import { TimeService } from './time.service';
import { HomeComponent } from './components/home/home.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ProfileComponent } from './components/profile/profile.component';
import { PublicTweetsComponent } from './components/public-tweets/public-tweets.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewTweetComponent,
    TweetsComponent,
    HomeComponent,
    ProfileComponent,
    PublicTweetsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule

  ],
  providers: [TimeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
