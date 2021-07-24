import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase'
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      }
    })

  }
  
  GoogleAuth() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.default.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      firebase.default.auth().signInWithPopup(provider).then(res => {
        return res
      })
    })
  }

  SignOut() {
    return new Promise<any>((resolve, reject) => {
      return this.afAuth.signOut().then(() =>
      {
        localStorage.removeItem('user');
        window.location.reload()
      })
    })
  }
}
