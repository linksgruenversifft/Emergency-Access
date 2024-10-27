export default function Home() {
  return (
    <section>
      <div class="items-center px-8 py-12 mx-auto max-w-7xl lg:px-16 md:px-12 lg:py-24">
        <div class="justify-center w-full text-center lg:p-10 max-auto">
          <div class="justify-center w-full mx-auto">
            <p class="mt-8 text-5xl font-medium tracking-tighter">
              We all die.
            </p>
            <p class="max-w-xl mx-auto mt-4 text-lg tracking-tight">
              If you could kick the person in the pants responsible for most of
              your trouble, you wouldn't sit for a month
            </p>
          </div>
          <div class="flex flex-col items-center justify-center max-w-xl gap-3 mx-auto mt-10 lg:flex-row">
            {" "}
            <a
              href=""
              class="items-center justify-center w-full px-6 py-2.5 text-center text-primary-content duration-200 bg-primary hover:bg-transparent hover:border-primary hover:text-primary border-2 border-primary rounded-full inline-flex  focus:outline-none lg:w-auto focus-visible:outline-black text-sm focus-visible:ring-black"
            >
              Button
            </a>{" "}
            <a
              href=""
              class="inline-flex items-center justify-center text-sm font-semibold text-primary duration-200 link link-hover focus:outline-none focus-visible:outline-gray-600"
            >
              Learn more &nbsp; →
            </a>{" "}
          </div>
        </div>
      </div>
    </section>
  );
}
