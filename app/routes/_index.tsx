import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAllCountries } from "~/api/countriesApi";

export const meta: MetaFunction = () => [
  { title: "Lista de países" },
];

export const loader = async () => {
  const countryList = await getAllCountries();
  return json({ countryList });
};

export default function Index() {
  const { countryList } = useLoaderData<typeof loader>();

  return (
    <main className="pb-12">
      <h1 className="text-4xl my-6 font-bold text-center">Países</h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {countryList.map((country) => (
          <li key={country.cca3}>
            <a
              href={`/paises/${country.cca3}`}
              className="bg-white rounded-xl px-2 py-3 pb-0 h-full block shadow-sm hover:shadow-md"
            >
              <img
                loading="lazy"
                decoding="async"
                className="rounded-md w-full aspect-video object-cover border"
                src={country.flags.svg}
                alt={`Bandeira do país ${country.translations.por.common}`}
              />

              <h2 className="font-bold text-xl text-center px-2 py-3">
                {country.translations.por.common}
              </h2>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
