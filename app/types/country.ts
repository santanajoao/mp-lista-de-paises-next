export type CountryListItem = {
  cca3: string,
  flags: {
    svg: string,
  },
  translations: {
    por: {
      common: string,
    },
  },
};

export type CountryDetailsResponse = Omit<CountryListItem, 'cca3'> & {
  population: number;
  languages: Record<string, string>;
  capital: string;
  borders: string[];
  continents: string[]; 
};

export type CountryDetails = Omit<CountryDetailsResponse, 'languages'> & {
  languages: string[];
}
