const forecastContainer = $("#forecast");
const todayContainer = $("#today");
const fiveDays = $("#5days");
const apiKey = "8cd1ced871abc4840d6ef09b2a8f9080";

$(".search-button").click(function (event) {
  event.preventDefault();
  
  var queryParam = $("#search-input").val();

  var weather =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    queryParam +
    "&units=metric&appid=" +
    apiKey;

  if (!queryParam) {
    return;
  }


  
});


//$(".container-fluid").empty();