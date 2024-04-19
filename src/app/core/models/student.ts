import { Course } from './Course';
import { User } from './user';

export interface Student extends User {
    level: number;
    gpa?: number;
    registeredCourses?: Course[];
    completedCourses?: Course[];

}
