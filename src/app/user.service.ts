import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
url = 'http://localhost:3000/user'
  constructor(private http:HttpClient) { }
   uploadImage(file)
{
return this.http.post(this.url+'/addimg',file)

}
}