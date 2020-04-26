import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.loginform = this.fb.group({
      username : ['', Validators.required],
      password : ['', Validators.required],
    })
  }

  loginSubmit(formdata){
    console.log(formdata);
  }

  getControl(){
    return this.loginform.controls;
  }

}
