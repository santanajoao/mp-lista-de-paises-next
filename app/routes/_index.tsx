import { defer } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { getAllCountries } from "~/api/countriesApi";
import Country from "~/components/Country";

export const loader = async () => {
  const countryListPromise = getAllCountries();
  return defer({ countryList: countryListPromise });
};

export default function Index() {
  const { countryList } = useLoaderData<typeof loader>();

  return (
    <main className="pb-12">
      <h1 className="text-4xl my-6 font-bold text-center">Países</h1>

      <Suspense fallback={<Country.Skelleton cardsQuantity={14} />}>
        <Await resolve={countryList}>
          {(countryList) => <Country.List countryList={countryList} />}
        </Await>
      </Suspense>
    </main>
  );
}
