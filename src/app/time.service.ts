import { formatDate } from '@angular/common';
import { Component, Inject, Injectable, LOCALE_ID, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TimeService {
  static myFunction() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @Inject(LOCALE_ID) public locale: string) { }

    myFunction (){
    const todayString = new Date().toISOString();
    const today = formatDate(todayString, 'HH:mm:ss dd-MM-yyyy', this.locale)
    return today
    }
    
    imageTime (){
      const todayString = new Date().toISOString();
      const today = formatDate(todayString, 'HHmmss-dd-MM-yyyy', this.locale)
      return today
      }
}
