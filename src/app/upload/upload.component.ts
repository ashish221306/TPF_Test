
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CsvService } from '../csv.service';
import {FileSelectDirective,FileUploader} from 'ng2-file-upload'
const uri='http://localhost:3000/upload';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  serverErrorMessages="";
  showSuccessMessage:boolean;

  uploader:FileUploader=new FileUploader({url:uri});

  constructor(public csvService:CsvService) { 
    this.uploader._onCompleteItem=(item:any,response:any,status:any,headers:any)=>{
      this.showSuccessMessage=true;
    }
  }

  ngOnInit(): void {
  }


  onSubmit(form:NgForm){
    this.csvService.postFile(form.value).subscribe(
      res=>{
        this.showSuccessMessage=true;

        setTimeout(()=>{
          this.showSuccessMessage=false
        },4000);

      },
      err=>{
        if(err){
         console.log(err)
        }else{
          this.serverErrorMessages='something went wrong , please contact admin'
        }
      }
    )
  }
  






}
