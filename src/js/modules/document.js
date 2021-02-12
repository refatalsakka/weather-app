import elements from './elements';
import icons from './icons';
import { getWeather, getTime, getMap } from './apis';
import {
  count,
  getMode,
  getIconWeather,
  getIconCountry,
  innerHTML,
  getCurrentDate,
  information,
} from './helpers';

function addClassNameToBody(className) {
  if (!elements.body.classList.contains(className)) {
    elements.body.classList = '';
    elements.body.classList = className;
  }
}

export default async function update(cityName) {
  elements.error.classList.remove('active');
  elements.loading.classList.add('active');

  const city = await getWeather(cityName);

  if (!city) {
    elements.error.classList.add('active');
    elements.loading.classList.remove('active');
    return;
  }

  const info = information(city);
  const time = await getTime(info.uluru);
  const currentDate = getCurrentDate(time.timezone);
  const mode = getMode(currentDate, { uluru: info.uluru, sunset: info.sunset });
  const weatherIcon = getIconWeather(icons, { status: info.status, mode });
  const countryIcon = getIconCountry(info.country);

  elements.loading.classList.remove('active');

  addClassNameToBody(mode);
  innerHTML(elements.city, (`${info.name},${info.country} ${countryIcon}`));
  innerHTML(elements.date, currentDate);
  innerHTML(elements.description, info.description);
  innerHTML(elements.icon, weatherIcon);
  innerHTML(elements.pressure, Math.round(info.pressure));
  innerHTML(elements.humidity, Math.round(info.humidity));
  innerHTML(elements.wind, Math.round(info.wind));
  innerHTML(elements.visibility, Math.round(info.visibility / 1000));
  count(elements.temp_main, Math.round(info.temp));
  count(elements.temp_min, Math.round(info.temp_min));
  count(elements.temp_max, Math.round(info.temp_max));
  count(elements.feels_like, Math.round(info.feels_like));
  getMap(info.uluru, mode, elements.map);
}
