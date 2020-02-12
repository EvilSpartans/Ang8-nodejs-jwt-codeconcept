import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map, tap} from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class JobService {
  initialJobs = [];
  jobs = [];
  jobsSubject = new Subject();
  searchResultSubject = new Subject();


  BASE_URL = 'http://localhost:4201';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getJobs() {
    return this.http.get<object[]>(this.BASE_URL + '/api/jobs');
  }

  getJobsByUserEmail(userEmail: any) {
    return this.http.get<object[]>(`${this.BASE_URL}/api/job/${userEmail}`);
  }

   getJob(id: any) {
    return this.http.get<object>(this.BASE_URL + `/api/jobs/${id}`);
  }

  addJob(jobData: any, token: any) {
    const authorizationHeader = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    jobData.id = Date.now();
    return this.http.post(this.BASE_URL + '/api/jobs', jobData, { headers: authorizationHeader })
      .pipe(
        map(res => {
          console.log(res);
          this.jobsSubject.next(jobData);
        })
      );
  }



  searchJobs(criteria: any) {
    console.log(criteria);
    return this.http.get<object[]>(`${this.BASE_URL}/api/search/${criteria.term}/${criteria.place}`)
      .pipe(
        tap(res =>  this.searchResultSubject.next(res))
      );
  }

}
