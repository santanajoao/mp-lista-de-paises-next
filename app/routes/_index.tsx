import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [
  { title: "Lista de países" },
];

export default function Index() {
  return (
    <main>Root page</main>
  );
}
