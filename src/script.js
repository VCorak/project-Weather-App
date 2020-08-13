// date & time

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

// show current weather

function showCityWeather(response) {
  console.log(response.data.weather[0].icon);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let temperature = document.querySelector("#main-temperature");
  celsiusTemperature = response.data.main.temp;
  temperature.innerHTML = Math.round(response.data.main.temp);
  let feeling = document.querySelector("#description");
  feeling.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.setAttribute =
    ("src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
}

// search city in a form

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;

  enterCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function enterCity(city) {
  let apiKey = "21d207d4e5449385a0586090096515c7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCityWeather);
}

//update current location button

function instantLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "21d207d4e5449385a0586090096515c7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCityWeather);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(instantLocation);
}
let button = document.querySelector("#update-button");
button.addEventListener("click", getCurrentLocation);

//celsius to fahrenheit


function convertToFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#main-temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperature = document.querySelector("#main-temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);

// weekly weather forecast
