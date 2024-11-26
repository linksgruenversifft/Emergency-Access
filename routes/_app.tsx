import { type PageProps } from "$fresh/server.ts";
import Footer2 from "../components/Footer2.tsx";
import { Bar } from "../components/Navbar.tsx";

export default function App({ Component }: PageProps) {
  return (
    <html class="h-full">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Emergency-Access</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="min-h-full flex flex-col">
        <Bar />
        <Component />
        <Footer2 />
      </body>
    </html>
  );
}
