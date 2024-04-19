import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { SignInComponent } from './student/sign-in/sign-in.component';
import { RegisterComponent } from './student/register/register.component';

export const routes: Routes = [
    
    {path:"", children:[
        {path:"register", component:RegisterComponent},
        {path:"sign-in" , component:SignInComponent}
    ]},
    
    {path:"", redirectTo:"home", pathMatch:"full"},
    {path:"home", component: HomeComponent},
    {path:"contact-us", component:ContactUsComponent},
    {path:"student-profile",component:StudentProfileComponent},
    
    //admin
    {path:"admin", loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)},

    //student

    {path:"", loadChildren:()=>import('./student/student.module').then(m=>m.StudentModule)},

    //instructor

    {path:"instructor", loadChildren:()=>import('./instructor/instructor.module').then(m=>m.InstructorModule)},


];
