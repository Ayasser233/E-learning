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
  
  constructor(private formBuilder:FormBuilder ,private apiService: ApiService) {  }

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
    this.user_dto={
      username:this.user_reg_data.username ,
      email:this.user_reg_data.email,
      password:this.user_reg_data.password,
      phone: this.user_reg_data.phone,
      approved: false,
      role: this.user_reg_data.role
    }

    const email = this.user_dto.email || ''; // Add null check for email
    const password = this.user_dto.password || ''; // Add null check for password

    this.authService.register(email, password, this.user_dto).then(() => {
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
