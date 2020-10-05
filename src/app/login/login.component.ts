import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {CsvService} from '../csv.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[CsvService]
})
export class LoginComponent implements OnInit {

  emailRegex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  showSuccessMessage:boolean;
  serverErrorMessages:string;
    constructor( public csvService:CsvService,private router:Router) { }
  model={
    email:'',
    password:''
  }
  ngOnInit(): void {
  }
  
  onSubmit(form:NgForm){
    this.csvService.login(form.value).subscribe(
      res=>{
        this.csvService.setToken(res['token']);
        this.router.navigateByUrl('/upload');
      },
      err=>{
        this.serverErrorMessages=err.error.message;
      }
    )
  }


}
