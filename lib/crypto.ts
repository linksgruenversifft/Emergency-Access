import { store } from "./store.ts";
import { ab2str, str2ab } from "./utils.ts";

export function generateRecoveryKey(): string {
  const recoveryKey = new TextDecoder().decode(
    crypto.getRandomValues(new Uint8Array(64))
  );
  sessionStorage.setItem("recoveryKey", recoveryKey);
  return recoveryKey;
}

export async function wrapRecoveryKey(): Promise<string | null> {
  const recoveryKey = sessionStorage.getItem("recoveryKey");
  if (recoveryKey == null) {
    return null;
  }
  const encrypted = await encryptRSA(
    store.getPublicKey()!,
    new TextEncoder().encode(recoveryKey)
  );
  return new TextDecoder().decode(encrypted);
}

export async function unwrapRecoveryKey(
  encryptedRecoveryKey: string
): Promise<string> {
  const decrypted = await decryptRSA(
    store.getPrivateKey()!,
    new TextEncoder().encode(encryptedRecoveryKey)
  );
  return new TextDecoder().decode(decrypted);
}

export async function generateRSAKeys(): Promise<CryptoKeyPair> {
  const keys = (await crypto.subtle.generateKey(rsaAlgorithm, true, [
    "encrypt",
    "decrypt",
  ])) as CryptoKeyPair;
  return keys;
}

export async function encryptRSA(
  publicKey: CryptoKey,
  data: ArrayBuffer
): Promise<ArrayBuffer> {
  return await crypto.subtle.encrypt(rsaAlgorithm, publicKey, data);
}

export async function decryptRSA(
  privateKey: CryptoKey,
  data: ArrayBuffer
): Promise<ArrayBuffer> {
  return await crypto.subtle.decrypt(rsaAlgorithm, privateKey, data);
}

export async function exportKey(key: CryptoKey): Promise<string> {
  const format = key.type === "public" ? "spki" : "pkcs8";
  const publicKey = await globalThis.crypto.subtle.exportKey(format, key);
  const exportedAsString = ab2str(publicKey);
  const exportedAsBase64 = globalThis.btoa(exportedAsString);
  return exportedAsBase64;
}

export async function importPrivateKey(str: string): Promise<CryptoKey> {
  return await importKey(str, "private");
}

export async function importPublicKey(str: string): Promise<CryptoKey> {
  return await importKey(str, "public");
}

export async function importKey(str: string, type: string): Promise<CryptoKey> {
  const format = type === "public" ? "spki" : "pkcs8";
  const usage = type === "public" ? "encrypt" : "decrypt";
  const exportedAsString = globalThis.atob(str);
  const exportedAsArray = str2ab(exportedAsString);
  const publicKey = await globalThis.crypto.subtle.importKey(
    format,
    exportedAsArray,
    rsaAlgorithm,
    true,
    [usage]
  );
  return publicKey;
}

const rsaAlgorithm = {
  name: "RSA-OAEP",
  hash: "SHA-256",
  modulusLength: 4096,
  publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
} as RsaOaepParams;
