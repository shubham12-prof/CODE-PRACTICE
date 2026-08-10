/*
  17. Mini Projects
  Weather App

  ASSUMED HTML:
    <input type="text" id="cityInput" placeholder="Enter city..." />
    <button id="searchBtn">Search</button>
    <div id="weatherResult"></div>
    <div id="errorMessage"></div>

  ASSUMED API: this uses a free weather API (Open-Meteo, no API key
  needed) as an example - swap the fetch URL for whatever weather API
  you're actually using (OpenWeatherMap, WeatherAPI, etc. usually need
  an API key appended to the URL).

  CORE IDEA: 1) turn the city name into coordinates (geocoding),
  2) fetch weather for those coordinates, 3) display it - all using
  async/await + fetch, with loading and error states handled.
*/

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const resultDiv = document.getElementById("weatherResult");
const errorDiv = document.getElementById("errorMessage");

async function getCoordinates(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
  const response = await fetch(url);
  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error(`City "${city}" not found`);
  }

  const { latitude, longitude, name, country } = data.results[0];
  return { latitude, longitude, name, country };
}

async function getWeather(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data = await response.json();
  return data.current_weather; // { temperature, windspeed, weathercode, ... }
}

function renderWeather(location, weather) {
  resultDiv.innerHTML = `
    <h3>${location.name}, ${location.country}</h3>
    <p>Temperature: ${weather.temperature}°C</p>
    <p>Wind Speed: ${weather.windspeed} km/h</p>
  `;
}

function renderError(message) {
  errorDiv.textContent = message;
  resultDiv.innerHTML = "";
}

async function handleSearch() {
  const city = cityInput.value.trim();
  if (city === "") return;

  errorDiv.textContent = "";
  resultDiv.textContent = "Loading...";

  try {
    // Step 1: turn city name into coordinates.
    const location = await getCoordinates(city);

    // Step 2: get weather for those coordinates.
    const weather = await getWeather(location.latitude, location.longitude);

    // Step 3: display the result.
    renderWeather(location, weather);
  } catch (error) {
    // Catches errors from EITHER await above - network failure, city
    // not found, etc. - all handled in one place.
    renderError(error.message);
  }
}

searchBtn.addEventListener("click", handleSearch);
cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSearch();
});

/*
  WHY try/catch AROUND MULTIPLE AWAITS: if getCoordinates() OR
  getWeather() fails for any reason, we want the SAME error-handling
  behavior (show a message, clear the loading state) - wrapping both
  in one try/catch avoids duplicating that logic for each step.

  COMMON INTERVIEW POINT: always check response.ok (or handle a
  non-200 status) - fetch() does NOT automatically throw an error for
  HTTP error statuses like 404 or 500, only for actual network
  failures. You have to check and throw manually if needed.
*/
