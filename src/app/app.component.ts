import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/layouts/footer/footer.component";
import { AngularFireModule } from '@angular/fire/compat';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
      RouterOutlet, 
      FooterComponent,
      AngularFireModule
    ],
    
})
export class AppComponent {
  title = 'E-learning';
}
