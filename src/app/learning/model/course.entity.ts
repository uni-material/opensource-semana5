export class Course {
  id: number;
  tittle: string;
  description: string;

  //atributos son obcionales
  constructor(course: {id?: number, tittle?: string, description?: string}) {
    this.id = course.id || 0;
    this.tittle= course.tittle || '';
    this.description= course.description || '';
  }

}
