import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private readonly apiKey = environment.googleMapsApiKey;
  private apiUrl = 'https://maps.googleapis.com/maps/api/directions/json';

  constructor(private http: HttpClient) {}

  getRoute(origin: string, destination: string): Observable<any> {
    const params = `origin=${origin}&destination=${destination}&key=${this.apiKey}`;
    const url = `${this.apiUrl}?${params}`;
    return this.http.get(url);
  }
}
