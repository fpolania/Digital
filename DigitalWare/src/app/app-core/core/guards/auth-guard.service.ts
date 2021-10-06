import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { OAuthAccessService } from '../services/oauth.access.services';

@Injectable()
export class AuthGuardService implements CanActivate {
  public token: string;

  constructor(
    private router: Router,
    private oauthAccessService: OAuthAccessService
  ) {}

  canActivate(
    routeAc: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.oauthAccessService.getUser() !== '') {
      return true;
    }
    return false;
  }
}
