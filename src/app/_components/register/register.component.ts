import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { RegisterService } from 'src/app/_services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private registerService : RegisterService
  ) { }

  ngOnInit() {
  }
  
  user = new User();
  submitted = false;

  validatePassword(form:any){
      if(form.controls['password'].value === form.controls['confirmpassword'].value){
        form.controls['confirmpassword.valid']=true 
      }
  }

  onSubmit(form: any) { 
    this.submitted = true; 
    console.log("user : "+this.user.name);
    this.user.name = form.controls['name'].value;
    this.user.lastName = form.controls['lastName'].value;
    this.user.email = form.controls['email'].value;
    this.user.password = form.controls['password'].value;

    this.registerService.register(this.user).subscribe((data)=>{
      console.log(data);
    });
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.user); }

  showUser(){
    return this.user;
  }

}
