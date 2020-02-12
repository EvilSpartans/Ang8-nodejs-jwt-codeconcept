import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  jbbData = null;
  isAuthenticated = false;
  welcomeMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authService.userIsLoggedIn()) {
      this.refleshFlags();
    }
  }

  refleshFlags() {
this.isAuthenticated = true;
this.welcomeMessage = 'Bienvenue';
  }

  login(formData) {
    this.authService.login(formData)
                    .subscribe(
                      data => {
                        this.handleLoginSuccess(data);
                      },
                      error => {
                        this.handleLoginFailure(error);
                      }
                    );
  }

  handleLoginSuccess(data) {
    console.log('success: ', data);
    this.jbbData = data;
    this.isAuthenticated = true;
    this.refleshFlags();
    localStorage.setItem('jbb-data', JSON.stringify(data));
    this.router.navigate(['/profile']);
  }

  handleLoginFailure(error) {
    console.log('failure', error);
  }
}
