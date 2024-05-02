import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
interface courseDetails {
  chapters: string;
  description:string;
  
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
  chapterName:string='';
  chapterDescription:string='';

 course:courseDetails[]=[
{
      chapters: 'lesson 01 ',
      description:' introduction',
      
    },
    {
      chapters: 'lesson 02',
      description:' marketing princibles ',
    
    },
    {
      chapters: 'lesson 03',
      description:'Researching ',
      
    },
 ]
  
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
  ShowAddchapter(){
    this.addchapt=true
    }
  addchapter(){
    if (this.chapterName.trim() !== ''&&this.chapterDescription.trim() !== '') {
      const newchapter: courseDetails = {
        chapters: this.chapterName,
        description:this.chapterDescription,
        
      };
      this.course.push(newchapter);
      this.chapterName = '';
      this.chapterDescription='';
      
      this.addchapt=false
    } else {
      alert('Please Enter all information');
    }
  
  }
  
}
