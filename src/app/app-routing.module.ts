import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UploadComponent } from './upload/upload.component';
import { SignupComponent } from './signup/signup.component';

const routes:Routes=[
  {path:'login',component:LoginComponent},
  {path:'upload',component:UploadComponent},
  {path:'signup',component:SignupComponent},
  {path:'',redirectTo:'/signup',pathMatch:'full'},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
