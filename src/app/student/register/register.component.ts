import { Component, inject } from '@angular/core';
import { User } from '../../core/models/user';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm,ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})

export class RegisterComponent {
  submitted = false;
  signUpfrom!:FormGroup;
  user_reg_data:any;
  user_dto!:User;
  href:string ='';
  regForm:boolean = false;
  fb = inject(FormBuilder);
  authService = inject(ApiService);
  router = inject(Router);
  
  constructor(private formBuilder:FormBuilder) {  }

  ngOnInit():void{
    this.href = this.router.url;
    if(this.href =='/register'){
    this.regForm = true;
    }else if(this.href =='/sign-in'){
      this.regForm = false;
    }
    this.signUpfrom = this.formBuilder.group({
      username:[''],
      email: [''],
      password: [''],
      phone: [''],
      approved: [false],
      role: ['']
    });
  }

  createUser() {
    if(this.signUpfrom.invalid){
      return;
    }
    this.user_reg_data = this.signUpfrom.value;
    this.user_dto = {
      username: this.user_reg_data.username || '', // Add null check and provide a default value
      email: this.user_reg_data.email || '', // Add null check and provide a default value
      password: this.user_reg_data.password || '', // Add null check and provide a default value
      phone: this.user_reg_data.phone || '', // Add null check and provide a default value
      approved: false,
      role: this.user_reg_data.role || '' // Add null check and provide a default value
    };
    this.authService.register(
      this.user_dto.email || '', // Add null check and provide a default value
      this.user_dto.password || '', // Add null check and provide a default value
      this.user_dto.username || '', // Add null check and provide a default value
      this.user_dto.phone || '' // Add null check and provide a default value
    ).then(() => {
      console.log('Created new user successfully!');
      this.signUpfrom.reset();
      this.router.navigate(['/sign-in']);
      this.submitted = true;
    });
  }


  resetForm(form: NgForm) {
    form.reset();
  }
}
