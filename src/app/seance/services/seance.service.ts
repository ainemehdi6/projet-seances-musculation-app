import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Seance } from '../models/seance';

@Injectable()
export class SeanceService {

  constructor(private http: HttpClient) { }

  get(): Observable<Seance[]> {
    return this.http.get<Seance[]>(environment.iutApiBaseUrl + "/seances");
  }

  getById(id: number): Observable<Seance> {
    return this.http.get<Seance>(environment.iutApiBaseUrl + "/seances/" + id);
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(environment.iutApiBaseUrl + "/seances/" + id);
  }

  update(seance: Seance): Observable<string> {
    return this.http.put<string>(environment.iutApiBaseUrl + "/seances/" + seance.id, seance);
  }

  create(seance: Seance): Observable<string> {
    return this.http.post<string>(environment.iutApiBaseUrl + "/seances", seance);
  }
}
