import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserData } from 'src/app/models/UserData';
import { InsertUserData } from 'src/app/models/InsertUserData';


@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  url_get_users = 'https://dvjtzzodnvqhhqggdlmi.supabase.co/rest/v1/Users';
  apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2anR6em9kbnZxaGhxZ2dkbG1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcyNjUwMjAsImV4cCI6MjAxMjg0MTAyMH0.XjwINyOnwnZC-r9BCUEEKk5KlIwjBbVwa_jU-v03wt0';
  Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6IlgvNU5OTHhDaFhZeXgrMmciLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjk3NTY5NTE3LCJpYXQiOjE2OTc1NjU5MTcsImlzcyI6Imh0dHBzOi8vZHZqdHp6b2RudnFoaHFnZ2RsbWkuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjM0ZDhlNTU3LWQxMGQtNGZiMi04MzAyLTU1ZDJkOWY5N2U1ZSIsImVtYWlsIjoiZXN0LnJvamFzb0BkdW9jdWMuY2wiLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7fSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJvdHAiLCJ0aW1lc3RhbXAiOjE2OTc1NjU5MTd9XSwic2Vzc2lvbl9pZCI6IjdiMzMyNjgxLTBjZDUtNDJhOS04NDg0LTQxNWQ0Y2FhYjA3YSJ9.TfkyEAAaoclP8OjqlI9SKEglC6jT5ieXnqimJwugZkM '

  constructor(private _http: HttpClient) { 

  }
  header = new HttpHeaders()
    .set('apikey',this.apikey);
  
  getUsers(): Observable<UserData[]> {
    return this._http.get<UserData[]>(this.url_get_users + '?select=*',{headers: this.header, responseType: 'json'});
  }

  getUserByEmail(email: string, password: string): Observable<UserData[]> {
    return this._http.get<UserData[]>(this.url_get_users + `?email=eq.${email}` + `&password=eq.${password}`+'&select=*',{headers: this.header, responseType: 'json'});
  }

  insertUser(user: InsertUserData): Observable<InsertUserData> {
    return this._http.post<InsertUserData>(this.url_get_users,user,{headers: this.header.set('Authorization', this.Authorization), responseType: 'json'});
  }

}
