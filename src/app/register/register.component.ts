import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  selectedFile;
  userform;
  avatarName;
  message;
  imgURL;
  hostUser;
  
  constructor(private fb: FormBuilder, private userservice: UserService) { }

  ngOnInit(): void {
    this.initForm();
  }
  uploadImage(event)
  {
    let files = event.target.files;
    if(files.length===0)
      return;
 
    var mimeType=files[0].type;
    if(mimeType.match(/image\/*/)==null)
    { 
      Swal.fire("Images Only");
      return;
    }
    this.preview(event.target.files)
    let formData=new FormData();
    this.selectedFile=files[0];
    this.avatarName=this.selectedFile.name;
    console.log(this.avatarName);
    formData.append('image', this.selectedFile, this.selectedFile.name);
    this.userservice.uploadImage(formData).subscribe(response=>
      {
      console.log(response)
      })
  }
 
  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => { 
      this.imgURL = reader.result;
    }
  }

  initForm(){
    this.userform = this.fb.group({
      name : ['', Validators.required],
      username : ['', Validators.required],
      email : ['', Validators.required],
      password : ['', Validators.required],
      confirm : ['', Validators.required],
    }, {validators : this.matchPassword('password', 'confirm')})
  }

  matchPassword(password,confirm_pass)
    {
      return (form)=> 
      {
        let passControl=form.controls[password];
        let confirmControl=form.controls[confirm_pass];
        if(passControl.value !==confirmControl.value)
        {
          confirmControl.setErrors({match:true})
        }
     }
   }

  userSubmit(formdata){

    if(this.userform.invalid){
      // alert('incorrect data')

      return;
    }

    this.userservice.addUser(formdata).subscribe(data => {
      console.log(data);
    })
  }

  getControl(){
    return this.userform.controls;
  }

}
