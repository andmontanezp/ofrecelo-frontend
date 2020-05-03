import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { RegisterService } from 'src/app/_services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error: ErrorEvent;
  constructor(
    private registerService : RegisterService
  ) { }

  ngOnInit() {
  }
  
  user = new User();
  submitted = false;
  showError = false;
  errorMassage = "";
  confirmpasswordValid=true;
  loading = false;

  validatePassword(form:any){
      if(form.controls['password'].value === form.controls['confirmpassword'].value){
        this.confirmpasswordValid=true;
      }else{
        this.confirmpasswordValid=false; 
      }
  }

  onSubmit(form: any) { 
    this.loading = true;
    this.showError = false;
    console.log("user : "+this.user.name);
    this.user.name = form.controls['name'].value;
    this.user.lastName = form.controls['lastName'].value;
    this.user.email = form.controls['email'].value;
    this.user.password = form.controls['password'].value;

    this.registerService.register(this.user).subscribe(
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
