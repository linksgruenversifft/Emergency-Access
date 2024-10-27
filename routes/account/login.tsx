import { Handlers, type PageProps } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    return await ctx.render({
      message: null,
    });
  },
  async POST(req, ctx) {
    const form = await req.formData();
    const email = form.get("email")?.toString();
    const password = form.get("password")?.toString();

    console.log(email, password);

    const successful = false;

    if (!successful) {
      return ctx.render({
        message: "test",
      });
    }

    const headers = new Headers();
    headers.set("location", "/account");
    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
};

export default function Login(props: PageProps) {
  const { message } = props.data;
  return (
    <div class="h-full flex items-center justify-center">
      <section class="bg-base-200 rounded">
        <div class="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl">
          <div class="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
            <div class="flex flex-col">
              <div>
                <h2 class="text-4xl">Login</h2>
              </div>
            </div>
            <form method="post">
              <input
                autocomplete="false"
                name="hidden"
                style="display: none"
                data-ddg-inputtype="unknown"
              />
              <div class="mt-4 space-y-6">
                <div class="col-span-full">
                  <label class="block mb-3 text-sm font-medium">Username</label>
                  <input
                    class="block w-full px-6 py-3 input input-bordered rounded-full appearance-none  sm:text-sm"
                    placeholder="email"
                    autocomplete="off"
                    type="text"
                    id="email"
                    name="email"
                    value=""
                  />
                </div>
                <div class="col-span-full">
                  {" "}
                  <label class="block mb-3 text-sm font-medium">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value=""
                    class="block w-full px-6 py-3 input input-bordered rounded-full appearance-none  sm:text-sm"
                    placeholder="******"
                    autocomplete="off"
                    data-ddg-inputtype="credentials.password"
                  />
                </div>
                <div class="col-span-full">
                  {message ? (
                    <p class="text-center text-error pb-5">{message}</p>
                  ) : null}
                  <input
                    class="items-center justify-center w-full px-6 py-2.5 text-center text-primary-content duration-200 bg-primary border-2 border-primary rounded-full inline-flex hover:bg-transparent hover:border-primary hover:text-primary focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                    type="submit"
                    value="Login"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
