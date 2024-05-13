import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

export interface Course {
  id: number;
  name: string;
  description: string;
}


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,   
    RouterModule,    
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  taskArray = [
    {"name": "Task 1", "description": "My First Task"},
    {"name": "Task 2", "description": "My Second Task"}
  ];

  

  users = [
    { id: 1, name: 'Test', email: 'Test001@test.com', status: 'pending' },
    { id: 2, name: 'Mahmoud Mesalem', email: 'mahmoudmesalem23@gmail.com', status: 'active' }
  ];

  
  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.taskArray = this.adminService.getList();
  }

  onAdd(form: NgForm) {
    if (!form.valid) {
      return;
    }

    let newTask: Course = {
      id: this.taskArray.length + 1,
      name: form.value.name,
      description: form.value.description
    };

    this.taskArray.push(newTask);
    this.adminService.addCourse(newTask);

    form.reset();
  }

  onDelete(index: number) {
    this.taskArray.splice(index, 1);
    this.adminService.setList(this.taskArray);
  }

  navetotask(i: number) {
    this.router.navigate(['/task', i]);
  }
  
  toggleUserStatus(id: number) {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      if (this.users[index].status === 'active') {
        this.users[index].status = 'inactive';
      } else {
        this.users[index].status = 'active';
      }
    }
  }
  

  deleteUser(id: number) {
    this.users = this.users.filter(user => user.id !== id);
  }  
}
