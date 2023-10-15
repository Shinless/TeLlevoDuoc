import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserData } from 'src/app/models/UserData';


@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  url_get_users = 'https://dvjtzzodnvqhhqggdlmi.supabase.co/rest/v1/Users';
  apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2anR6em9kbnZxaGhxZ2dkbG1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcyNjUwMjAsImV4cCI6MjAxMjg0MTAyMH0.XjwINyOnwnZC-r9BCUEEKk5KlIwjBbVwa_jU-v03wt0';


  constructor(private _http: HttpClient) { 

  }
  header = new HttpHeaders()
    .set('apikey',this.apikey);
  
  getUsers(): Observable<UserData[]> {
    return this._http.get<UserData[]>(this.url_get_users + '?select=*',{headers: this.header, responseType: 'json'});
  }

  getUserByEmail(email: string): Observable<UserData[]> {
    return this._http.get<UserData[]>(this.url_get_users + `?email=eq.${email}`,{headers: this.header, responseType: 'json'});
  }

}
