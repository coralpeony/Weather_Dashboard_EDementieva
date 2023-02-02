const forecastContainer = $("#forecast");
const todayContainer = $("#today");
const fiveDays = $("#5days");
const apiKey = "8cd1ced871abc4840d6ef09b2a8f9080";
const searchHistory = []; 
const history = $("#history");

// pulling data from weatherAPI when the search button is clicked

$(".search-button").click(function (event) {
  event.preventDefault();
  
  const queryParam = $("#search-input").val();

  const weather =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    queryParam +
    "&units=metric&appid=" +
    apiKey;

  if (!queryParam) {
    return;
  }

  fetch(weather)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayForecastData(data);
      displayWeatherNow(data);
      savedToLS(data, queryParam);
      createButton(data.city.name);
    });
});


// display 5 day forecast 

  function displayForecastData(data) {
    forecastContainer.empty();
    fiveDays.empty();
    for (let index = 1; index < data.list.length; index += 8) {
      console.log(data.list[index]);

      const cardContainer = $('<div class="myCard">');
      const dateDiv = $("<div>Date: " + data.list[index].dt_txt + "</div>");
      const icon = data.list[index].weather[0].icon;
      const imgURL = `https://openweathermap.org/img/wn/${icon}@2x.png`
      const img = $("<img>").attr("src", imgURL);
      const tempDiv = $(
        "<div>Temp: " + data.list[index].main.temp + " °C</div>"
      );
      const windDiv = $(
        "<div>Wind: " + data.list[index].wind.speed + " metre/sec</div>"
      );
      const humidDiv = $(
        "<div>Humidity: " + data.list[index].main.humidity + " %</div>"
      );

      cardContainer.append(dateDiv);
      cardContainer.append(img);
      cardContainer.append(tempDiv);
      cardContainer.append(windDiv);
      cardContainer.append(humidDiv);
      forecastContainer.append(cardContainer);
    
    }
    
    const text = $("<h2>").text("5-Day Forecast:");
    fiveDays.prepend(text);
  }

// display data for the current day
function displayWeatherNow(data) {
  todayContainer.empty();
  
  const todayCardDiv = $('<div class="today">');
  const cityName = $("<h2>" + data.city.name + "</h2>");
  const todayDateDiv = $("<div>Date: " + data.list[0].dt_txt + "</div>");
  
  const todayIcon = data.list[0].weather[0].icon;
  const todayImgURL = `https://openweathermap.org/img/wn/${todayIcon}@2x.png`
  const todayImg = $("<img>").attr("src", todayImgURL);

  const todayTempDiv = $(
    "<div>Temp: " + data.list[0].main.temp + " °C</div>"
  );
  const todayWindDiv = $(
    "<div>Wind: " + data.list[0].wind.speed + " metre/sec</div>"
  );
  const todayHumidDiv = $(
    "<div>Humidity: " + data.list[0].main.humidity + " %</div>"
  );


  todayCardDiv.append(cityName);
  todayCardDiv.append(todayDateDiv);
  todayCardDiv.append(todayImg);
  todayCardDiv.append(todayTempDiv);
  todayCardDiv.append(todayWindDiv);
  todayCardDiv.append(todayHumidDiv);
  todayContainer.append(todayCardDiv);
  
}

// saved to local storage 

function savedToLS(data, cityName) {
  const cities = JSON.parse(localStorage.getItem("weather")) || []
  console.log(data.city.name, cityName);
  cities.push(data.city.name);
  localStorage.setItem("weather", JSON.stringify(cities))
  
  }
  
  //a button is generated for the searched city

  function createButton (cityName) {
    const button = $('<button class="button">' + cityName + "</button>");
    button.click(getHistory)
    history.append(button)
    
    }