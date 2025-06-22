// Your WeatherAPI key
const apiKey = "158665a4bf23450c98b92934250601";

// Selecting elements from the DOM
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherDisplay = document.getElementById("weather-display");

// Function to fetch weather data
function fetchWeather(city) {
  const apiURL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  fetch(apiURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found.");
      }
      return response.json();
    })
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      weatherDisplay.innerHTML = `<p style="color: red;">${error.message}</p>`;
    });
}

// Function to display weather data
function displayWeather(data) {
  const { location, current } = data;
  weatherDisplay.innerHTML = `
    <h2>${location.name}, ${location.country}</h2>
    <p><strong>Temperature:</strong> ${current.temp_c}°C</p>
    <p><strong>Weather:</strong> ${current.condition.text}</p>
    <img src="https:${current.condition.icon}" alt="${current.condition.text}" />
    <p><strong>Humidity:</strong> ${current.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${current.wind_kph} km/h</p>
  `;
}

// Event listener for search button
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    weatherDisplay.innerHTML = `<p style="color: red;">Please enter a city name.</p>`;
  }
});

