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

  model = new User();

  submitted = false;

  onSubmit() { 
    this.submitted = true; 
    this.model;
    console.log("user : "+this.model.name);
    this.registerService.register(this.model.name,this.model.lastName, this.model.email, this.model.password).subscribe((data)=>{
      console.log(data);
    });
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  showUser(){
    return this.model;
  }

}
