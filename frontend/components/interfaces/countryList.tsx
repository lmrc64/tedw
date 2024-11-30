import React, { useEffect, useState } from 'react';

interface Country {
  country: string;
  iso2: string;
}

interface CountrySelectProps {
  onChange: (value: string) => void; 
  value: string; 
}

const CountrySelect: React.FC<CountrySelectProps> = ({ onChange, value }) => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    fetch('https://countriesnow.space/api/v0.1/countries')
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.data); // Los países están dentro del campo 'data'
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value); 
  };

  return (
    <select
      id="country"
      name="country"
      className="bg-gray-50 border border-gray-300 text-purple-500 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
      value={value}
      onChange={handleChange}
      required
    >
      <option value="">Selecciona un país</option>
      {countries.map((country) => (
        <option key={country.iso2} value={country.country}>
          {country.country}
        </option>
      ))}
    </select>
  );
};

export default CountrySelect;
