import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileuploaderService {

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorageModule
  ) { }
  private basePath = '/uploads';

  upload(){
    console.log('test')
  }

}
