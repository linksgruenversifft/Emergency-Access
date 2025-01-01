import { signal } from "@preact/signals";

const input = signal<string>("");
const members = signal<string[]>([]);

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function InviteMembers() {
  let inputElement: HTMLInputElement | null = null;

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
          <p class="text-center leading-relaxed mt-4"></p>

          <input
            class="input input-bordered w-full max-w-xs mt-5 mb-5"
            type="text"
            ref={(e) => {
              inputElement = e;
            }}
            placeholder="Name oder Email"
            onChange={(e) => {
              if (e.target instanceof HTMLInputElement)
                input.value = e.target.value;
            }}
          />

          {emailRegex.test(input.value) && (
            <button
              class="btn btn-success"
              onClick={() => {
                if (!inputElement) return;

                console.log(inputElement.value);
              }}
            >
              Invite User
            </button>
          )}

          {!emailRegex.test(input.value) && input.value != "" && (
            <button
              class="btn btn-primary"
              onClick={() => {
                if (!inputElement) return;

                members.value = [inputElement.value, ...members.value];
                inputElement.value = "";
              }}
            >
              Local User
            </button>
          )}

          <ul>
            {members.value.map((user, _index) => (
              <li>{user}</li>
            ))}
          </ul>
        </section>
        <a href="/dev/Family">
          <button class="btn btn-primary w-40 mt-8 mb-12 btn-disabled">
            Weiter
          </button>
        </a>
      </main>
    </div>
  );
}
