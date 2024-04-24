import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "../shared/layouts/header/header.component";
import { FooterComponent } from "../shared/layouts/footer/footer.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent]
})
export class HomeComponent {

}
