import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CoronaService {

  constructor(private http:HttpClient) { }

  getCorona() {
   return  this.http.get('http://localhost:3000/api/corona/getHistory')

  }
}
