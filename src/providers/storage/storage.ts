import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class StorageProvider {

  constructor(private storage: Storage) {
  }

  setKeyValue(key, value) {
    if (!key) {
      throw new Error('key is undefinied');
    }
    this.storage.set(key, value);
  }

  getValue(key):Promise<any> {
    return this.storage.get(key);
  }

}
