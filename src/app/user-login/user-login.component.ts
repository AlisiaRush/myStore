import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  constructor(private router: Router) {}
  signupUsers: any[] = [];

  signupObj: any = {
    username: '',
    email: '',
    password: '',
  };

  loginObj: any = {
    username: '',
    password: '',
  };

  ngOnInit() {
    const localData = localStorage.getItem('signupUsers');
    if (localData != null) {
      this.signupUsers = JSON.parse(localData);
    }
  }

  onSignUp() {
    this.signupUsers.push(this.signupObj);
    // store to localStorage
    localStorage.setItem('signupUsers', JSON.stringify(this.signupUsers));

    this.signupObj = {
      username: '',
      email: '',
      password: '',
    };
  }

  onLogin() {
    // Check if username and password is there
    const isUser = this.signupUsers.find(
      (m) =>
        m.username == this.loginObj.username &&
        m.password == this.loginObj.password
    );
    if (isUser != undefined) {
      alert('User Successfully logged in!!');
      this.router.navigate(['dashboard']);
    } else {
      alert('Wrong credentials! Please try again!');
    }
  }
}
