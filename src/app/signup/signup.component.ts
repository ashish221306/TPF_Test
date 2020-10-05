import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {CsvService} from '../csv.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers:[CsvService]
})
export class SignupComponent implements OnInit {
emailRegex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
showSuccessMessage:boolean;
serverErrorMessages:string;
  constructor( public csvService:CsvService) { }

  ngOnInit(): void {
   
  }

  onSubmit(form:NgForm){
    this.csvService.postUser(form.value).subscribe(
      res=>{
        this.showSuccessMessage=true;

        setTimeout(()=>{
          this.showSuccessMessage=false
        },4000);

        this.resetForm(form);

      },
      err=>{
        if(err.status==422){
          this.serverErrorMessages=err.error.join('</br>');
        }else{
          this.serverErrorMessages='something went wrong , please contact admin'
        }
      }
    )
  }
  
  resetForm(form:NgForm){
    this.csvService.selectedUser={
      fullname:"",
      email:"",
      password:""
    }
    form.resetForm();
    this.serverErrorMessages=''
  }
}
