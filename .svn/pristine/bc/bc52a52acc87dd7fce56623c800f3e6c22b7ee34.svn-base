import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  }
  // 路由守卫
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      return this.checkLogin();
  }
  checkLogin(): boolean {
      // 判断本地有没有token
      const token = sessionStorage.getItem('access_token');
      // 如果token有值，表示登录成功，继续跳转，否则跳转到首页
      if (token) { return true; }
        this.router.navigate(['/register']);
      return false;
  }
}
