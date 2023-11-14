import { getCountriesByCodes, getCountryDetails } from '@/api/countriesApi';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import Country from '@/components/Country';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Detalhes do país'
};

type Props = {
  params: {
    code: string,
  },
};

const formatter = new Intl.NumberFormat('pt-BR', { notation: 'compact' });

export default async function CountryDetailsPage({ params }: Props) {
	const country = await getCountryDetails(params.code);
  
	if (!country) { return notFound(); }
  
	const population = formatter.format(country.population);
	const borderCountries = await getCountriesByCodes(country.borders);
	
	return (
		<main className="pb-12">
			<section className="mb-6">
				<header className="relative">
					<Link href="/" className="flex items-center absolute bottom-0 left-0">
						<Image
							src="/arrow-left.svg"
							alt="Seta apontada para a esquerda"
							className="mr-1"
							width={14}
							height={10}
						/>

            Voltar
					</Link>

					<h1 className="text-4xl py-6 font-bold text-center">
						{country.translations.por.common}
					</h1>
				</header>

				<article className="bg-white display flex gap-4 flex-col md:flex-row items-center justify-between p-4 sm:py-6 sm:px-12 rounded-2xl">
					<div className="space-y-3 text-lg lg:mb-0">
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

							<ul className="flex flex-wrap gap-1">
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

					<Country.FlagImage
						src={country.flags.svg}
						alt={`Bandeira do país ${country.translations.por.common}`}
						className="w-64 sm:w-72 md:w-80 lg:w-96"
						priority
					/>
				</article>
			</section>

			<section>
				<h2 className="text-2xl font-bold mb-3">Países que fazem fronteira</h2>

				{borderCountries.length ? (
					<Country.List countryList={borderCountries} />
				) : (
					<p className="text-lg">
						{country.translations.por.common} não faz fronteira com outros países
					</p>
				)}
			</section>
		</main>
	);
}
