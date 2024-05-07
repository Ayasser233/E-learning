import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoursesComponent } from '../courses/courses.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { RouterLink } from '@angular/router';
import {  arrayUnion, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { DocumentData } from '@angular/fire/compat/firestore';
import{v4 as uuidv4}from'uuid'
interface chapterDetails {
  id: string;
  name: string;
  description:string;
  pdfLink:string
}
interface assignmentDetails {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  assignmentLink:string
}
@Component({
  selector: 'app-courseinfo',
  standalone: true,
  imports: [CommonModule,FormsModule,MdbAccordionModule],
  templateUrl: './courseinfo.component.html',
  styleUrl: './courseinfo.component.css'
})

export class CourseinfoComponent {
  
  button1Clicked = true;
  button2Clicked = false;
  button3Clicked = false;
  addchapt=false;
  Editchapt=false;
  addassignment=false;
  Editassignment=false;

  id=localStorage.getItem('courseId');
  
  name=localStorage.getItem('courseName');
  pdfLink:string='';
  assignmentLink:string='';
  chapterName:string='';
  chapterDescription:string='';
  firestore:Firestore=inject(Firestore);
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
     this.showChapters();
     this.showAssignments()
     
  }
  constructor() {
  
  }
  
 course:chapterDetails[]=[]
 assignment:assignmentDetails[]=[];
  
 handleFileInput(event: any) {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput.files?.[0];
  if (file) {
    this.pdfLink = file.name; // Extracts and assigns just the filename
  }
}
handleAssignmentInput(event: any) {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput.files?.[0];
  if (file) {
    this.assignmentLink = file.name; // Extracts and assigns just the filename
  }
}
  toggleButtonState(buttonNumber: number) {
    if (buttonNumber === 1) {
      this.button1Clicked = true;
     this.button2Clicked=false;
     this.button3Clicked=false; 
    } else if (buttonNumber === 2) {
      this.button2Clicked = true;
      this.button1Clicked=false;
      this.button3Clicked=false;
    } else if (buttonNumber === 3) {
      this.button3Clicked = true;
      this.button1Clicked=false;
      this.button2Clicked=false;
    }
  }
  getDate():string{
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Month is zero-indexed, so we add 1
    const day = currentDate.getDate();
    return day+"/"+month+"/"+year
  }
  showEditchapter(id:string,name:string,description:string){
    if(this.Editchapt==false){
      this.Editchapt=true;
      this.chapterName=name;
      this.chapterDescription=description;
    }
    else if (this.Editchapt==true){
      this.Editchapt=false
      this.chapterName='';
      this.chapterDescription='';
    }
    this.addchapt=false;
  localStorage.setItem('chapterId',id);
  }
  ShowAddchapter(){
    this.chapterName='',this.chapterDescription='';
    if(this.addchapt==false){
      this.addchapt=true;
    }
    else if (this.addchapt==true){
      this.addchapt=false
    }
    
    this.addassignment=false;
    this.Editchapt=false;
    }
    ShowAddAssignment(){
      this.chapterName='',this.chapterDescription='';
      if(this.addassignment==false){
      this.addassignment=true
    }else{
      this.addassignment=false
    }
      this.addchapt=false;
      }
      ShowEditAssignment(id:string,name:string,description:string){
        if(this.Editassignment==false){
          this.Editassignment=true;
          this.chapterName=name;
          this.chapterDescription=description;
        }
        else if (this.Editassignment==true){
          this.Editassignment=false
          this.chapterName='';
          this.chapterDescription='';
        }
        this.addchapt=false;
      localStorage.setItem('assignmentId',id);
      }
      
      async editChapter(){
        const cid=localStorage.getItem('chapterId')

        const collectionRef = collection(this.firestore, 'courses');
          const queryy = query(collectionRef, where('courseId', '==', this.id));
  
          const querySnapshot = await getDocs(queryy);
  
          const documents = querySnapshot.docs.map((doc) => doc.data());
          const newDoc:chapterDetails[]=[];
          for(let i in documents[0]['materials']){
            
            if(documents[0]['materials'][i]['id']!=cid){
               newDoc.push(documents[0]['materials'][i]);         
                }else{
                  newDoc.push(
                    {
                      id :cid as string,
                      name: this.chapterName,
                      description: this.chapterDescription,
                      pdfLink:this.pdfLink
                    }
                  )
                }
              }
                querySnapshot.forEach(async (doc) => {
                  await updateDoc(doc.ref, {'materials':newDoc}).then(() => {
                    
                      console.log("Document successfully deleted!");
                      this.course.forEach((element,index) => {
                        if(element.id==cid){
                          element.name=this.chapterName
                          element.description=this.chapterDescription
                        }
                      });
                    });
                    const myDiv = document.getElementById("chapters");
                    if (myDiv) {
                    myDiv.classList.toggle("refresh");
                     this.Editchapt=false;
                  }
                    })
                
                    }
              
  
              
                
  
    async showChapters() {
      if (this.id !== null) {
        const collectionRef = collection(this.firestore, 'courses');
        const queryy = query(collectionRef, where('courseId', '==', this.id));
        const querySnapshot = await getDocs(queryy);
        const documents = querySnapshot.docs.map((doc) => doc.data());
  
        for(let i in documents[0]['materials']){
          const newTask: chapterDetails = {
          id: documents[0]['materials'][i]['id'],
          name: documents[0]['materials'][i]['name'],
          description:documents[0]['materials'][i]['description'],
          pdfLink:documents[0]['materials'][i]['pdfLink']
          };
          
          this.course.push(newTask)
        }
        return documents;
      } else {
        return null;
      }
    }
    async addChapter() {
      if (this.chapterName.trim() !== '' && this.chapterDescription.trim() !== '') {
        if (this.id !== null) {
          const collectionRef = collection(this.firestore, 'courses');
          const queryy = query(collectionRef, where('courseId', '==', this.id));
          const querySnapshot = await getDocs(queryy);
          const documents = querySnapshot.docs.map((doc) => doc.ref);
    
          // Assuming you want to add new values to the "materials" field
          const newValues:chapterDetails = {
            id:uuidv4(),
            name: this.chapterName,
            description: this.chapterDescription,
            pdfLink:this.pdfLink
          };
    
          // Update each document in the query result
          documents.forEach(async (docRef) => {
            try {
              await updateDoc(docRef, {
                'materials': arrayUnion(newValues)
              }).then(()=>{

                const myDiv = document.getElementById("chapters");
                if (myDiv) {
                
        
                    this.course.push(newValues);
                  
                    // Change innerHTML to refresh content
                    myDiv.classList.toggle("refresh");
                }
              })
              console.log("Document updated successfully!");
              this.addchapt=false;
              this.chapterName='',this.chapterDescription='';
            } catch (error) {
              console.error("Error updating document: ", error);
            }
          });
        } else {
          console.error("Invalid id");
        }
      } else {
        console.error("Chapter name or description is empty");
      }
    }
    async removeChapter(id:string){
      
      const collectionRef = collection(this.firestore, 'courses');
        const queryy = query(collectionRef, where('courseId', '==', this.id));

        const querySnapshot = await getDocs(queryy);

        const documents = querySnapshot.docs.map((doc) => doc.data());
        const newDoc:chapterDetails[]=[];
        for(let i in documents[0]['materials']){
          
            if(documents[0]['materials'][i]['id']!=id){
             newDoc.push(documents[0]['materials'][i]);         
              }
            }
            querySnapshot.forEach(async (doc) => {
              await updateDoc(doc.ref, {'materials':newDoc}) .then(() => {
              
                  console.log("Document successfully deleted!");
                  this.course.forEach((element,index) => {
                    if(element.id==id){
                      this.course.splice(index,1)
                    }
                  });
                });
                const myDiv = document.getElementById("chapters");
                if (myDiv) {
                myDiv.classList.toggle("refresh");
  
              }
                })  
                  
            }    
              


        async showAssignments():Promise<void> {
        if (this.id !== null) {
        const collectionRef = collection(this.firestore, 'courses');
        const queryy = query(collectionRef, where('courseId', '==', this.id));
        const querySnapshot = await getDocs(queryy);
        const documents = querySnapshot.docs.map((doc) => doc.data());
  
        for(let i in documents[0]['assignments']){
          const newTask: assignmentDetails = {
          id:documents[0]['assignments'][i]['id'],
          title: documents[0]['assignments'][i]['title'],
          description:documents[0]['assignments'][i]['description'],
          dueDate:documents[0]['assignments'][i]['dueDate'],
          assignmentLink:documents[0]['assignments'][i]['assignmentLink']
          };
          
          this.assignment.push(newTask)
        }
      
      } else {
        console.log('error')
      }
    }
    async addAssignment():Promise<void> {
      if (this.chapterName.trim() !== '' && this.chapterDescription.trim() !== '') {
        if (this.id !== null) {
          const collectionRef = collection(this.firestore, 'courses');
          const queryy = query(collectionRef, where('courseId', '==', this.id));
          const querySnapshot = await getDocs(queryy);
          const documents = querySnapshot.docs.map((doc) => doc.ref);
    
          // Assuming you want to add new values to the "materials" field
          const newValues:assignmentDetails = {
            title: this.chapterName,
            description: this.chapterDescription,
            dueDate:this.getDate(),
            id:uuidv4(),
            assignmentLink:this.assignmentLink
          };
    
          // Update each document in the query result
          documents.forEach(async (docRef) => {
            try {
              await updateDoc(docRef, {
                'assignments': arrayUnion(newValues)
              }).then(()=>{

                const myDiv = document.getElementById("chapters");
                if (myDiv) {
                
        
                    this.assignment.push(newValues);
                  
                    // Change innerHTML to refresh content
                    myDiv.classList.toggle("refresh");
                }
              })

              console.log("Document updated successfully!");
              this.addassignment=false;
              this.chapterName='',this.chapterDescription='';
            } catch (error) {
              console.error("Error updating document: ", error);
            }
          });
        } else {
          console.error("Invalid id");
        }
      } else {
        console.error("Chapter name or description is empty");
      }
    }
    async removeAssignment(id:string){
      const collectionRef = collection(this.firestore, 'courses');
        const queryy = query(collectionRef, where('courseId', '==', this.id));

        const querySnapshot = await getDocs(queryy);

        const documents = querySnapshot.docs.map((doc) => doc.data());
        const newDoc:assignmentDetails[]=[];
        for(let i in documents[0]['assignments']){
          
          if(documents[0]['assignments'][i]['id']!=id){
             newDoc.push(documents[0]['assignments'][i]);         
              }
            }
              querySnapshot.forEach(async (doc) => {
                await updateDoc(doc.ref, {'assignments':newDoc}) .then(() => {
                
                    console.log("Document successfully deleted!");
                    this.assignment.forEach((element,index) => {
                      if(element.id==id){
                        this.assignment.splice(index,1)
                      }
                    });
                  });
                  const myDiv = document.getElementById("chapters");
                  if (myDiv) {
                  myDiv.classList.toggle("refresh");
    
                }
                  })
              
                  

            }    
        
        async editAssignment(){
          const assid=localStorage.getItem('assignmentId')
          const collectionRef = collection(this.firestore, 'courses');
            const queryy = query(collectionRef, where('courseId', '==', this.id));
    
            const querySnapshot = await getDocs(queryy);
    
            const documents = querySnapshot.docs.map((doc) => doc.data());
            const newDoc:assignmentDetails[]=[];
            for(let i in documents[0]['assignments']){
              
              if(documents[0]['assignments'][i]['id']!=assid){
                 newDoc.push(documents[0]['assignments'][i]);         
                  }else{
                    newDoc.push(
                      {
                        id :assid as string,
                        title: this.chapterName,
                        description: this.chapterDescription,
                        dueDate:documents[0]['assignments'][i]['dueDate'],
                        assignmentLink:documents[0]['assignments'][i]['assignmentLink']
                      }
                    )
                  }
                }   querySnapshot.forEach(async (doc) => {
                    await updateDoc(doc.ref, {'assignments':newDoc}).then(() => {
                      console.log("Document successfully updated");
                        this.assignment.forEach((element,index) => {
                          if(element.id==assid){
                            element.title=this.chapterName,
                            element.description=this.chapterDescription
                          }
                        });
                      });
                      const myDiv = document.getElementById("chapters");
                      if (myDiv) {
                      myDiv.classList.toggle("refresh");
                       this.Editassignment=false;
                    }
                      })
                  
                      }     
                
                }    
                  
    

            





