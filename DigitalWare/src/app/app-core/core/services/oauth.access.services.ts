import { Injectable } from '@angular/core';
import { PersistenceInfoService } from 'src/app/utilities/persistence/persistence-info.service';
import { IAuthAccessService } from './oauth.access.interface';

@Injectable({
  providedIn: 'root',
})
export class OAuthAccessService implements IAuthAccessService {
  constructor(private persistence: PersistenceInfoService) {}

  /**
   * Obtener el Token oAuth de ADFS
   */
  public getAccessToken(): string {
    return '';
  }

  /**
   * Obtener el Nombre del Usuario Autenticado
   */
  public getUser(): string {
    let info = JSON.parse(this.persistence.getInfo('record'));
    return info;
  }

  /**
   * Obtener el Nombre de Red del Usuario Autenticado
   */
  public getUserId(): any {
    return '';
  }

  /**
   * Valida si la sesión esta activa
   */
  public validAccessToken(): boolean {
    return true;
  }

  /**
   * Cierra la session activa de ADFS
   */
  public logOut(): void {}

  /**
   * Inicializa el Componente de oauth2-oidc para la autenticacion con ADFS
   */
  public initializeOAuthService(): void {}
}
