import { Injectable } from '@angular/core';
import { PersistenceService, StorageType } from 'angular-persistence';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class PersistenceInfoService {

  private readonly keyApp: string;
  private readonly ivHexCode: string;
  private readonly ivHex: any;

  constructor(private readonly persistence: PersistenceService) {
    this.keyApp = `${environment.DigitalKeyApp}`;
    this.ivHexCode = `${environment.DigitalHexIVCrypto}`;
    this.ivHex = CryptoJS.enc.Hex.parse(this.ivHexCode);
  }

  public Encrypt(word: string, keyWord: string, isNameVar: boolean = false): string {
    let ciphertext: any;
    if (isNameVar) {
      ciphertext = CryptoJS.MD5(word, keyWord as any);
    } else {
      const base64Key = CryptoJS.enc.Base64.parse(keyWord);
      const utf8 = CryptoJS.enc.Utf8.parse(word);
      ciphertext = CryptoJS.AES.encrypt(utf8, base64Key, {
        iv: this.ivHex,
        mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7
      });
    }

    return ciphertext.toString();
  }

  public Decrypt(word: string, keyWord: string): string {
    const base64Key = CryptoJS.enc.Base64.parse(keyWord);
    const bytes = CryptoJS.AES.decrypt(word.toString(), base64Key, {
      iv: this.ivHex,
      mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7
    });

    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext.toString();
  }

  public setInfo(name: string, value: string) {
    const encName = this.Encrypt(name, this.keyApp, true);
    const encValue = this.Encrypt(value, this.keyApp, false);
    this.persistence.set(encName, encValue, { type: StorageType.SESSION });
  }

  public remove(key: string) {
    const eKey = this.Encrypt(key, this.keyApp, true);
    this.persistence.remove(eKey, StorageType.SESSION);
  }

  public removeAll() {
    this.persistence.removeAll(StorageType.SESSION);
  }

  public getInfo(name: string) {
    const encName = this.Encrypt(name, this.keyApp, true);
    if (this.existInfo(name)) {
      const encValue = this.persistence.get(encName, StorageType.SESSION).toString();
      const decValue = this.Decrypt(encValue, this.keyApp);
      return decValue;
    } else {
      return null;
    }
  }

  public existInfo(name: string): boolean {
    const encName = this.Encrypt(name, this.keyApp, true);
    return (this.persistence.get(encName, StorageType.SESSION) != null);
  }
}
