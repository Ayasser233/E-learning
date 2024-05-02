import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private firestoreUrl = 'https://firestore.googleapis.com/v1/projects/e-learning-8c259/databases/(default)/documents';

  private list: any[] = [];

  constructor(private http: HttpClient) { }

  getList() {
    return this.list;
  }

  getTask(id: number) {
    return this.list[id];
  }

  setList(newList: any[]) {
    this.list = newList;
  }

  editTask(id: number, task: any) {
    this.list[id] = task
  }

  deleteTask(id: number) {
    this.list.splice(id, 1);
  }

  addCourse(course: any) {
    const firestoreData = {
      fields: {
        title: {
          stringValue: course.name 
        },
        description: {
          stringValue: course.description 
        }
      }
    };

    this.http.post(`${this.firestoreUrl}/courses`, firestoreData).subscribe((response) => {
      console.log('Course added successfully:', response);
    });
  }

}
