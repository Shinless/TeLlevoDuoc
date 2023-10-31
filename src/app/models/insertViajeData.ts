export class insertViajeData{
    constructor(
        public id_conductor: number,
        public Asientos_max: number,
        public precio: number,
        public origen: string,
        public destino: string,
    ){
        
    }
}