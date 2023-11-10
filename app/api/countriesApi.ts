import type { CountryListItem } from "~/types/country";

const apiUrl = 'https://restcountries.com/v3.1';

export const getAllCountries = async (): Promise<CountryListItem[]> => {
  const response = await fetch(`${apiUrl}/all?fields=cca3,translations,flags`);
  const countryList: CountryListItem[] = await response.json();
  return countryList;
};
