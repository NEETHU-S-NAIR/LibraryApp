import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {uname:'',
  password:''}

  constructor(private router:Router,private _auth:AuthService) { }

  ngOnInit(): void {
  }

  loginUser()
{
  this._auth.loginUser(this.user)
  .subscribe(
    res=>{
      console.log("called");
      localStorage.setItem('token',res.token)
      this.router.navigate(['book'])
    }
  )
}

}
