import { json} from "@remix-run/node";
import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Link, isRouteErrorResponse, useLoaderData, useRouteError } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getCountriesByCodes, getCountryDetails } from "~/api/countriesApi";
import CountryList from "~/components/CountryList";
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
  
  if ('status' in country) {
    throw new Response('País não encontrado', { status: 404 });
  }

  const borderCountries = await getCountriesByCodes(country.borders);
  return json({ country, borderCountries });
};

export const ErrorBoundary = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <article className="text-center flex-1 flex flex-col items-center justify-center">
        <img src="/world-logo.svg" className="" alt="" />
        <h1 className="text-4xl font-bold ">{error.data}</h1>
        <h2 className="text-3xl font-bold ">{error.status}</h2>

        <Link to="/">Voltar</Link>
      </article>
    );
  }
};

const formatter = new Intl.NumberFormat('pt-BR', { notation: 'compact' });

export default function CountryDetails() {
  const { country, borderCountries } = useLoaderData<typeof loader>();
  const population = formatter.format(country.population);

  return (
    <main className="pb-12">
      <section className="mb-6">
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
            className="aspect-video h-36 sm:h-40 md:h-52 lg:h-64 rounded-xl object-cover border"
            loading="lazy"
            decoding="async"
            src={country.flags.svg}
            alt={`Bandeira do país ${country.translations.por.common}`}
          />
        </article>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-3">Países que fazem fronteira</h2>
        
        {borderCountries.length ? (
          <CountryList countryList={borderCountries} />
        ) : (
          <p className="text-lg">
            {country.translations.por.common} não faz fronteira com outros países
          </p>
        )}
      </section>
    </main>
  );
}
