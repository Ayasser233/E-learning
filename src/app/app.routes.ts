
import { Routes } from '@angular/router';
import { CourseinfoComponent } from './instructor/courseinfo/courseinfo.component';

import { CourseComponent } from './course/course.component';
import { CoursesComponent } from './instructor/courses/courses.component';
import { HomeComponent } from './student/home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { SignInComponent } from './student/sign-in/sign-in.component';
import { RegisterComponent } from './student/register/register.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { CourseCrudComponent } from './admin/course-crud/course-crud.component';
import { OverviewComponent } from './student/overview/overview.component';

export const routes: Routes = [

    {path:"", children:[
        {path:"register", component:RegisterComponent},
        {path:"" , component:SignInComponent},
        {path:"sign-in" , component:SignInComponent},
        {path:"admin" , component:AdminDashboardComponent},
        {path: "task/:id",component:CourseCrudComponent},
        {path: "overview", component:OverviewComponent}
    ]},

    {path:"", redirectTo:"home", pathMatch:"full"},
    {path:"home", component: HomeComponent},
    {path:"contact-us", component:ContactUsComponent},
    {path:"student-profile",component:StudentProfileComponent},

    //admin
    {path:"admin", loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)},

    //student

    {path:"x", loadChildren:()=>import('./student/student.module').then(m=>m.StudentModule)},

    //instructor

    {path:"instructor", loadChildren:()=>import('./instructor/instructor.module').then(m=>m.InstructorModule)},
    
    {
      path:'1',
      component:CourseinfoComponent
      
    },
  
    {path:'courses',
    component:CoursesComponent
  
    }

];

