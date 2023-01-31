import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('country-info');

function createCountryList() {
  countryList.style.listStyle = 'none';
  countryList.style.paddingLeft = 0;
  const countryItem = document.createElement('li');
  const flagImage = document.createElement('img');
  const countryName = document.createElement('p');
  countryName.textcontent = "I am country";
  flagImage.setAttribute('src', 'https://flagcdn.com/se.svg');
  flagImage.style.width = '5%';
  countryItem.append(flagImage, countryName);
  countryList.append(countryItem);
}

createCountryList();

searchInput.addEventListener('input', () => {
  const findText = searchInput.value.trim();
  console.log(findText);
  if (findText.length < 2) {
    alertShortText();
  }
  fetchCountries(findText)
    .then(() => {
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
