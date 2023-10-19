export class UserData {
    constructor(
      public id: number,          // Identificador único del usuario.
      public name: string,        // Nombre del usuario.
      public last_name: string,   // Apellido del usuario.
      public email: string,       // Correo electrónico del usuario.
      public password: string,    // Contraseña del usuario.
    ) {
    }
  }