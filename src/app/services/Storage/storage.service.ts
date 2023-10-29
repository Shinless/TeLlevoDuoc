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
    const { value } = await Preferences.get({ key });
    return value;
  }
  async eliminar(key: string) {
    await Preferences.remove({ key });
  }
}
