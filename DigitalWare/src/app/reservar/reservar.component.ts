import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../app-core/core/services/general.service';
import { GenericMessage } from '../app-core/genericmessage';
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
  constructor(private readonly formBuilder: FormBuilder,
    private readonly generalService: GeneralService,
    private readonly persistenceInfo: PersistenceInfoService) {
    this.submit = false;
    this.verFormulario = false;
    this.mensajeGenericos = new GenericMessage();
    this.listReservas = new Array<Reservar>();
  }

  ngOnInit(): void {
    this.instanciaFormulario();
  }
  instanciaFormulario() {
    this.reservaForm = this.formBuilder.group({
      origen: ['', [Validators.required, Validators.pattern('^([a-zA-Z]*)')]],
      destino: ['', [Validators.required, Validators.pattern('^([a-zA-Z]*)')]],
      salida: ['', [Validators.required]],
      pasajeros: ['', [Validators.required, Validators.pattern('^([0-9]*)'), Validators.maxLength(4)]],
      nombreApellidos: ['', [Validators.required, Validators.pattern('^([a-zA-Z]*)')]],
      correo: ['', [Validators.required, Validators.email]],
      nave: ['']
    })
    this.obtenerInformacionReservas();
  }
  get reservaControl(): any {
    return this.reservaForm.controls;
  }
  limpiarForm(): void {
    this.reservaForm.reset();
  }
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
        this.mensajeGenericos.showMessage('success', 'Se guardo correctamente', 3000);
      } else {
        this.mensajeGenericos.showMessage('info', 'Ya tiene una reservación para esta Aeronave', 3000);
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
   * Prepara la información.
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
