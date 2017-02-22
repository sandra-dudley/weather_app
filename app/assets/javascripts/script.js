"use strict";
var body = document.body;
/* weather */
var cityOutput = document.getElementById("city-output");
var weatherOutput = document.getElementById("weather-output");
var weatherLocation;
var temperatureFar;
var temperatureCel;
var temperatureUnit = "C";
var weatherConditions;
var timeZone;

/* time */
var secondHand = document.querySelector('.second-hand');
var minuteHand = document.querySelector('.min-hand');
var hourHand = document.querySelector('.hour-hand');
var now;

function init() {
    gettingWeather();
}

/* weather */
function gettingWeather(){
    if (!arguments[0]) {
        weatherLocation =  'london';
        timeZone = "Europe/London";
    } else {
        var e = arguments[0];
        weatherLocation = e.target.dataset.location;
        timeZone = e.target.dataset.timezone;
    }
    // https://developer.yahoo.com/weather/
    $.getJSON("https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22"+weatherLocation+"%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",function(json){
        /* location */
        cityOutput.innerHTML = locationName(weatherLocation);
        body.className= weatherLocation+"-bg";
        
        /* temperature and weather condition */
        
        temperatureFar = json.query.results.channel.item.condition.temp;
        temperatureCel = temperatureCelsius(temperatureFar);
        weatherConditions = json.query.results.channel.item.condition.text;
        weatherOut(temperatureUnit);
        
    });
};

function weatherOut(unit) {
    weatherOutput.innerHTML = "<span class='temperature'>"+((unit==='C')?temperatureCel:temperatureFar)+"°"+temperatureUnit+" </span><br/>"+weatherConditions;
}

function locationName(name) {
    return name.split("-").map(function(subString){
        return subString[0].toUpperCase()+subString.substring(1);
    }).join(" ");
}

function temperatureCelsius (temp) {
    return Math.round((temp-32)*(5/9)); 
}
function toggleUnit () {
    temperatureUnit= (temperatureUnit === "C")?"F":"C";
    weatherOut(temperatureUnit);
}

/* time */


function setHand(el, time, deg, trans) {
    var degree = ((time / deg) * 360) + 90; // because of transform: rotate(90deg); in the CSS
    if (degree < trans) { //  1sec = 6deg => 10 deg + 90deg //  1mn = 6deg => 10 deg + 90deg // 1hr = 30deg -> 40 deg + 90deg
        el.style.transition = 'none';
    } else {
        el.style.transition = 'all 0.05s';
    }
    el.style.transform = 'rotate('+degree+'deg)';
}

function setDate() {
    now = moment().tz(timeZone);
    
    var secondDate = now.seconds();
    setHand(secondHand,secondDate, 60, 100);
    
    var minuteDate = now.minutes();
    setHand(minuteHand,minuteDate, 60, 100);
    
    var hourDate = now.hours();
    setHand(hourHand,hourDate, 12, 130);
}

setInterval(setDate, 1000);

/* event listeners */
var weatherButtons = document.querySelectorAll(".weatherButtons");
weatherButtons.forEach(weatherButton => weatherButton.addEventListener('click', gettingWeather));
var toggleButton = document.querySelector(".toggleButton");
toggleButton.addEventListener('click', toggleUnit);

init();