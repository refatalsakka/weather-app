/* eslint-disable no-undef */
import axios from 'axios';

const apiWeather = {
  base: 'http://api.openweathermap.org/data/2.5/',
  key: process.env.API_TOCKEN_WEATHER,
  query: '&units=metric',
};

const apiTime = {
  base: 'http://api.openweathermap.org/data/2.5/',
  key: process.env.API_TOCKEN_WEATHER,
  query: '&units=metric',
};

export function getWeather(city) {
  return axios
    .get(`${apiWeather.base}weather?q=${city}&appid=${apiWeather.key}${apiWeather.query}`)
    .then((response) => response.data).catch(() => false);
}

export function getTime(uluru) {
  return axios
    .get(`${apiTime.base}onecall?lat=${uluru.lat}&lon=${uluru.lon}&exclude=hourly,minutely,daily,current&appid=${apiTime.key}`)
    .then((response) => response.data).catch(() => false);
}

export function getMap(uluru, mode, id) {
  const mapId = mode === 'dark' ? process.env.MAP_DARK_ID : false;
  const { lat, lon: lng } = uluru;

  const map = new google.maps.Map(id, {
    zoom: 8,
    center: { lat, lng },
    mapId,
  });

  // eslint-disable-next-line no-unused-vars
  const marker = new google.maps.Marker({
    position: { lat, lng },
    map,
  });
}
