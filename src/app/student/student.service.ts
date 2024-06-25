import { Injectable } from '@angular/core';
import { Student } from './studentDTO';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

studentList:Student[]=[];

private id:number=1;

  constructor() { 
    this.studentList.push({id:1,name:"Madhur",marks1:70,marks2:80,marks3:75});
  }
  generateStudentId():number{
    this.id++;
    return this.id;
  }

  public getStudent():Student[]{
    return this.studentList;

  }
 
  public addStudent(stud:Student):void
  {
    stud.id=this.generateStudentId();
     this.studentList.push({id:stud.id,name:stud.name,marks1:stud.marks1,marks2:stud.marks2,marks3:stud.marks3});
  }

  public updateStudent(stud:Student):void
  {
    for(let i=0;i<this.studentList.length;i++)
    {
      if(this.studentList[i].id===stud.id)
      {
        this.studentList[i].name=stud.name;
        this.studentList[i].marks1=stud.marks1;
        this.studentList[i].marks2=stud.marks2;
        this.studentList[i].marks3=stud.marks3;
        break;
      }
    }
  }

  public deleteStudent(id:number|undefined)
  {
     let i=0;
     for(;i<this.studentList.length;i++)
     {
      if(this.studentList[i].id===id)
      {
        break;
      }
     }
     this.studentList.splice(i,1);
  }

  public getStudentById(id:number):Student | undefined
  {
     return this.studentList.find(Student=>Student.id===id);
  }
}


