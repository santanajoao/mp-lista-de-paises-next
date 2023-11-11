import { getAllCountries } from '@/api/countriesApi';
import Country from '@/components/Country';

export default async function Home() {
	const countryList = await getAllCountries();

	return (
		<main className="pb-12">
			<h1 className="text-4xl my-6 font-bold text-center">Países</h1>

			<Country.List countryList={countryList} />
		</main>
	);
}
