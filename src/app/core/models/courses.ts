export class Course {
  private static instance: Course;
    id: string;
    title: string;
    description: string;
    instructorId: string;
    materials: CourseMaterial[];
    assignments: Assignment[];
    hours: string;
    students: number[]; // Array of student IDs enrolled in the course
    private constructor() {
      // Private constructor to prevent direct instantiation
      this.id=''
      this.title=''
      this.description=''
      this.instructorId=''
      this.materials=[]
      this.assignments=[]
      this.hours=''
      this.students=[]
  }

  public static getInstance(): Course {
      if (!Course.instance) {
          Course.instance = new Course();
      }
      return Course.instance;
  }
}


export interface CourseMaterial {
    id: number;
    title: string;
    type: MaterialType;
    contentUrl: string;
}

export enum MaterialType {
    Lecture = 'lecture',
    Reading = 'reading',
    Multimedia = 'multimedia'
}

export interface Assignment {
    id: number;
    title: string;
    description: string;
    dueDate: Date;
    courseId: number; // Reference to the course this assignment belongs to
    submissions: AssignmentSubmission[];
}

export interface AssignmentSubmission {
    id: number;
    studentId: number;
    assignmentId: number;
    submissionDate: Date;
    fileUrl: string; // URL to the submitted file
    grade: number;
  }



