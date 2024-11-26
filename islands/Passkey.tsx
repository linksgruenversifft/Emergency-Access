import { signal } from "@preact/signals";

const passkey = signal("password");
const showPassword = () => {
  if (passkey.value === "password") {
    passkey.value = "text";
  } else {
    passkey.value = "password";
  }
};

export default function CreatePasskey() {
  return (
    <main class="flex flex-col mt-12 items-center justify-center">
      <section class="flex flex-col justify-center items-center w-[80%] h-[80%] border-x-2 border-current px-4">
        <h2 class="text-2xl font-bold">Erstelle deinen Passkey</h2>
        <p class="text-center leading-relaxed mt-4">
          Der Passkey wird für Sie leserlich dargestellt, vor dem Verschlüsseln
          wird er jedoch in eine unleserliche Zeichenkette umgewandelt. <br />
          Dies erhöht die Kryptographie und somit die Sicherheit ihrer Daten.
        </p>
        <input
          readOnly
          type={passkey}
          class="input input-bordered w-[25%] mt-8"
          value="1234"
        />
        <button class="btn btn-primary w-40 mt-8" onClick={showPassword}>
          Passkey anzeigen
        </button>

        <hr class="border-t-2 border-gray-500 my-4 w-3/4 mx-auto"></hr>

        <ul class="justify-items-center">
          <li class="justify-items-center w-3/6 mt-8">
            <h3 class="text-xl font-semibold">Passkey kopieren</h3>
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
            <h3 class="text-xl font-semibold">Passkey herunterladen</h3>
            <p class="text-center leading-relaxed mt-4">
              Auf einem privaten Gerät herunterladen.
            </p>
            <button class="btn btn-outline btn-primary mt-4">
              Herunterladen
            </button>
          </li>
          <hr class="border-t-2 border-gray-500 my-4 w-1/4 mx-auto"></hr>
          <li class="justify-items-center w-3/6 mt-8">
            <h3 class="text-xl font-semibold">Passkey ausdrucken</h3>
            <p class="text-center leading-relaxed mt-4">
              Eine ausgedruckte Version schützt nicht nur vor Hackern, sondern
              auch vor einem defekten Endgerät. Bewahren Sie das ausgedruckte
              Exemplar an einem sicheren und nicht für andere zugänglich.
              Hierfür eigenet sich ein häuslicher Tersor oder ein
              Bankschließfach.
            </p>
            <button class="btn btn-outline btn-primary mt-4">Ausdrucken</button>
          </li>
        </ul>

        <hr class="border-t-2 border-gray-500 my-4 w-3/4 mx-auto"></hr>

        <p class="text-center leading-relaxed mt-4 w-3/6">
          Bewahren Sie den Passkey zwingend sicher auf. Dieser ist die Grundlage
          für Ihre privaten Daten. In fremden Händen werden im schlimmsten Fall
          all Ihre Daten abgegriffen.
          <br />
          Der Passkey ist ebenfalls für die Abänderung Ihrer Daten notwendig.
        </p>
      </section>
      <button class="btn btn-primary w-40 mt-8 mb-12">Weiter</button>
    </main>
  );
}
