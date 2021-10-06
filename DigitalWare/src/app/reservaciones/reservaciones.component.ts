import { Component, Input, OnInit } from '@angular/core';
import { GeneralService } from '../app-core/core/services/general.service';
import { PersistenceInfoService } from '../utilities/persistence/persistence-info.service';

@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.component.html',
  styleUrls: ['./reservaciones.component.css']
})
export class ReservacionesComponent implements OnInit {
  listReservas: any;
  constructor(
    private readonly persistenceInfo: PersistenceInfoService) {
    this.listReservas = new Array<any>();
  }

  ngOnInit(): void {
    this.obtenerInformacionReservas();
  }
  /**
     * Obtiene la información de las reservas.
     *
     * @memberof RecordComponent
     */
  obtenerInformacionReservas(): void {
    let items: any = this.persistenceInfo.getInfo('resevado');
    const listaReservacionesRealizadas = JSON.parse(items) as Array<string>;
    listaReservacionesRealizadas.forEach(elemento => {
      this.listReservas.push(elemento);
    });
  }
}
