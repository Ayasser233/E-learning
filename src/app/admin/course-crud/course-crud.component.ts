import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-crud',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './course-crud.component.html',
  styleUrls: ['./course-crud.component.css']
})
export class CourseCrudComponent {
  task_id: any;
  task: any;

  constructor(private route: ActivatedRoute, private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.task_id = this.route.snapshot.paramMap.get('id');
    this.task = this.adminService.getTask(this.task_id);
    console.log(this.task);
  }

  onEdit() {
    this.adminService.editTask(this.task_id, this.task);
    this.router.navigate(['/admin']);
    alert('Task has been edited');
  }
}
