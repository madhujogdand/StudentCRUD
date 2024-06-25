import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StudentService } from '../student/student.service';
import jsPDF from 'jspdf';



@Component({
  selector: 'app-marksheet',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './marksheet.component.html',
  styleUrl: './marksheet.component.css'
})
export class MarksheetComponent implements OnInit {



  constructor(private route: ActivatedRoute, private router: Router, private studentService: StudentService) { }

  //student:string[]=[];
  id: string | unknown;
  stud: any;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.stud = this.studentService.getStudentById(id);
    })
  }

  calTotal(marks1: number, marks2: number, marks3: number) {
    let total = marks1 + marks2 + marks3;
    return total;
  }

  calPercentage(marks1: number, marks2: number, marks3: number) {
    const total = marks1 + marks2 + marks3;
    const percentage = (total / 300) * 100;
    return percentage.toFixed(2);
  }

  calGrade(marks1: number, marks2: number, marks3: number,) {
    const avgMarks = (marks1 + marks2 + marks3) / 3;


    if (avgMarks >= 85) {
      return 'First class with distinction';
    }
    else if (avgMarks >= 75) {
      return 'First class';
    }
    else if (avgMarks >= 60) {
      return 'Second class';
    }
    else if (avgMarks >= 35) {
      return 'Third class';
    }
    else {
      return 'fail';
    }
  }

  goBack() {
    this.router.navigate(['/student', { id: this.id }]);
  }

  printDetails() {

    const pdf = new jsPDF();

    // Add content to the PDF
    pdf.text('Student Mark Sheet', 10, 10);
    pdf.text('University Name: Swami Ramanand Teerth Marathwada University', 10, 20);
    pdf.text(`Student ID: ${this.stud?.id}`, 10, 30);
    pdf.text(`Student Name: ${this.stud?.name}`, 10, 40);

    // Subjects and Marks
    pdf.text('Subjects:', 10, 60);
    pdf.text('Angular:', 20, 70);
    pdf.text(`${this.stud?.marks1}`, 100, 70);

    pdf.text('Java:', 20, 80);
    pdf.text(`${this.stud?.marks2}`, 100, 80);

    pdf.text('SQL:', 20, 90);
    pdf.text(`${this.stud?.marks3}`, 100, 90);

    // Total
    pdf.text('Total:', 20, 100);
    pdf.text(`${this.calTotal(this.stud?.marks1, this.stud?.marks2, this.stud?.marks3)}`, 100, 100);

    // Percentage
    pdf.text('Percentage:', 20, 110);
    pdf.text(`${this.calPercentage(this.stud?.marks1, this.stud?.marks2, this.stud?.marks3)}%`, 100, 110);

     // Percentage
     pdf.text('Grade:', 20, 120);
     pdf.text(`${this.calGrade(this.stud?.marks1, this.stud?.marks2, this.stud?.marks3)}`, 100, 120);

    // Save the PDF
    pdf.save('marksheet.pdf');
  }




}
