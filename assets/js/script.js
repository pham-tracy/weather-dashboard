// API key for Weather API
var APIKey = "c760641df731ec398ea17ddbcb746b34";

// Intialize city variable
var city = "";

// Search button
var searchBtn = document.getElementById("search");

// Current weather forecast elements
var currentCity = document.getElementById("current-city");
var currentIcon = document.getElementById("current-icon");
var currentTemp = document.getElementById("current-temp");
var currentWind = document.getElementById("current-wind");
var currentHumidity = document.getElementById("current-humidity");

// Five-day weather forecast elements
var fiveDayIcon = document.getElementsByClassName("five-day-icon-display");
var fiveDayTemp = document.getElementsByClassName("five-day-temp");
var fiveDayWind = document.getElementsByClassName("five-day-wind");
var fiveDayHumidity = document.getElementsByClassName("five-day-humidity");

// Current date
var currentDate = moment().format("l");

// Displays city name and current date
currentCity.textContent = "Daily Forecast " + "(" + currentDate + ")";

// Displays weather forecast when search button is clicked
searchBtn.addEventListener("click", async function (event) {
  event.preventDefault();

  // User inputed city
  city = document.getElementById("search-input").value;

  fetchWeather();
  searchHistory();
});

function fetchWeather() {
  // request URL for current weather
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey +
    "&units=imperial";

  console.log(city);
  console.log(requestUrl);

  // Displays current weather
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      // Displays city name and current date
      currentCity.textContent = data.name + " (" + currentDate + ")";

      // Displays daily forecast elements
      currentIcon.setAttribute(
        "src",
        " http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png"
      );
      currentTemp.textContent = "Temp: " + data.main.temp + "°F";
      currentWind.textContent = "Wind: " + data.wind.speed + " MPH";
      currentHumidity.textContent = "Humidity: " + data.main.humidity + "%";
    })
    .catch(function (error) {
      alert("Please enter a valid city name");
      currentCity.textContent = "Daily Forecast";
      return;
    });

  // Five-day forecast URL
  var fiveDayForecastUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    APIKey +
    "&units=imperial";

  console.log(fiveDayForecastUrl);

  // Displays five-day weather forecast
  fetch(fiveDayForecastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Displays five-day forecast data
      // j = 6 since this diplays data beginning at the next day
      for (var i = 0, j = 6; i < 5, j < data.list.length; i++, j += 8) {
        fiveDayIcon[i].setAttribute(
          "src",
          "http://openweathermap.org/img/wn/" +
            data.list[j].weather[0].icon +
            ".png"
        );
        fiveDayTemp[i].textContent = "Temp: " + data.list[j].main.temp + "°F";
        fiveDayWind[i].textContent =
          "Wind: " + data.list[j].wind.speed + " MPH";
        fiveDayHumidity[i].textContent =
          "Humidity: " + data.list[j].main.humidity + "%";
      }
    });
}

// Creates a search history where you can go to results of previous searches
function searchHistory() {
  var searchHistoryDiv = document.getElementById("search-history");

  // Creates a button for each city searched
  var searchHistoryBtn = document.createElement("button");
  searchHistoryBtn.setAttribute("class", "searchHistory");

  // Displays button for each city searched and saves to local storage
  searchHistoryDiv.append(searchHistoryBtn);
  localStorage.setItem(city, city);
  searchHistoryBtn.textContent = localStorage.getItem(city);

  // When button for previous searches are clicked, then it goes to the results of that search
  searchHistoryBtn.addEventListener("click", function (event) {
    event.preventDefault();
    city = searchHistoryBtn.textContent;
    fetchWeather();
    console.log(city);
  });
}

// Displays dates for the five-day forecast
for (var i = 0; i < 5; i++) {
  var futureDates = document.getElementsByClassName("card-title");

  futureDates[i].textContent = moment()
    .add(1 + i, "days")
    .format("l");
}
