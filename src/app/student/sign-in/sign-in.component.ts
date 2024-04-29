import { Component, inject } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { FirebaseError } from 'firebase/app';
import { CommonModule } from '@angular/common';
import { User, UserRole } from '../../core/models/user';

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

  userID = localStorage.getItem('userId');
  UserRole: any;
  user_dto!:User;



  constructor(private apiService: ApiService, private router: Router) { 
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  submitHandler() {
    
      const { email, password } = this.signInForm.value;
      from(this.authService.signIn(email, password)).subscribe({
        next: (userId) => {
          this.signInForm.reset();
          console.log('login successfully!');
          this.authService.getUsersByID(userId).subscribe((user: User) => {
            this.user_dto = user;
            this.user_dto.role = UserRole.Student;
            if(this.user_dto.role === UserRole.Student){
              this.router.navigate(['/home']);
            }
            else if(this.user_dto.role === UserRole.Instructor){
              this.router.navigate(['/instructor']);
            }
          });

        },
        error: (error: FirebaseError) => {
          if(error.message.includes('auth/invalid-credential')){
            this.invalidEmailOrPassword = true;
            
          }
        }
      })
    
  }
}
