import { json} from "@remix-run/node";
import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getCountryDetails } from "~/api/countriesApi";
import type { CountryDetails } from "~/types/country";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const countryName = data?.country.translations.por.common;
  return [
    { title: countryName ?? 'Detalhes' },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.code, 'params.code not found');
  const country = await getCountryDetails(params.code);
  return json({ country });
};

const formatter = new Intl.NumberFormat('pt-BR', { notation: 'compact' });

export default function CountryDetails() {
  const { country } = useLoaderData<typeof loader>();
  const population = formatter.format(country.population);

  return (
    <main>
      <header className="relative">
        <Link to="/" className="absolute bottom-0 left-0">Voltar</Link>

        <h1 className="text-4xl py-6 font-bold text-center">
          {country.translations.por.common}
        </h1>
      </header>

      <article className="bg-white display flex flex-col md:flex-row items-center justify-between p-4 sm:py-6 sm:px-12 rounded-2xl">
        <div className="space-y-3 text-lg mb-4 lg:mb-0">
          <p>
            <strong>🏙️ Capital: </strong> {country.capital}
          </p>

          <p>
            <strong>🗺️ Continente: </strong> {country.continents.join(', ')}
          </p>

          <p>
            <strong>👨‍👩‍👧‍👦 População:</strong> {population}
          </p>

          <div>
            <p><strong>🗣️ Linguas faladas: </strong></p>  

            <ul className="space-x-1">
              {country.languages.map((language) => (
                <li
                  className="bg-indigo-700 text-sm inline-block text-white py-1 px-3 rounded-full"
                  key={language}
                >
                  {language}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <img
          className="aspect-video h-36 sm:h-40 md:h-52 lg:h-64 rounded-3xl object-cover border"
          loading="lazy"
          decoding="async"
          src={country.flags.svg}
          alt={`Bandeira do país ${country.translations.por.common}`}
        />
      </article>
    </main>
  );
}
