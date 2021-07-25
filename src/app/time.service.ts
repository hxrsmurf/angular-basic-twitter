import { formatDate } from '@angular/common';
import { Component, Inject, Injectable, LOCALE_ID, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TimeService {
  static myFunction() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @Inject(LOCALE_ID) public locale: string) { }

  realTime() {
    const realTime = firebase.default.firestore.Timestamp.now()
    return realTime
  }
  
  stringTime(){
    const todayString = new Date().toISOString();
    const stringTime = formatDate(todayString, 'HH:mm:ss dd-MM-yyyy', this.locale)
    return stringTime
  }

  imageTime() {
    const todayString = new Date().toISOString();
    const today = formatDate(todayString, 'HHmmss-dd-MM-yyyy', this.locale)
    return today
  }
}
