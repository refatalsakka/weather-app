export function innerHTML(elm, value) {
  elm.innerHTML = value;
}

export function information(city) {
  return {
    name: city.name,
    country: city.sys.country,
    status: city.weather[0].main,
    description: city.weather[0].description,
    temp: city.main.temp,
    temp_min: city.main.temp_min,
    temp_max: city.main.temp_max,
    feels_like: city.main.feels_like,
    pressure: city.main.pressure,
    humidity: city.main.humidity,
    wind: city.wind.speed,
    visibility: city.visibility,
    uluru: { lat: city.coord.lat, lon: city.coord.lon },
    sunset: city.sys.sunset,
  };
}

export function count(elm, _new) {
  let finish = false;
  let old = Number(elm.innerText);
  const counting = setInterval(() => {
    if (old > _new) {
      old -= 1;
    } else if (old < _new) {
      old += 1;
    } else {
      finish = true;
      clearInterval(counting);
    }
    innerHTML(elm, old);
    if (finish) elm.classList.toggle('active');
  }, 100);
}

export function dateToTimestamp(date) {
  return new Date(date).getTime() / 1000;
}

export function formatDate(data) {
  return new Date(data).toLocaleString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
  });
}

export function getCurrentDate(timeZone) {
  return new Date().toLocaleString('en-US', { timeZone });
}

export function getMode(currentDate, city) {
  return city.sunset >= dateToTimestamp(currentDate) ? 'light' : 'dark';
}

export function getIconWeather(icons, city) {
  const { status, mode } = city;
  const index = icons.natural[status.toLowerCase()] ? 'natural' : mode;
  return icons[index][status.toLowerCase()];
}

export function getIconCountry(code) {
  return `<img src="https://openweathermap.org/images/flags/${code.toLowerCase()}.png" title="${code.toLowerCase()}"/>`;
}
