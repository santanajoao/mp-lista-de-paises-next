import type { CountryDetails, CountryDetailsResponse, CountryListItem } from "~/types/country";

const apiUrl = 'https://restcountries.com/v3.1';

export const getAllCountries = async (): Promise<CountryListItem[]> => {
  const response = await fetch(`${apiUrl}/all?fields=cca3,translations,flags`);
  const countryList: CountryListItem[] = await response.json();
  return countryList;
};
export const getCountryDetails = async (countryCode: string): Promise<CountryDetails> => {
  const response = await fetch(`${apiUrl}/alpha/${countryCode}?fields=translations,flags,capital,languages,population,borders,continents`);
  const data: CountryDetailsResponse = await response.json();
  const country = { ...data, languages: Object.values(data.languages) };
  return country;
};
