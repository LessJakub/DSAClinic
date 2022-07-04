import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PatientData } from '../shared/interfaces/patient-data';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private baseURL: string = "http://" + location.hostname;
  private queryPatientsURL: string = this.baseURL + "/v1/Patients/q";
  private patientDetailURL: string = this.baseURL + "/v1/Patients/";
  private addPatientURL: string = this.baseURL + "/v1/Patients";

  constructor(private http: HttpClient,
              private as: AccountService) { }

  getAllPatients(query: string) : Observable<PatientData[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("name", query);
    
    let token: string;
    this.as.currentUser$.subscribe(user => token = user?.token);

    console.log(`Querying for ${query}`);

    return this.http.get<PatientData[]>(this.queryPatientsURL,
      { headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': "Bearer " + token}),
        params: queryParams
      });
  }

  getPatientDetails(patientId: number): Observable<PatientData> {
    let token: string;
    this.as.currentUser$.subscribe(user => token = user?.token);

    return this.http.get<PatientData>(this.patientDetailURL + patientId.toString(),
      { headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': "Bearer " + token})}
      );
  }

  addPatient(patient: PatientData): void {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("name", patient.name);
    queryParams = queryParams.append("surname", patient.surname);
    queryParams = queryParams.append("pesel", patient.pesel);

    console.log(queryParams);
    
    let token: string;
    this.as.currentUser$.subscribe(user => token = user?.token);

    console.log(token);

    this.http.post<any>(this.addPatientURL, {name: patient.name, surname: patient.surname, pesel: patient.pesel},
      { 
        headers: new HttpHeaders({'Content-Type': 'application/json-patch+json', 'Authorization': "Bearer " + token}),
      }).subscribe({
        next: data => {
          console.log('Patient added');
        },
        error: error => {
            console.error('There was an error!', error);
        }
    });
  }
}

