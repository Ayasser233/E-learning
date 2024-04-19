import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/layouts/footer/footer.component";
//import { AngularFireModule } from '@angular/fire/compat';
//import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { HeaderComponent } from "./shared/layouts/header/header.component";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from "./shared/layouts/page-not-found/page-not-found.component";
import { SignInComponent } from "./student/sign-in/sign-in.component";
import { RegisterComponent } from "./student/register/register.component";
import { ApiService } from './core/service/api.service';
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        RouterOutlet,
        CommonModule,
        FooterComponent,
        HeaderComponent,
        PageNotFoundComponent,
    ]
})
export class AppComponent{
  http = inject(HttpClient);

  title : string = 'angular-firebase';
}
