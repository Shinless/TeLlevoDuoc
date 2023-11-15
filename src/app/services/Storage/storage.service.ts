import { Injectable } from '@angular/core';
import {Preferences} from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async guardar(key: string, value: any) {
    await Preferences.set({ key, value });
  }
  async obtener(key: string) {
    console.log(`Llamando a obtener para la clave ${key}`);
    const { value } = await Preferences.get({ key });
    console.log(`Valor obtenido para la clave ${key}:`, value);
    return value;
  }
  async eliminar(key: string) {
    await Preferences.remove({ key });
  }
}
