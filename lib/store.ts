import {
  exportKey,
  importKey,
  importPrivateKey,
  importPublicKey,
} from "./crypto.ts";

class UserStore {
  private recoveryKey: string | null = null;
  private publicKey: CryptoKey | null = null;
  private privateKey: CryptoKey | null = null;

  static async create(): Promise<UserStore> {
    const store = new UserStore();

    store.recoveryKey = sessionStorage.getItem("recoveryKey");

    const publicKey = sessionStorage.getItem("publicKey");
    if (publicKey == null) {
      store.publicKey = null;
    } else {
      store.publicKey = await importPublicKey(publicKey);
    }

    const privateKey = sessionStorage.getItem("privateKey");
    if (privateKey == null) {
      store.privateKey = null;
    } else {
      store.privateKey = await importPrivateKey(privateKey);
    }

    return store;
  }

  getRecoveryKey(): string | null {
    return this.recoveryKey;
  }
  getPublicKey(): CryptoKey | null {
    return this.publicKey;
  }
  getPrivateKey(): CryptoKey | null {
    return this.privateKey;
  }

  setRecoveryKey(recoveryKey: string) {
    this.recoveryKey = recoveryKey;
    sessionStorage.setItem("recoveryKey", recoveryKey);
  }
  async setPublicKey(publicKey: CryptoKey) {
    this.publicKey = publicKey;
    sessionStorage.setItem("publicKey", await exportKey(publicKey));
  }
  async setPrivateKey(privateKey: CryptoKey) {
    this.privateKey = privateKey;
    sessionStorage.setItem("privateKey", await exportKey(privateKey));
  }

  async importPrivateKey(key: string) {
    this.setPrivateKey(await importKey(key, "private"));
  }
}

export const store = await UserStore.create();
