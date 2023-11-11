import {
	CountryDetails, CountryDetailsResponse, CountryListItem, ErrorResponse,
} from '@/types/country';

const apiUrl = 'https://restcountries.com/v3.1';

const countryListItemFields = 'cca3,translations,flags';

export const getAllCountries = async (): Promise<CountryListItem[]> => {
	const response = await fetch(`${apiUrl}/all?fields=${countryListItemFields}`);
	const countryList: CountryListItem[] = await response.json();
	return countryList;
};

export const getCountryDetails = async (countryCode: string): Promise<CountryDetails | ErrorResponse> => {
	const response = await fetch(`${apiUrl}/alpha/${countryCode}?fields=translations,flags,capital,languages,population,borders,continents`);
	const data: CountryDetailsResponse | ErrorResponse = await response.json();
	if ('status' in data) return data;
  
	const country = { ...data, languages: Object.values(data.languages) };
	return country;
};

export const getCountriesByCodes = async (countryCodes: string[]): Promise<CountryListItem[]> => {
	if (countryCodes.length === 0) return [];
  
	const codesString = countryCodes.join(',');
	const response = await fetch(`${apiUrl}/alpha?codes=${codesString}&fields=${countryListItemFields}`);
	const countryList: CountryListItem[] = await response.json();
	return countryList;
};
