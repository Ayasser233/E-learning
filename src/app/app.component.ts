import { Component, OnInit } from '@angular/core';
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
        PageNotFoundComponent
    ]
})
export class AppComponent{

  title : string = 'angular-firebase';

}
