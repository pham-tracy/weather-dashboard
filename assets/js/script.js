// API key for Weather API
var APIKey = "c760641df731ec398ea17ddbcb746b34";

// Current weather forecast
var currentCity = document.getElementById("current-city");
var currentTemp = document.getElementById("current-temp");
var currentWind = document.getElementById("current-wind");
var currentHumidity = document.getElementById("current-humidity");

// Search button
var searchBtn = document.getElementById("search");

// Current date
var currentDate = moment().format("l");

searchBtn.addEventListener("click", async function (event) {
  // user inputed city
  var city = document.getElementById("search-input").value;

  // request URL for current weather
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey +
    "&units=imperial";
  console.log(requestUrl);
  console.log(city);

  event.preventDefault();
  console.log(city);

  // Displays current weather
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(requestUrl);
      currentCity.textContent =
        data.name + " " + data.weather[0].icon + " (" + currentDate + ")";

      currentTemp.textContent = "Temp: " + data.main.temp + "°F";
      currentWind.textContent = "Wind: " + data.wind.speed + " MPH";
      currentHumidity.textContent = "Humidity: " + data.main.humidity + " %";
    })
    .catch(function (error) {
      alert("error");
    });

  // Five day forecast URL
  var fiveDayForecastUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    APIKey +
    "&units=imperial";

  console.log(fiveDayForecastUrl);

  // var fiveDayForecast = document.getElementById("five-day-forecast");

  fetch(fiveDayForecastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      //Five day icon information
      var fiveDayIcon = document.getElementsByClassName("five-day-icon");

      console.log(data.list[0].weather.icon);

      // Five day temp information
      var fiveDayTemp = document.getElementsByClassName("five-day-temp");

      // Five day wind information
      var fiveDayWind = document.getElementsByClassName("five-day-wind");

      // Five day humidity information
      var fiveDayHumidity =
        document.getElementsByClassName("five-day-humidity");

      // Displays five day forecast data
      // j = 6 because this starts at the next day data. when [0], sometimes it stays on the previous/current day
      for (var i = 0, j = 6; i < 5, j < data.list.length; i++, j += 8) {
        console.log(data.list[j].dt_txt);
        console.log(fiveDayTemp[i]);
        fiveDayIcon[i].textContent = data.list[j].weather[0].icon;
        fiveDayTemp[i].textContent = "Temp: " + data.list[j].main.temp + "°F";
        fiveDayWind[i].textContent =
          "Wind: " + data.list[j].wind.speed + " MPH";
        fiveDayHumidity[i].textContent =
          "Humidity: " + data.list[j].main.humidity + "%";
      }

      // Search history section. Creates button for every search made
      var searchHistoryDiv = document.getElementById("search-history");
      searchHistoryDiv.append(searchHistoryBtn);
      localStorage.setItem(city, city);
      searchHistoryBtn.textContent = localStorage.getItem(city);
    });
});

var searchHistoryBtn = document.createElement("button");
searchHistoryBtn.setAttribute("class", "btn btn-block searchHistory");

searchHistoryBtn.addEventListener("click", function (event) {
  event.preventDefault();

  alert("this city search has been clicked");
});

// Displays dates for the five day forecast
for (var i = 0; i < 5; i++) {
  var futureDates = document.getElementsByClassName("card-title");

  futureDates[i].textContent = moment()
    .add(1 + i, "days")
    .format("l");
}

// TODO: display icons - if statement? create elements?
// TODO: link saved searches to corresponding data
// QUESTIONS: why doesnt city & requestURL variables work as global variables???
