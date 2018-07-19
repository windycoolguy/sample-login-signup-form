import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { AlertsService } from 'angular-alert-module';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.css']
})
export class ResetpassComponent implements OnInit {

  constructor(private router: Router, private http: Http, private alerts: AlertsService) { }

  ngOnInit() {

  }

  onFormSubmit(form) {
    const password = form.value.password;
    const oldpassword = form.value.oldpassword;
    const email = sessionStorage.getItem('token');
    //console.log(email);
    if (email && password) {
      const data = {'email': email,'oldpassword': oldpassword,'password': password};
      // console.log(data);return;
      this.http.post('http://localhost:8080/user/resetpass', data)
      .subscribe( res => {
          const state = res.json().state;
          const message = res.json().message;
          if (state === 1) {
            this.alerts.setMessage(message, 'success');
            this.router.navigate(['/user']);
          } else {
            this.alerts.setMessage(message, 'error');
          }
        });
    } else {
      // this.alerts.setMessage('Password does not March!', 'error');
      this.router.navigate(['/register']);
    }
    // this.router.navigateByUrl('/');
  }
}
