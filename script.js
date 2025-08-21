const API_KEY = "31cbc112b8f2188282383473c2d34ecc";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherBox = document.getElementById("weather");

async function getWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    showWeather(data);
  } catch (error) {
    weatherBox.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}

function showWeather(data) {
  const { name, main, weather } = data;
  const temp = main.temp.toFixed(1);
  const condition = weather[0].main;

  weatherBox.innerHTML = `
    <h2>${name}</h2>
    <p>${temp}°C</p>
    <p>${condition}</p>
  `;

  setBackground(condition);
}

function setBackground(condition) {
  condition = condition.toLowerCase();
  if (condition.includes("cloud")) {
    document.body.style.background = "linear-gradient(to bottom, #bdc3c7, #2c3e50)";
  } else if (condition.includes("rain")) {
    document.body.style.background = "linear-gradient(to bottom, #00c6fb, #005bea)";
  } else if (condition.includes("clear")) {
    document.body.style.background = "linear-gradient(to bottom, #f7971e, #ffd200)";
  } else if (condition.includes("snow")) {
    document.body.style.background = "linear-gradient(to bottom, #e6dada, #274046)";
  } else if (condition.includes("night")) {
    document.body.style.background = "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)";
  } else {
    document.body.style.background = "linear-gradient(to bottom, #87ceeb, #f0f8ff)";
  }
}

// Event listener
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) getWeather(city);
});
