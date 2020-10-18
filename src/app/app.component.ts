import { Component } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-interceptor';
  data: any;
  token:string;
  constructor(private loginService: LoginService) {

  }
  ngOnInit() {
    this.loginService.getToken().subscribe(ret => {
      //console.log(ret);
      this.data = ret as JSON;
      this.token=this.data.results.access_token;
      console.log('Json Data:', this.data.results.access_token)
      localStorage.setItem('token',this.token);
    })
  }
}
