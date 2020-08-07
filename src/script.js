// 1

function newDate(date) {
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let daysInWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = daysInWeek[date.getDay()];

  return `${currentDay} ${currentHour}:${currentMinutes}`;
}
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = newDate(currentTime);

// 2

function showCityWeather(response) {
  console.log(response.data);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let temperature = document.querySelector("#main-temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let feeling = document.querySelector("#description");
  feeling.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;

  enterCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function enterCity(city) {
  let apiKey = "601136d971259a1891bcbb5957edf0ed";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCityWeather);
}

//button
function instantLocation(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "601136d971259a1891bcbb5957edf0ed";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCityWeather);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(instantLocation);
}
let button = document.querySelector("#update-emoji");
button.addEventListener("click", getCurrentLocation);

//celsius to fahrenheit

function convertToFahrenheit(event) {
  event.preventDefault();
  let mainTemperature = document.querySelector("#main-temperature");
  let temperature = mainTemperature.innerHTML;
  temperature = Number(temperature);
  mainTemperature.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let mainTemperature = document.querySelector("#main-temperature");
  let temperature = mainTemperature.innerHTML;
  mainTemperature.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);
