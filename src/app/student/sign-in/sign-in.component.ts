import { Component, inject } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { FirebaseError } from 'firebase/app';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule,RouterLink,CommonModule,ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  invalidEmailOrPassword: boolean = false;
  signInForm: FormGroup;
  authService = inject(ApiService);

  constructor(private apiService: ApiService, private router: Router) { 
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  submitHandler() {
    
      const { email, password } = this.signInForm.value;
      from(this.authService.signIn(email, password)).subscribe({
        next: () => {
          this.signInForm.reset();
          console.log('login successfully!');

          this.router.navigate(['/home']);
        },
        error: (error: FirebaseError) => {
          if(error.message.includes('auth/invalid-credential')){
            this.invalidEmailOrPassword = true;
            
          }
        }
      })
    
  }
}
