import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookssService } from '../bookss.service';
import { LoginModel } from '../login/LoginModel';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  title:String = "Login";
  constructor(private bookservice:BookssService,private router:Router) { }

  loginItem = new LoginModel('','','',0,'');

  ngOnInit(){
  }
  AddUser(){
    this.bookservice.signup(this.loginItem);
    console.log("called");
    alert("success added user");
    this.router.navigate(['login']);
  }

}
