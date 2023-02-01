import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('country-info');

function createCountryList({ name, flag }) {
  const countryItem = document.createElement('li');
  countryItem.classList.add('country-item');
  const flagImage = document.createElement('img');
  flagImage.classList.add('imageflag');
  const countryName = document.createElement('p');
  countryName.textContent = `${name}`;
  flagImage.setAttribute('src', `${flag}`);
  countryItem.append(flagImage, countryName);
  countryList.append(countryItem);
}

function createCountryCard({ name, capital, population, flag, languages }) {
  // createCountryList({ name, flag });
  const countryCapital = document.createElement('p');
  countryCapital.textContent = `Capital: ${capital}`;
  const countryPopulation = document.createElement('p');
  countryPopulation.textContent = `Population: ${population}`;
  const countryLanguage = document.createElement('p');
  countryLanguage.textContent = `Languages: ${languages}`;
  countryCapital.classList.add('country-item');
  countryPopulation.classList.add('country-item');
  countryLanguage.classList.add('country-item');
  countryList.append(countryCapital, countryPopulation, countryLanguage);
}

// function getDataFromResponse(country) {
//   // for (const country of response) {
//     const name = country.name.common;
//     const flag = country.flags.svg;
//     const capital = response[0].capital.join();
//     const population = response[0].population;
//     const languages = Object.values(response[0].languages).join(', ');
//   return { name, flag, capital, population, languages };
//   // }
// }

searchInput.addEventListener('input', () => {
  const findText = searchInput.value.trim();
  countryList.replaceChildren();
  fetchCountries(findText)
    .then(response => {
      if (response.length > 10) {
        alertShortText();
        countryList.replaceChildren();
        return;
      } else if (response.length > 1) {
        console.log(response);
        for (const country of response) {
          // getDataFromResponse(country);
          const name = country.name.common;
          console.log(name);
          const flag = country.flags.svg;
          console.log(flag);
          createCountryList({ name, flag });
        }
      } else {
        countryList.replaceChildren();

        console.log(response);
        for (const country of response) {
          const name = country.name.common;
          console.log(name);
          const flag = country.flags.svg;
          console.log(flag);
          createCountryList({ name, flag });
        }
        const capital = response[0].capital.join();
        const population = response[0].population;
        const languages = Object.values(response[0].languages).join(', ');
        console.log(capital, population, languages);
        createCountryCard({ capital, population, languages });
      }

      // Data handling
      Notiflix.Notify.failure('Тут надо обработать массив объекта');
    })

    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
});

function alertShortText() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}
