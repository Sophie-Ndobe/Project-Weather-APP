let now = new Date();

let currentHour = now.getHours();

if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}

let currentMinute = now.getMinutes();

if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}

let time = document.querySelector("#display-time");
time.innerHTML = `${currentHour}:${currentMinute}`;

let dateMain = document.querySelector("#top-date");
let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let currentDate = now.getDate();
let currentYear = now.getFullYear();
let currentDay = days[now.getDay()];
let currentMonth = months[now.getMonth()];

dateMain.innerHTML = `${currentDay} ${currentDate} ${currentMonth} ${currentYear}`;

function celciusUpdate() {
  document.querySelector("#temp-main").innerHTML = `${18}`;
  document.querySelector("#temp-one").innerHTML = `${19}`;
  document.querySelector("#temp-two").innerHTML = `${20}`;
  document.querySelector("#temp-three").innerHTML = `${21}`;
  document.querySelector("#temp-four").innerHTML = `${21}`;
  document.querySelector("#temp-five").innerHTML = `${21}`;
  document.querySelector("#temp-six").innerHTML = `${18}`;
  document.querySelector("#temp-seven").innerHTML = `${19}`;
  document.querySelector("#temp-eight").innerHTML = `${16}`;
}

function fahrenheitUpdate() {
  document.querySelector("#temp-main").innerHTML = `${64}`;
  document.querySelector("#temp-one").innerHTML = `${66}`;
  document.querySelector("#temp-two").innerHTML = `${68}`;
  document.querySelector("#temp-three").innerHTML = `${70}`;
  document.querySelector("#temp-four").innerHTML = `${70}`;
  document.querySelector("#temp-five").innerHTML = `${70}`;
  document.querySelector("#temp-six").innerHTML = `${64}`;
  document.querySelector("#temp-seven").innerHTML = `${66}`;
  document.querySelector("#temp-eight").innerHTML = `${61}`;
}

let celciusUnit = document.querySelector("#celcius-unit");
celciusUnit.addEventListener("click", celciusUpdate);

let fahrenheitUnit = document.querySelector("#fahrenheit-unit");
fahrenheitUnit.addEventListener("click", fahrenheitUpdate);

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  let apiKey = "8342a5044534040e24d2802ce4fcc6ac";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let speed = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;
  let description = response.data.weather[0].description;

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name} ${temperature}°C`;

  let mainTemp = document.querySelector("#temp-main");
  mainTemp.innerHTML = `${temperature}`;

  let descriptionValue = document.querySelector("#description");
  descriptionValue.innerHTML = `${description}`;

  let humidityValue = document.querySelector("#humidity-measure");
  humidityValue.innerHTML = `Humidity ${humidity} %`;

  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `Windspeed ${speed} m/s`;
}

let cityForm = document.querySelector("#search-engine-form");
cityForm.addEventListener("submit", searchCity);

function currentTemperature(event) {
  navigator.geolocation.getCurrentPosition(showPositionTemperature);
}

function showPositionTemperature(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "8342a5044534040e24d2802ce4fcc6ac";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  let reverseUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${apiKey}`;

  axios.get(`${apiUrl}`).then(currentTempetatureUpdate);
  axios.get(`${reverseUrl}`).then(currentTempetatureUpdate);
}

function currentTempetatureUpdate(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let currentSpeed = Math.round(response.data.wind.speed);
  let currentHumidity = response.data.main.humidity;
  let currentDescription = response.data.weather[0].description;
  let currentCity = response.data.name;

  let update = document.querySelector("h1");
  update.innerHTML = `${currentTemperature}°C in ${currentCity}`;

  let currentTemperatureUpdate = document.querySelector("#temp-main");
  currentTemperatureUpdate.innerHTML = `${currentTemperature}`;

  let currentDescriptionUpdate = document.querySelector("#description");
  currentDescriptionUpdate.innerHTML = `${currentDescription}`;

  let currentHumidityUpdate = document.querySelector("#humidity-measure");
  currentHumidityUpdate.innerHTML = `Humidity ${currentHumidity} %`;

  let windSpeedUpdate = document.querySelector("#wind");
  windSpeedUpdate.innerHTML = `Windspeed ${currentSpeed} m/s`;
}

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", currentTemperature);
