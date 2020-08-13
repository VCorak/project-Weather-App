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

//  Daily, every three hours forecast

function displayHourForecast(response) {
  let forecastElement = document.querySelector("#forecast-report");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    let forecast = response.data.list[index];
    forecastElement.innerHTML += `<div class="col-2">
              <h3>
                ${formatHours(forecast.dt * 1000)};
              </h3>
              <img
                src="http://openweathermap.org/img/wn/${
                  forecast.weather[0].icon
                }@2x.png"
                alt=""
              />
              <div class="hourly-forecast-temperature">
                <strong>${Math.round(
                  forecast.main.temp.max
                )}°</strong>${Math.round(forecast.main.temp.min)}°
              </div>
        </div>`;
  }
}
apiKey = "21d207d4e5449385a0586090096515c7";
apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayHourForecast);

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  return `${hours}:${minutes}`;
}
