var body = document.body;
var cityOutput = document.getElementById("city_output");
var weatherOutput = document.getElementById("weather_output");


var weatherLocation;
var timeZone = "Europe/London";

function gettingWeather(e){
    weatherLocation = e.target.dataset.location;
    timeZone = e.target.dataset.timezone;
    // https://developer.yahoo.com/weather/
    $.getJSON("https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22"+weatherLocation+"%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",function(json){
        var temperatureFarenheit = json.query.results.channel.item.condition.temp;
        var weatherConditions = json.query.results.channel.item.condition.text;
        cityOutput.innerHTML = locationName(weatherLocation);
        weatherOutput.innerHTML = "<span class='temperature'>"+temperatureCelsius(temperatureFarenheit)+"°C </span><br/>"+weatherConditions;
        body.className= weatherLocation+"-bg";
    });
};
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
    secondHand.style.transform = `rotate(${secondDegree}deg)`;
    

    const minuteDate = now.minutes();
    const minuteDegree = ((minuteDate / 60) * 360) + 90;
    if (minuteDegree < 100) { //  1mn = 6deg => 10 deg + 90deg
        minuteHand.style.transition = 'none';
    } else {
        minuteHand.style.transition = 'all 0.05s';
    }
    minuteHand.style.transform = `rotate(${minuteDegree}deg)`;
    
    const hourDate = now.hours();
    const hourDegree = ((hourDate / 12) * 360) + 90;
    if (hourDegree < 130) { // 1hr = 30deg -> 40 deg + 90deg
        hourHand.style.transition = 'none';
    } else {
        hourHand.style.transition = 'all 0.05s';
    }
    hourHand.style.transform = `rotate(${hourDegree}deg)`;
}
setInterval(setDate, 1000);

function locationName(name) {
    return name.split("-").map(function(subString){
        return subString[0].toUpperCase()+subString.substring(1);
    }).join(" ");
}

function temperatureCelsius (temp) {
    return Math.round((temp-32)*(5/9)); 
}
var weatherButtons = document.querySelectorAll(".weatherButtons");
weatherButtons.forEach(weatherButton => weatherButton.addEventListener('click', gettingWeather));