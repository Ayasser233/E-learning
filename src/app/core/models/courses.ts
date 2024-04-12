export interface Course {
    id: number;
    title: string;
    description: string;
    instructorId: number;
    materials: CourseMaterial[];
    assignments: Assignment[];
    hours: number;
    students: number[]; // Array of student IDs enrolled in the course
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



