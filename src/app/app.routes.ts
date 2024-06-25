import { Routes } from '@angular/router';
import { MarksheetComponent } from './marksheet/marksheet.component';
import { StudentComponent } from './student/student.component';

export const routes: Routes = [
    {path:'', redirectTo:'student',pathMatch:'full'},
    {path:'marksheet/:id', component:MarksheetComponent},
    {path:'student',component:StudentComponent},
];
