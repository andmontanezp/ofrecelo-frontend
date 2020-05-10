import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { PasswordService } from 'src/app/_services/password.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  error: ErrorEvent;
  constructor(
    private password : PasswordService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  
  user = new User();
  submitted = false;
  showError = false;
  errorMassage = "";
  confirmpasswordValid=true;
  loading = false;

  home() {
    this.router.navigate(['/']);
  }

  onSubmit(form: any) { 
    this.loading = true;
    this.showError = false;

    this.user.email = form.controls['email'].value;

    this.password.resetPassword(this.user).subscribe(
      users => {
      console.log(users);
      this.submitted = true; 
    },
    error => {
      this.error = error;
      console.log("COde "+ error.status);
      console.log("Mensaje "+ error.message);
      if(error!=null){
        this.loading = false;
        this.submitted = false; 
        this.showError = true;
        this.errorMassage = error.message;
      }
      //this.loading = false;
    });
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.user); }

  showUser(){
    return this.user;
  }

}
