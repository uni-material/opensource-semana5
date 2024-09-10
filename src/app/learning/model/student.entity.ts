export class Student {
  acmeStudentIs: string;
  profileId: number;
  totalCompletedCourses: number;
  totalTutorials: number

  constructor(acmeStudentIs: string = '',
              profileId: number = 0,
              totalCompletedCourses: number = 0,
              totalTutorials: number = 0) {

    this.acmeStudentIs = acmeStudentIs;
    this.profileId = profileId;
    this.totalCompletedCourses = totalCompletedCourses;
    this.totalTutorials = totalTutorials;
  }

}
