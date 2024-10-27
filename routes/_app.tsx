import { type PageProps } from "$fresh/server.ts";
import Footer from "../components/Footer.tsx";
import { Bar } from "../components/Navbar.tsx";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Emergency-Access</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="h-svh">
        <Bar />
        <Component />
        <Footer />
      </body>
    </html>
  );
}
