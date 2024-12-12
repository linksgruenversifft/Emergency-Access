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
      <button class="btn btn-primary btn-outline" onClick={() => {}}>
        Load
      </button>
    </div>
  );
}

function copyRecoveryKey() {
  return (
    <>
      <ul class="justify-items-center">
        <li class="justify-items-center w-3/6 mt-8">
          <h3 class="">Private Key kopieren</h3>
          <p class="">
            Dies lohnt sich, wenn Sie einen sicheren Passwort-Tresor wie
            beispielsweise Bitwarden nutzen. Automatisches speichern via
            Smartphone oder Internet-Browser ist ausdrücklich nicht
            empfehlenswert.
          </p>
          <button class="btn btn-outline btn-primary mt-4">Kopieren</button>
        </li>

        <hr class="border-t-2 border-gray-500 my-4 w-1/4 mx-auto"></hr>

        <li class="justify-items-center w-3/6 mt-8">
          <h3 class="">Private Key herunterladen</h3>
          <p class="">Auf einem privaten Gerät herunterladen.</p>
          <button class="btn btn-outline btn-primary mt-4">
            Herunterladen
          </button>
        </li>

        <hr class="border-t-2 border-gray-500 my-4 w-1/4 mx-auto"></hr>

        <li class="justify-items-center w-3/6 mt-8">
          <h3 class="">Private Key ausdrucken</h3>
          <p class="">
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

export default function HandleRecover() {
  return (
    <div class="flex">
      <aside class="flex w-[350px] min-h-[700px] border-r-2 border-primary-content">
        <ul class="steps steps-vertical m-auto">
          <li class="step step-primary">Privaten Schlüssel erstellen</li>
          <li class="step">Familie / Freunde einladen</li>
          <li class="step">Tresor erstellen</li>
          <li class="step">Fertig!</li>
        </ul>
      </aside>

      <main class="w-full flex flex-col items-center mt-8">
        <section class="flex flex-col items-center">
          <h2 class="text-center text-2xl font-semibold ">
            Erstelle deinen privaten Schlüssel
          </h2>
          <div>
            <p>
              Hier kannst du dir ganz einfach deinen privaten Schlüssel
              erstellen
            </p>
          </div>

          {privateKey.value === null && createRecoveryKey()}
          {privateKey.value !== null && copyRecoveryKey()}
          <p class="">
            Bewahren Sie den privaten Schlüssel zwingend sicher auf. Dieser ist
            die Grundlage für Ihre privaten Daten. In fremden Händen werden im
            schlimmsten Fall all Ihre Daten abgegriffen.
            <br />
            Der Passkey ist ebenfalls für die Abänderung Ihrer Daten notwendig.
          </p>
        </section>

        <a href="/dev/Family">
          <button class="btn btn-primary w-40 mt-8 mb-12">Weiter</button>
        </a>
      </main>
    </div>
  );
}
