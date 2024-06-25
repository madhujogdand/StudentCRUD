import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Student } from './studentDTO';
import { StudentService } from './student.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterOutlet, HttpClientModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit {
  studentService: StudentService = inject(StudentService);
  studentForms: any = [];
  studentForm!: FormGroup;
  isUpdatebtn!: boolean;
  studentList: any = [];
  queryValue: string | unknown;
  stud: any;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.isUpdatebtn = false;
    this.studentForms = this.fb.group({
      id: [, Validators.required],
      name: ['', Validators.required],
      marks1: [, Validators.required],
      marks2: [, Validators.required],
      marks3: [, Validators.required]
    });

    this.route.paramMap.subscribe(x => {

      this.queryValue = x.get('id');
    })
    if (this.queryValue != " " && this.queryValue != null) {
      //alert(this.queryValue);
    }

    this.getStudent();
  }

  get id() {
    return this.studentForms.get('id');
  }

  get name() {
    return this.studentForms.get('name');
  }

  get marks1() {
    return this.studentForms.get('marks1');
  }

  get marks2() {
    return this.studentForms.get('marks2');
  }

  get marks3() {
    return this.studentForms.get('marks3');
  }

  getStudent() {
    this.studentList = this.studentService.getStudent();
  }

  student: Student = {};

  saveStudent() {
    let stud = this.studentForms.value;
    if (!this.isUpdatebtn) {
      this.studentService.addStudent(stud);
    }
    else {
      this.studentService.updateStudent(stud);
      this.isUpdatebtn = false;
    }
    this.studentForms.reset();
    this.getStudent();
  }

  editStudent(stud: Student) {
    this.isUpdatebtn = true;
    this.studentForms.setValue({
      id: stud.id,
      name: stud.name,
      marks1: stud.marks1,
      marks2: stud.marks2,
      marks3: stud.marks3
    });

  }

  //delete the data
  deleteStudent(id: number | undefined) {
    let response = confirm('Do you want to delete id ' + id + ' ?');
    if (response == true) {
      this.studentService.deleteStudent(id);
      this.getStudent();

    }
  }

  clearForm() {
    this.studentForms.reset();
    this.isUpdatebtn = false;
  }


  generateMarksheet(id: number | undefined) {
    this.router.navigate(['/marksheet', id])
  }



}
