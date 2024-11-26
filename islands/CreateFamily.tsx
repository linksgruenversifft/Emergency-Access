import { signal } from "@preact/signals";

const users = signal(["", ""]);
const treshold = signal(1);

export default function CreateFamily() {
  const addUser = () => {
    users.value = [...users.value, ""];
    treshold.value = Math.round(users.value.length * 0.5);
  };
  const deleteUser = (index: number) => {
    users.value = users.value.filter((_, i) => i !== index);
    treshold.value = Math.round(users.value.length * 0.5);
  };

  const updateUser = (e: Event, index: number) => {
    if (!(e.target instanceof HTMLInputElement)) return;

    const updatedUsers = [...users.value];
    updatedUsers[index] = e.target.value;
    users.value = updatedUsers;
  };

  return (
    <main class="flex flex-col mt-12 items-center">
      <section class="flex justify-center gap-12 w-[80%] h-[80%] border-x-2 border-current px-4">
        <div class="w-[30rem]">
          <h3 class="text-lg font-bold">Wähle deine Familienmitglieder aus</h3>
          <p class="text-sm">
            Es müssen mindestens zwei Mitglieder erstellt werden
          </p>
          <ul class="mt-8">
            <ul>
              {users.value.map((user, index) => (
                <li>
                  <input
                    class="input input-bordered w-full max-w-xs"
                    type="text"
                    placeholder="Name"
                    value={user}
                    onChange={(e) => updateUser(e, index)}
                  />
                  {users.value.length > 2 && (
                    <button onClick={() => deleteUser(index)}>Delete</button>
                  )}
                </li>
              ))}
            </ul>
            <li>
              <button
                class="btn btn-primary btn-outline mt-2"
                onClick={addUser}
              >
                Weiteres Mitglied
              </button>
            </li>
            <li>
              <input
                type="range"
                min="0"
                max={users.value.length}
                value={treshold}
                class="range"
                onChange={(e) => {
                  if (!(e.target instanceof HTMLInputElement)) return;
                  treshold.value = parseInt(e.target.value);
                }}
              />
              <input
                type="number"
                min="1"
                max={users.value.length}
                value={treshold}
                class="input input-bordered w-full"
                onChange={(e) => {
                  if (!(e.target instanceof HTMLInputElement)) return;
                  treshold.value = parseInt(e.target.value);
                }}
              ></input>
            </li>
          </ul>
        </div>
      </section>
      <a class="btn btn-primary w-40 mt-12" href="/dev/Data" target="_self">
        Weiter
      </a>
    </main>
  );
}
