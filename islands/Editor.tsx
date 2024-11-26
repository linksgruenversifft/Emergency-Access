export default function CreateFamily() {
  return (
    <main class="flex flex-col mt-12 items-center">
      <section class="w-[80%] h-[80%] border-x-2 border-current px-4">
        <div>
          <h3 class="text-lg font-bold">Gib deine schützenswerten Daten ein</h3>
          <textarea
            class="textarea textarea-bordered resize-none w-[100%] h-[50rem] mt-8"
            placeholder="Bankdaten, Passwörter, etc."
          ></textarea>
        </div>
      </section>
      <button class="btn btn-primary w-40 mt-12">Verschlüsseln</button>
    </main>
  );
}
