import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private list: any[] = [];

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
