import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import * as data from 'src/data.reservas.json';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  baseUrl: string;
  constructor(private readonly http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  /**
   * Obtiene la información de los paises con sus respectivos departamentos.
   *
   * @return {*}
   * @memberof GeneralService
   */
  getInformation() {
    return of((data as any).default);
  }
}
