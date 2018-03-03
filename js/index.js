var lon;
var lat;
var api = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon="+ lon;

var tempUnit = '°C';

var positionurl = "https://freegeoip.net/json/"
$( document ).ready(function(){
  $.getJSON(positionurl,function(data){
    var lat = data.latitude;
    var lon = data.longitude;
     ShowLocalDate();
    $("#longitude").html("longitude: " + lon);
    $("#latitude").html("latitude: " + lat);
    getWeather(lat, lon);

    $("#tempunit").click(function () {
      var currentTempUnit = $("#tempunit").text();
      var newTempUnit = currentTempUnit == "°C" ? "°F" : "°C";
      $("#tempunit").text(newTempUnit);
      if (newTempUnit == "°F") {
        var fahTemp = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
        $("#temp").text(fahTemp + " " + String.fromCharCode(176));
      } else {
        $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
      }
    });
  });

  /* temperature units */






  /* get weather info */
  function getWeather(lat, lon){
    var weatherapi = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon="+ lon;

    $.getJSON(weatherapi,function(info){

      var min_temp = info['main']['temp_min']+'/'+info['main']['temp_max'];
      var max_temp = info.main.temp_max;
      var tempC = info.main.temp;
      var pressure = info.main.pressure;
      var humidity = info.main.humidity;
      var windSpeed = info.wind.speed;
      var icon = info.weather[0].icon;
      var desc = info.weather[0].description;
      currentTempInCelsius = Math.round(tempC * 10) / 10;



        var name = info.name +', '+info['sys']['country'];

      $("#min_temp").html("min_temp : " + min_temp);
      //$("#max_temp").html("max_temp : " + max_temp);
    //  $("#temp").append("feels like "currentTempInCelsius + " " + String.fromCharCode(176));
      $("#temp").html("Current Temperature: " + currentTempInCelsius + "°C")
      $("#tempunit").text(tempUnit);
      $("#humidity").html("humidity : " + humidity +"%");
      $("#pressure").html("pressure : " + pressure);
      $("#name").html(" Country : " + name);
      $("#windSpeed").html(" windSpeed : " + windSpeed +"Kph");
      $("#icon").html("clouds" +"<img src=" + icon + "  >");
      $("#desc").html("description :" + desc);


    });


  };
  function ShowLocalDate()
    {
    var dNow = new Date();
    var localdate= (dNow.getMonth()+1) + '/' + dNow.getDate() + '/' + dNow.getFullYear() + ' ' + dNow.getHours() + ':' + dNow.getMinutes();
    $('#clockDisplay').text(localdate)
    }





});