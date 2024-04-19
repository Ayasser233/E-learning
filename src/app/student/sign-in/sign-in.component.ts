import { Component, inject } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { FirebaseError } from 'firebase/app';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule,RouterLink,CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  invalidEmailOrPassword: boolean = false;
  authService = inject(ApiService);

  constructor(private apiService: ApiService, private router: Router) { }

  submitHandler(form: NgForm) {
    if(!this.authService.signIn(form.value.email, form.value.password)) {
      const { email, password } = form.value
      from(this.authService.signIn(email, password)).subscribe({
        next: () => {
          form.reset();
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
}
