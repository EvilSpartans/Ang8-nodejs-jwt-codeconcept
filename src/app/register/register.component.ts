import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  register(formData: any) {
this.authService.register(formData)
          .subscribe(
                      data => {
                        this.handleregisterSuccess(data);
                      },
                      error => {
                        this.handleregisterFailure(error);
                      }
                    );
  }

  handleregisterSuccess(data: any) {
    console.log('success', data);
    localStorage.setItem('jbb-data', JSON.stringify(data));
    this.router.navigate(['/']);
  }

  handleregisterFailure(error) {
    console.log('failure', error);
  }

}
