import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('country-info');

function createCountryList(name) {
  const countryItem = document.createElement('li');
  countryItem.classList.add('country-item');
  const flagImage = document.createElement('img');
  flagImage.classList.add('imageflag');
  const countryName = document.createElement('p');
  countryName.textContent = `${name}`;
  flagImage.setAttribute('src', 'https://flagcdn.com/se.svg');
  countryItem.append(flagImage, countryName);
  countryList.append(countryItem);
}

createCountryList();
createCountryList();
createCountryList();
createCountryList();

searchInput.addEventListener('input', () => {
  const findText = searchInput.value.trim();
  // console.log(findText);
  if (findText.length < 2) {
    alertShortText();
  }
  fetchCountries(findText)
    .then(response => {
      const parsedArrayCounries = response.map(arrItem => arrItem.name.common);
      console.log(parsedArrayCounries);
      createCountryList(parsedArrayCounries);

      // alertShortText();

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
