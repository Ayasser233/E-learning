import { Component ,inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';
import { SignInComponent } from '../../student/sign-in/sign-in.component';
import { Course } from '../../core/models/courses';
import { Firestore } from '@angular/fire/firestore';
import { CollectionReference, addDoc,collection, deleteDoc, doc, getDocs ,query, where} from 'firebase/firestore';
import{v4 as uuidv4}from'uuid'
import firebase from 'firebase/compat';
import { Observable } from 'rxjs';

interface c {
  id:string;
  name: string;
  description:string;
  hours:string
}


@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  course:Course=Course.getInstance();
  
  title:string="My Courses"
  isAvailable:boolean=true
  showAddCourse:boolean=false
  firestore:Firestore=inject(Firestore);
  id=localStorage.getItem('userId');
  
  acollection=collection(this.firestore,'courses');

  courses=this.getDocumentsByInstructorId();
    
    
  constructor(private router: Router) {}
  

  Cours: c[] =[]; 
  


  ShowAddCourse(){
  this.showAddCourse=true
  }

  async addCourse(){
    if (this.course.title.trim() !== ''&&this.course.description.trim() !== ''&&this.course.hours.trim() !== '') {
      this.course.id=uuidv4();
      const acollection=collection(this.firestore,'courses');
        addDoc(acollection,{
        'courseId':this.course.id,
        'title':this.course.title,
        'description':this.course.description,
        'hours':this.course.hours,
        'instructorID':this.id,
        'materials':this.course.materials,
        'enroledstudents':this.course.students,
        'assignments':this.course.assignments,
      }).then(()=>{

        const myDiv = document.getElementById("ta");
        if (myDiv) {
          const newTask: c = {
            id:this.course.id,
            name:this.course.title,
            description:this.course.description,
            hours:this.course.hours
          };

            this.Cours.push(newTask);
          
            // Change innerHTML to refresh content
            myDiv.classList.toggle("refresh");
        }
      })
      alert('course added');
    
        
    } else {
      alert('Please Enter all information');
    }
      
  }

  async getDocumentsByInstructorId() {
    if (this.id !== null) {
      const collectionRef = collection(this.firestore, 'courses');
      const queryy = query(collectionRef, where('instructorID', '==', this.id));
      const querySnapshot = await getDocs(queryy);
      const documents = querySnapshot.docs.map((doc) => doc.data());

      for(let i in documents){
        const newTask: c = {
          id: documents[i]['courseId'],
          name: documents[i]['title'],
          description:documents[i]['description'],
          hours:documents[i]['hours']
          
        };
        console.log(documents[i])
        this.Cours.push(newTask)
      }
      return documents;
    } else {
      return null;
    }
  }
  
    editCourse() {
    
    }

    async removeCourse(id:string)
     {
      const collectionRef = collection(this.firestore, 'courses');
      const querySnapshot = await getDocs(query(collectionRef, where('courseId', '==', id)));
  
      querySnapshot.forEach((doc) => {
          deleteDoc(doc.ref)
              .then(() => {
                  console.log("Document successfully deleted!");
                  this.Cours.forEach((element,index) => {
                    if(element.id==id){
                      this.Cours.splice(index,1)
                    }
                  });
                  const myDiv = document.getElementById("ta");
                  if (myDiv) {
                  myDiv.classList.toggle("refresh");
                }
              })
              .catch((error) => {
                  console.error("Error removing document: ", error);
              });
      });
     }
    
    }
    
    
    
    


