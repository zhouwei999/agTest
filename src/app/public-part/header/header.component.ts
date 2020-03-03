import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loginUser: any;

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.loginUser = JSON.parse(sessionStorage.getItem('loginUser')); 
  }

  loginOut(): void{
    sessionStorage.removeItem('access_token')
    sessionStorage.removeItem('pageState')
    sessionStorage.removeItem('projectType')
    sessionStorage.removeItem('queryParams')
    this.router.navigate(['/register']);
  }
}
