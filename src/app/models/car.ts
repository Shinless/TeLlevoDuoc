export class car{
    constructor(
        public id_car: number, //Id unica de cada auto
        public id_user: number, //Id del usuario que posee el auto
        public model: string, //Modelo del auto
        public color: string, //Color del auto, para identificacion al momento del viaje
        public patente: string, //Patente del auto
        public year: number, //Año del auto

    ){
        
    }
}

    