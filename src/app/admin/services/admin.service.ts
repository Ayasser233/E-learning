import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private list: any[] = [];

  private firestoreUrl = 'https://firestore.googleapis.com/v1/projects/e-learning-8c259/databases/(default)/documents';

  constructor() { }

  getList() {
    return this.list;
  }

  getTask(id: number){
    return this.list[id];
  }

  setList(newList: any[]) {
    this.list = newList;
  }

  editTask(id: number, task: any){
    this.list[id]= task
  }

  deleteTask(id: number) {
    this.list.splice(id, 1);
  }
}
