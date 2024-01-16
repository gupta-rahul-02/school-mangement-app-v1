import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { MatModule } from 'src/app/appModules/mat/mat.module';
import { StudentsComponent } from './students/students.component';
import { TeachersComponent } from './teachers/teachers.component';
import { AllComponent } from './all/all.component';


@NgModule({
  declarations: [
    UsersComponent,
    StudentsComponent,
    TeachersComponent,AllComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatModule
  ]
})
export class UsersModule { }
