import { signal } from "@preact/signals";
import { store } from "../lib/store.ts";
import {
  generateRecoveryKey,
  generateRSAKeys,
  importPrivateKey,
} from "../lib/crypto.ts";
import { selectFile } from "../lib/utils.ts";

const inputType = signal("password");
const privateKey = signal(store.getPrivateKey());
const errorSignal = signal("");

function CreateRecoveryKey() {
  let modal: HTMLDialogElement | null = null;
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
      <button
        class="btn btn-primary btn-outline"
        onClick={() => {
          if (modal == null) return;
          modal.showModal();
        }}
      >
        Load
      </button>
      <dialog ref={(el) => (modal = el)} class="modal">
        <div class="modal-box w-11/12 max-w-5xl">
          <h3 class="text-lg font-bold text-center mb-4">
            Wähle aus wie du deinen privaten Schlüssel hochladen möchtest!
          </h3>
          {privateKey.value == null && (
            <p class="text-error text-center mb-4">{errorSignal.value}</p>
          )}
          <div class="flex flex-col gap-4 items-center">
            <div class="flex gap-4 justify-center">
              <button
                class="btn btn-primary"
                onClick={async () => {
                  const file = (await selectFile("pdf", false)) as string;
                  failedUpload(file, modal);
                }}
              >
                Datei hochladen
              </button>
              <button class="btn btn-primary">QR-Code scannen</button>
            </div>

            <input
              placeholder="******"
              type="password"
              class="input-lg input-primary rounded-lg w-80 text-center"
              onChange={(e) => {
                failedUpload(e.currentTarget.value, modal);
              }}
            ></input>
          </div>
          <div class="modal-action">
            <form method="dialog">
              <button class="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

async function failedUpload(raw: string, modal: HTMLDialogElement | null) {
  try {
    await store.importPrivateKey(raw);
  } catch {
    errorSignal.value =
      "Fehler beim auswerten der Datei. Bitte lad eine valide .txt Datei hoch!";
    return;
  }
  modal?.close();
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
    <div class="flex min-h-[500px]">
      <aside class="w-[384px] h-auto p-4 border-r-2 border-current">
        <ul class="steps steps-vertical">
          <li class="step step-primary">Erstelle deinen Private Key</li>
          <li class="step">Lad deine Familie ein</li>
          <li class="step">Erstelle deinen Tresor</li>
        </ul>
      </aside>

      <main class="flex flex-col mt-12 items-center justify-center w-[1536px] ">
        <section class="flex flex-col justify-center items-center px-4">
          <h2 class="text-2xl font-bold">Erstelle deinen Private Key</h2>
          <p class="text-center leading-relaxed mt-4">
            Der Passkey wird für Sie leserlich dargestellt, vor dem
            Verschlüsseln wird er jedoch in eine unleserliche Zeichenkette
            umgewandelt. <br />
            Dies erhöht die Kryptographie und somit die Sicherheit ihrer Daten.
          </p>

          {privateKey.value == null && CreateRecoveryKey()}
          {privateKey.value !== null && copyRecoveryKey()}

          <hr class="border-t-2 border-gray-500 my-4 w-3/4 mx-auto"></hr>

          <p class="text-center leading-relaxed mt-4 w-3/6">
            Bewahren Sie den Passkey zwingend sicher auf. Dieser ist die
            Grundlage für Ihre privaten Daten. In fremden Händen werden im
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
