//initialize


$(document).ready(function(){
  //$('#weatherBox').hide();
  $("#weatherBox").hide();
  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
  });
  }
  
});

$(".button").on('click',function(){
  
  getCountry();
  getCity();

});
$(document).ajaxStart(function() {
  $("#message").html("Please Wait ... ");  
});
$(document).ajaxStop(function(){
  $('#weatherBox').fadeIn(600);
  setWeather();
  $('#message').hide();
  $('#clickButton').hide();
}); 
  function setWeather(){
  document.getElementById("wind").innerHTML = wind;
 document.getElementById("temperature").innerHTML = temperature;
 document.getElementById("pressure").innerHTML = pressure;
 document.getElementById("humidity").innerHTML = humidity;
 document.getElementById("meteo").innerHTML= weather;
    // getting back img
          
 document.getElementById("weatherBox").style= "background :url(" + imagebank[weather] + ") no-repeat; background-size : cover;";   
    // getting city
 document.getElementById("city").innerHTML = city + " , " + country;
 document.getElementById("countryimg").src = "http://www.geognos.com/api/en/countries/flag/" + countryCode + ".png";
}
    


var imagebank = {
  IWind : 'https://image.flaticon.com/icons/svg/56/56086.svg',
  ITemperature : 'https://d30y9cdsu7xlg0.cloudfront.net/png/218414-200.png',
  IPessure : 'https://d30y9cdsu7xlg0.cloudfront.net/png/1841-200.png',
  IHumidity : 'https://image.flaticon.com/icons/svg/219/219816.svg',
  Drizzle : 'http://pixdaus.com/files/items/pics/9/43/95943_ec26208a9394e79d9e2a50197fff5192_large.jpg',
  Snow : 'http://cdn1.theodysseyonline.com/files/2016/02/08/6359048687053497271327874315_snow-day-5.jpg',
  Clear : 'http://www.sunwindenergy.com/sites/default/files/field/image/solar_thermal_new_york.jpg',
  Rain : 'https://orig00.deviantart.net/aeab/f/2008/293/c/1/rainy_day_by_rhads.jpg',
  Clouds : 'https://static.pexels.com/photos/901/city-clouds-cloudy-sun.jpg',
  Fog : 'https://img00.deviantart.net/6797/i/2013/316/3/a/a_foggy_night_by_m_eralp-d6tz2vb.jpg',
  Mist : 'https://www.metoffice.gov.uk/binaries/content/gallery/mohippo/images/learning/learn-about-the-weather/fog/mist-in-herzel-switzerland.-photo-by-ricardo-gomez-angel.jpg'
}

/*function getbackimg(){
  var background = document.getElementById("background-tile");
  background.style.backgroundImage = "url(http://www.sunwindenergy.com/sites/default/files/field/image/solar_thermal_new_york.jpg)"  
}*/
function getCountry(){
$.ajax({ 
        dataType: "json",
        contentType: "application/json",
        type : "GET",
        url: "https://fcc-weather-api.glitch.me//api/current?",
        data : {
          lat: latitude,
          lon: longitude,      
        }
})
  .done(function(quote){
 temperature = Math.round(2*parseFloat(quote.main.temp))/2;
 wind = quote.wind.speed;
 pressure = quote.main.pressure;
 humidity = quote.main.humidity;
 weather = quote.weather[0].main;
 console.log(temperature)
 country = quote.sys.country;
 /*document.getElementById("wind").innerHTML = wind;
 document.getElementById("temperature").innerHTML = temperature;
 document.getElementById("pressure").innerHTML = pressure;
 document.getElementById("humidity").innerHTML = humidity;
 document.getElementById("meteo").innerHTML= weather;         
  // getting back img
          
 document.getElementById("weatherBox").style= "background :url(" + imagebank[weather] + ") no-repeat; background-size : cover;";      
*/
        })
  .fail(document.getElementById("temperature").innerHTML = "error"); 
  
}
function getCity(){
$.ajax({
  datatype : "json",
  contentType : "application/json",
  type : "GET",
  url : "https://nominatim.openstreetmap.org/reverse?",
  data : {
    format:"json",
    lat :"50.8503",
    lon : "4.3517",
    zoom:"18",
    adressdetails:"1"
  },
  success : function(quote){
     city = quote.address.city;
     country = quote.address.country
     countryCode = quote.address.country_code.toUpperCase()
    
  },
  error : document.getElementById("city").innerHTML = "error!"
});
};


// secret api key





/*var rain = ""
var wind = ""
var time;
$.ajax({
  type : "GET",
  url : "https://fcc-weather-api.glitch.me/api/current?lon=139&lat=35",
  sucess : function(weather){
    windspeed = weather.wind[0];
    rain = weather.rain;
    document.getElementById("weather").innerHTML = weather;
  },
  error:document.getElementById("weather").innerHTML = "error"
}) */