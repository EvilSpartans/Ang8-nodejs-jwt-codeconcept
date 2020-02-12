import { Component, OnInit, HostListener } from '@angular/core';
import { JobService } from '../services/job.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  jobDetails = null;
  error = null;
  errorMessage = '';

  constructor(private jobService: JobService, private activatedRoute: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.jobService.getJob(id)
                    .subscribe(
                      data => {
                        this.handleServerResponse(data);
                      },
                      error => {
                        this.handleError(error);
                      }
                    );
  }

  handleServerResponse(response) {
    if (response.success) {
      this.jobDetails = response.job;
    } else {
      this.errorMessage = response.message;
    }
  }

  handleError(error) {
    console.log('handleError');
    this.error = error;
  }

  // Bouton back
  @HostListener('click')
  onClick() {
    this.location.back();
  }

}
