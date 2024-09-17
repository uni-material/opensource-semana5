import {AfterContentInit, AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {Course} from "../../model/course.entity";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {CourseService} from "../../services/course.service";
import {CourseCreateAndEditComponent} from "../../components/course-create-and-edit/course-create-and-edit.component";
import {MatIcon} from "@angular/material/icon";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-course-management',
  standalone: true,
  imports: [
    CourseCreateAndEditComponent,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatSortHeader,
    MatCell,
    MatCellDef,
    MatIcon,
    MatHeaderRow,
    MatRowDef,
    NgClass,
    MatRow,
    MatPaginator,
    MatHeaderRowDef
  ],
  templateUrl: './course-management.component.html',
  styleUrl: './course-management.component.css'
})

export class CourseManagementComponent implements OnInit, AfterViewInit {

  //region Atributes
  protected courseData!: Course;
  protected columnsToDisplay: string[] = ['id', 'tittle', 'description', 'actions'];
  @ViewChild(MatPaginator, {static: false})
  protected paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false})
  protected sort!: MatSort;
  protected editMode = false;
  protected dataSource!: MatTableDataSource<any>;
  private courseService: CourseService = inject(CourseService);
  //endregion

  //#region Methods
  constructor() {
    this.editMode = false;
    this.courseData= new Course({});
    this.dataSource = new MatTableDataSource();
    console.log(this.courseData);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.getAllCourses();
  }

  protected onEditItem(item: Course) {
    this.editMode = true;
    this.courseData = item;
  }

  protected onDeleteItem(item: Course) {
    this.deleteCourse(item.id);
  }


  protected onCancelRequest(){
    //TODO: Reset Edit State and Get All Courses
    this.resetEditState();
    this.getAllCourses();
  }

  protected onCourseAddRequest(item: Course) {
    this.courseData = item;
    //TODO: Create Course
  }

  protected onCourseUpdateRequest(item: Course) {
    this.courseData = item;
    //TODO: Update Course and Reset Edit State

  }

  private resetEditState() {
    this.courseData = new Course({});
    this.editMode = false;
  }

  private getAllCourses() {
    this.courseService.getAll().subscribe((response: Array<Course>) => this.dataSource.data = response);

  }

  private createCourse(){
    this.courseService.create(this.courseData)
      .subscribe((response: Course) => {
        this.dataSource.data.push(response);
        this.dataSource.data = this.dataSource.data;
      })
  }

  private deleteCourse(id: number){
    this.courseService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((course: Course) => course.id !==id);
    })
  }

  private updateCourse(){

  }


}
