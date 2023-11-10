import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAllCountries } from "~/api/countriesApi";
import CountryList from "~/components/CountryList";

export const loader = async () => {
  const countryList = await getAllCountries();
  return json({ countryList });
};

export default function Index() {
  const { countryList } = useLoaderData<typeof loader>();

  return (
    <main className="pb-12">
      <h1 className="text-4xl my-6 font-bold text-center">Países</h1>

      <CountryList countryList={countryList} />
    </main>
  );
}
