import { signal } from "@preact/signals";
import { store } from "../lib/store.ts";
import { generateRecoveryKey, generateRSAKeys } from "../lib/crypto.ts";

const inputType = signal("password");
const privateKey = signal(store.getPrivateKey());

function createRecoveryKey() {
  return (
    <div>
      <button
        class="btn btn-primary btn-outline"
        onClick={async () => {
          const keys = await generateRSAKeys();
          store.setRecoveryKey(generateRecoveryKey());
          store.setPrivateKey(keys.privateKey);
          store.setPublicKey(keys.publicKey);
          privateKey.value = store.getPrivateKey();
        }}
      >
        Create
      </button>
      <button class="btn btn-primary btn-outline">Load</button>
    </div>
  );
}

function copyRecoveryKey() {
  return (
    <>
      <ul class="justify-items-center">
        <li class="justify-items-center w-3/6 mt-8">
          <h3 class="text-xl font-semibold">Private Key kopieren</h3>
          <p class="text-center leading-relaxed mt-4">
            Dies lohnt sich, wenn Sie einen sicheren Passwort-Tresor wie
            beispielsweise Bitwarden nutzen. Automatisches speichern via
            Smartphone oder Internet-Browser ist ausdrücklich nicht
            empfehlenswert.
          </p>
          <button class="btn btn-outline btn-primary mt-4">Kopieren</button>
        </li>
        <hr class="border-t-2 border-gray-500 my-4 w-1/4 mx-auto"></hr>
        <li class="justify-items-center w-3/6 mt-8">
          <h3 class="text-xl font-semibold">Private Key herunterladen</h3>
          <p class="text-center leading-relaxed mt-4">
            Auf einem privaten Gerät herunterladen.
          </p>
          <button class="btn btn-outline btn-primary mt-4">
            Herunterladen
          </button>
        </li>
        <hr class="border-t-2 border-gray-500 my-4 w-1/4 mx-auto"></hr>
        <li class="justify-items-center w-3/6 mt-8">
          <h3 class="text-xl font-semibold">Private Key ausdrucken</h3>
          <p class="text-center leading-relaxed mt-4">
            Eine ausgedruckte Version schützt nicht nur vor Hackern, sondern
            auch vor einem defekten Endgerät. Bewahren Sie das ausgedruckte
            Exemplar an einem sicheren und nicht für andere zugänglich. Hierfür
            eigenet sich ein häuslicher Tersor oder ein Bankschließfach.
          </p>
          <button class="btn btn-outline btn-primary mt-4">Ausdrucken</button>
        </li>
      </ul>
    </>
  );
}

export default function CreateRecover() {
  return (
    <main class="flex flex-col mt-12 items-center justify-center">
      <section class="flex flex-col justify-center items-center w-[80%] h-[80%] border-x-2 border-current px-4">
        <h2 class="text-2xl font-bold">Erstelle deinen Private Key</h2>
        <p class="text-center leading-relaxed mt-4">
          Der Passkey wird für Sie leserlich dargestellt, vor dem Verschlüsseln
          wird er jedoch in eine unleserliche Zeichenkette umgewandelt. <br />
          Dies erhöht die Kryptographie und somit die Sicherheit ihrer Daten.
        </p>

        {privateKey.value === null && createRecoveryKey()}
        {privateKey.value !== null && copyRecoveryKey()}

        <hr class="border-t-2 border-gray-500 my-4 w-3/4 mx-auto"></hr>

        <p class="text-center leading-relaxed mt-4 w-3/6">
          Bewahren Sie den Passkey zwingend sicher auf. Dieser ist die Grundlage
          für Ihre privaten Daten. In fremden Händen werden im schlimmsten Fall
          all Ihre Daten abgegriffen.
          <br />
          Der Passkey ist ebenfalls für die Abänderung Ihrer Daten notwendig.
        </p>
      </section>
      <a href="/dev/Family">
        <button class="btn btn-primary w-40 mt-8 mb-12">Weiter</button>
      </a>
    </main>
  );
}
