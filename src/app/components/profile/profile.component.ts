import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userInfo: any;

  constructor(public auth: AuthService) { 
    console.log(this.auth)
    
  }

  ngOnInit(): void {
    
  }

}
