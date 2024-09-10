import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Student} from "../model/student.entity";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StudentService extends BaseService<Student>{

  constructor() {
    super();
    this.resourceEndpoint = 'students';
  }

}
