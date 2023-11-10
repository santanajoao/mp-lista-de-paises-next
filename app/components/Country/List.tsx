import { Link } from '@remix-run/react';
import type { CountryListItem } from '~/types/country'

type Props = {
  countryList: CountryListItem[];
}

export default function List({ countryList }: Props) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {countryList.map((country) => (
        <li key={country.cca3}>
          <Link
            to={`/paises/${country.cca3}`}
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
          </Link>
        </li>
      ))}
    </ul>
  )
}
