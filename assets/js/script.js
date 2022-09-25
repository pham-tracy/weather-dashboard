// API key for Weather API
var APIKey = "c760641df731ec398ea17ddbcb746b34";

var city = "";
// Current weather forecast elements
var currentCity = document.getElementById("current-city");
var currentIcon = document.getElementById("current-icon");
var currentTemp = document.getElementById("current-temp");
var currentWind = document.getElementById("current-wind");
var currentHumidity = document.getElementById("current-humidity");

// Five-day weather forecast elements
var fiveDayIconDisplay = document.getElementsByClassName(
  "five-day-icon-display"
);
var fiveDayIconDisplay = document.getElementsByClassName(
  "five-day-icon-display"
);
var fiveDayTemp = document.getElementsByClassName("five-day-temp");
var fiveDayWind = document.getElementsByClassName("five-day-wind");
var fiveDayHumidity = document.getElementsByClassName("five-day-humidity");

// Search button
var searchBtn = document.getElementById("search");

// Current date
var currentDate = moment().format("l");

// Displays city name and current date
currentCity.textContent = "Daily Forecast " + "(" + currentDate + ")";

// Fetches weather forecast when search button is clicked
searchBtn.addEventListener("click", async function (event) {
  event.preventDefault();

  // User inputed city
  city = document.getElementById("search-input").value;

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
    });

  // Five day forecast URL
  var fiveDayForecastUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    APIKey +
    "&units=imperial";

  console.log(fiveDayForecastUrl);

  // Displays five day weather forecast
  fetch(fiveDayForecastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      // Displays five-day forecast data
      // j = 6 because this diplays data beginning at the next day
      for (var i = 0, j = 6; i < 5, j < data.list.length; i++, j += 8) {
        fiveDayIconDisplay[i].setAttribute(
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
  searchHistory();
});

// Creates button for search history
function searchHistory() {
  // Search history section. Creates button for every search made
  var searchHistoryDiv = document.getElementById("search-history");

  // Creates a button for each city searched
  var searchHistoryBtn = document.createElement("button");
  searchHistoryBtn.setAttribute("class", "btn btn-block searchHistory");

  // Displays butotn for each city searched and saves to local storage
  searchHistoryDiv.append(searchHistoryBtn);
  localStorage.setItem(city, city);
  searchHistoryBtn.textContent = localStorage.getItem(city);

  // When button for previous searches are clicked, then it goes to that data
  searchHistoryBtn.addEventListener("click", function (event) {
    event.preventDefault();
    alert("this city search has been clicked");
  });
}

// TODO: Add event listener so that button links to saved searches to corresponding weather data

// Displays dates for the five day forecast
for (var i = 0; i < 5; i++) {
  var futureDates = document.getElementsByClassName("card-title");

  futureDates[i].textContent = moment()
    .add(1 + i, "days")
    .format("l");
}

// TODO: Make search input begin with capital letter
// TODO: Link search history buttons to it's search
