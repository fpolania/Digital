import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../app-core/core/services/general.service';
import { GenericMessage } from '../app-core/genericmessage';
import { DefaultConfig } from '../utilities/defaultconfig';
import { PersistenceInfoService } from '../utilities/persistence/persistence-info.service';
import { Reservar } from './entidades/reservar.object';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent implements OnInit {
  reservaForm: FormGroup;
  submit: boolean;
  listAeronaves: any;
  verFormulario: boolean;
  mensajeGenericos: GenericMessage;
  listReservas: Array<Reservar>;
  configDefault: DefaultConfig;
  constructor(private readonly formBuilder: FormBuilder,
    private readonly generalService: GeneralService,
    private readonly persistenceInfo: PersistenceInfoService) {
    this.submit = false;
    this.verFormulario = false;
    this.mensajeGenericos = new GenericMessage();
    this.listReservas = new Array<Reservar>();
    this.configDefault = new DefaultConfig();
  }

  ngOnInit(): void {
    this.instanciaFormulario();
    this.obtenerReservas();
  }
  /**
      * Obtiene la información de las reservas.
      *
      * @memberof RecordComponent
      */
  obtenerReservas(): void {
    let items: any = this.persistenceInfo.getInfo('resevado');
    const listaReservacionesRealizadas = JSON.parse(items) as Array<string>;
    listaReservacionesRealizadas.forEach(elemento => {
      this.listReservas.push(elemento as any);
    });
  }
  /**
   * Realiza la instancia del formulario.
   *
   * @memberof ReservarComponent
   */
  instanciaFormulario() {
    this.reservaForm = this.formBuilder.group({
      origen: ['', [Validators.required, Validators.pattern('^([a-zA-Z]*)')]],
      destino: ['', [Validators.required, Validators.pattern('^([a-zA-Z]*)')]],
      salida: ['', [Validators.required]],
      pasajeros: ['', [Validators.required, Validators.pattern('^([0-9]*)'), Validators.maxLength(4)]],
      nombreApellidos: ['', [Validators.required, Validators.pattern('^[a-zA-Z_]+( [a-zA-Z_]+)*')]],
      correo: ['', [Validators.required, Validators.email]],
      nave: ['']
    })
    this.obtenerInformacionReservas();
  }
  get reservaControl(): any {
    return this.reservaForm.controls;
  }

  /**
   *Limpia el formulario
   *
   * @memberof ReservarComponent
   */
  limpiarForm(): void {
    this.reservaForm.reset();
  }

  /**
   *Guarda las reservaciones realizadas.
   *
   * @memberof ReservarComponent
   */
  guardarReservacion() {
    if (this.reservaForm.invalid) {
      this.submit = true;
    } else {
      let items = new Reservar();
      items = this.prepararInformacion();
      const existe = this.listReservas.find(x => x.nave === items.nave);
      if (!existe) {
        this.listReservas.push(items);
        this.persistenceInfo.setInfo('resevado', JSON.stringify(this.listReservas))
        this.mensajeGenericos.showMessage('success', DefaultConfig.DEFAULT_TEXT_APP.mensajeSuccess, 3000);
      } else {
        this.mensajeGenericos.showMessage('info', DefaultConfig.DEFAULT_TEXT_APP.mensajeInfo, 3000);
      }
      this.verFormulario = false;
      this.limpiarForm();
    }
  }
  /**
   * Obtiene la información de las aeronaves.
   *
   * @memberof RecordComponent
   */
  obtenerInformacionReservas(): void {
    this.generalService.getInformation().subscribe((rs: any) => {
      this.listAeronaves = rs.ListAeronaves;
    });
  }

  /**
   * Presenta el formulario.
   *
   * @param {*} item
   * @memberof ReservarComponent
   */
  rentarAeronaves(item: any): void {
    this.verFormulario = true;
    this.reservaForm.patchValue({
      pasajeros: item.capacidad,
      nave: item.nombre
    });
    this.reservaForm.controls.nave.disable();
    this.reservaForm.controls.pasajeros.disable();
  }
  /**
   * Prepara la información para guardar.
   *
   * @return {*}  {ObjectRecord}
   * @memberof RecordComponent
   */
  prepararInformacion(): Reservar {
    const reservaObject = new Reservar();
    reservaObject.origen = this.reservaForm.controls.origen.value;
    reservaObject.destino = this.reservaForm.controls.destino.value;
    reservaObject.salida = this.reservaForm.controls.salida.value;
    reservaObject.pasajeros = this.reservaForm.controls.pasajeros.value;
    reservaObject.nombreApellidos = this.reservaForm.controls.nombreApellidos.value;
    reservaObject.correo = this.reservaForm.controls.correo.value;
    reservaObject.nave = this.reservaForm.controls.nave.value;
    reservaObject.reservado = true;
    return reservaObject;
  }
}
