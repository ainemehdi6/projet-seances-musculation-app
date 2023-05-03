import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Exercice } from '../models/exercice';

@Injectable()
export class ExerciceService {

  constructor(private http: HttpClient) { }

  get(): Observable<Exercice[]> {
    return this.http.get<Exercice[]>(environment.iutApiBaseUrl + "/exercices");
  }

  getById(id: number): Observable<Exercice> {
    return this.http.get<Exercice>(environment.iutApiBaseUrl + "/exercices/" + id);
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(environment.iutApiBaseUrl + "/exercices/" + id);
  }

  update(exercice: Exercice): Observable<string> {
    return this.http.put<string>(environment.iutApiBaseUrl + "/exercices/" + exercice.id, exercice);
  }

  create(exercice: Exercice): Observable<string> {
    return this.http.post<string>(environment.iutApiBaseUrl + "/exercices", exercice);
  }
}
