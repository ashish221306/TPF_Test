import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User} from './user.model';
import { Upload} from './upload.model';
import {environment} from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CsvService {

selectedFile:Upload={
  file:''
}
  selectedUser:User={
    fullname:'',
    email:'',
    password:''
  }
  constructor( private http:HttpClient) { }
   
postUser(user:User){
  return this.http.post(environment.apiBaseUrl+'/register',user)
}

login(authCredentials){
  return this.http.post(environment.apiBaseUrl+'/login',authCredentials)
 }

 setToken(token:string){
   localStorage.setItem('token',token)
 }
 deleteToken(){
   localStorage.removeItem('token')
 }
 getUserPayload(){
   var token=localStorage.getItem('token')
   if(token){
     var userPayload=atob(token.split('.')[1]);
     return JSON.parse(userPayload);
   }else{
     return null;
   }
 }

 postFile(file:Upload){
  return this.http.post(environment.apiBaseUrl+'/upload',file)
 }



}
