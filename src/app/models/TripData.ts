export class TripData{
    constructor(
        public user_email: string, //Para servir de PK
        public id_travel: number, //Id unica de cada viaje
        public description: string, //Pequeña descripcion del viaje
        public seats: number, //Cantidad de asientos disponibles
        public passenger_price: number, //Precio por pasajero, puede ser 0
        public destiny: number, //lugar del destino
    ){
        
    }
}