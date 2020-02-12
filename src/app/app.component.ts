import { Component, OnInit } from '@angular/core';
import { JobService } from './services/job.service';
import { fadeAnimation } from './animation/fadeanimation';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation]

})
export class AppComponent implements OnInit {

  title = 'AnguNode';

  jobs = [];

  constructor(private jobService: JobService, private authService: AuthService) { }

  ngOnInit() {
  }

  searchJobs(searchData) {
    this.jobService.searchJobs(searchData)
                    .subscribe(
                      data => this.jobs = data,
                      error => console.error(error)
                    );
  }

  prepareRoute(outlet: RouterOutlet) {
    // tslint:disable-next-line: no-string-literal
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
