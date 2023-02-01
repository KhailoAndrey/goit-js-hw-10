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

searchInput.addEventListener('input', () => {
  const findText = searchInput.value.trim();
  countryList.replaceChildren();
  // console.log(findText);
  fetchCountries(findText)
    .then(response => {
      if (response.length > 10) {
        alertShortText();
        countryList.replaceChildren();
        return;
      }
      console.log(response);
      for (const country of response) {
        const name = country.name.common;
        console.log(name);
        const flag = country.flags.svg;
        console.log(flag);
        createCountryList({ name, flag });
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
