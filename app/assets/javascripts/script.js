var body = document.body;
var cityOutput = document.getElementById("city-output");
var weatherOutput = document.getElementById("weather-output");
var weatherLocation;
var temperatureFar;
var temperatureCel;
var temperatureUnit = "C";
var weatherConditions;
var timeZone = "Europe/London";
gettingWeather();
/* weather */
function gettingWeather(e){
    if (e === undefined) {
        weatherLocation =  'london';
        timeZone = "Europe/London";
    } else {
        weatherLocation = e.target.dataset.location;
        timeZone = e.target.dataset.timezone;
    }
    // https://developer.yahoo.com/weather/
    $.getJSON("https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22"+weatherLocation+"%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",function(json){
        temperatureFar = json.query.results.channel.item.condition.temp;
        temperatureCel = temperatureCelsius(temperatureFar);
        weatherConditions = json.query.results.channel.item.condition.text;
        cityOutput.innerHTML = locationName(weatherLocation);
        weatherOutput.innerHTML = "<span class='temperature'>"+temperatureCelsius(temperatureFar)+"°"+temperatureUnit+" </span><br/>"+weatherConditions;
        body.className= weatherLocation+"-bg";
    });
};
function locationName(name) {
    return name.split("-").map(function(subString){
        return subString[0].toUpperCase()+subString.substring(1);
    }).join(" ");
}

function temperatureCelsius (temp) {
    return Math.round((temp-32)*(5/9)); 
}
function toggleUnit (e) {
    if (temperatureUnit === "C") {
        temperatureUnit = "F";
        weatherOutput.innerHTML = "<span class='temperature'>"+temperatureFar+"°"+temperatureUnit+" </span><br/>"+weatherConditions;
    } else {
        temperatureUnit = "C";
        weatherOutput.innerHTML = "<span class='temperature'>"+temperatureCel+"°"+temperatureUnit+" </span><br/>"+weatherConditions;
    }
}

/* time */
const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

function setDate() {

    const now = moment().tz(timeZone);
    const secondDate = now.seconds();
    const secondDegree = ((secondDate / 60) * 360) + 90; // because of transform: rotate(90deg); in the CSS
    if (secondDegree < 100) { //  1sec = 6deg => 10 deg + 90deg
        secondHand.style.transition = 'none';
    } else {
        secondHand.style.transition = 'all 0.05s';
    }
    secondHand.style.transform = 'rotate('+secondDegree+'deg)';
    

    const minuteDate = now.minutes();
    const minuteDegree = ((minuteDate / 60) * 360) + 90;
    if (minuteDegree < 100) { //  1mn = 6deg => 10 deg + 90deg
        minuteHand.style.transition = 'none';
    } else {
        minuteHand.style.transition = 'all 0.05s';
    }
    minuteHand.style.transform = 'rotate('+minuteDegree+'deg)';
    
    const hourDate = now.hours();
    const hourDegree = ((hourDate / 12) * 360) + 90;
    if (hourDegree < 130) { // 1hr = 30deg -> 40 deg + 90deg
        hourHand.style.transition = 'none';
    } else {
        hourHand.style.transition = 'all 0.05s';
    }
    hourHand.style.transform = 'rotate('+hourDegree+'deg)';
}
setInterval(setDate, 1000);


var weatherButtons = document.querySelectorAll(".weatherButtons");
weatherButtons.forEach(weatherButton => weatherButton.addEventListener('click', gettingWeather));
var toggleButton = document.querySelector(".toggleButton");
toggleButton.addEventListener('click', toggleUnit);