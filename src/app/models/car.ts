export class car{
    constructor(
        public Fec_Reg: Date, //Id unica de cada auto
        public Patente_id: string, //Id del usuario que posee el auto
        public Marca: string, //Modelo del auto
        public Modelo: string, //Color del auto, para identificacion al momento del viaje
        public Id_Dueño: bigint //Patente del auto
    ){
        
    }
}

    