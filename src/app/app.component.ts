import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'instagramClone';

  ngOnInit(): void {

    const firebaseConfig = {
      apiKey: 'AIzaSyB7_79oc44BJe0FTmAh0avgoqCM6a2yp1M',
      authDomain: 'jta-instagram-clone-2a3ff.firebaseapp.com',
      databaseURL: 'https://jta-instagram-clone-2a3ff.firebaseio.com',
      projectId: 'jta-instagram-clone-2a3ff',
      storageBucket: 'jta-instagram-clone-2a3ff.appspot.com',
      messagingSenderId: '867914599690',
      appId: '1:867914599690:web:254604024272edec'
    };

    firebase.initializeApp(firebaseConfig);
  }
}
