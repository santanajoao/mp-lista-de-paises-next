import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import tailwindCss from './tailwind.css';
import mainCss from './main.css';

export const meta: MetaFunction = () => [
  { title: "Lista de países" },
];

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: 'icon', href: '/world-logo.svg', type: 'image/svg' },
  { rel: 'stylesheet', href: tailwindCss },
  { rel: 'stylesheet', href: mainCss },
];

export default function App() {
  return (
    <html lang="pt-br">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="text-gray-800 bg-gray-100 min-h-screen flex flex-col">
        <header className="bg-white">
          <div className="m-auto max-w-[1366px] flex items-center p-2 sm:py-3 sm:px-6">
            <img
              className="h-10 aspect-square mr-2"
              src="/world-logo.svg"
              alt="Logo da página. Representação simplificada do globo terrestre."
            />

            <span className="text-2xl font-bold">Países do mundo</span>
          </div>
        </header>

        <div className="m-auto max-w-[1366px] px-2 sm:px-6 flex-1 flex flex-col">
          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
