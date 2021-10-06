export class Reservar {
    origen: string;
    destino: string;
    salida: string;
    pasajeros: number;
    nombreApellidos: string;
    correo: string;
    nave: string;
    reservado: boolean;
    constructor() {
        this.origen = '';
        this.destino = '';
        this.salida = '';
        this.pasajeros = 0;
        this.nombreApellidos = '';
        this.correo = '';
        this.nave = '';
    }
}