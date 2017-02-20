var cityOutput = document.getElementById("city_output");
var weatherOutput = document.getElementById("weather_output");
var second = document.querySelector('.second');
var minute = document.querySelector('.minute');
var hour = document.querySelector('.hour');
var body = document.body;
function gettingWeather(e){
    console.log (e.target.dataset.location);
    var weatherLocation = e.target.dataset.location;
    // https://developer.yahoo.com/weather/
    $.getJSON("https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22"+weatherLocation+"%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",function(json){
        var temperatureFarenheit = json.query.results.channel.item.condition.temp;
        var weatherConditions = json.query.results.channel.item.condition.text;
        cityOutput.innerHTML = locationName(weatherLocation);
        weatherOutput.innerHTML = "<span class='temperature'>"+temperatureCelsius(temperatureFarenheit)+"°C </span><br/>"+weatherConditions;
        body.className= weatherLocation+"-bg";
    });
};
function setDate() {
    var now = new Date();
    var secondDate = ('0'+now.getSeconds()).slice(-2);
    second.innerHTML = secondDate;
    var minuteDate = ('0'+now.getMinutes()).slice(-2);
    minute.innerHTML = minuteDate;
    var hourDate = now.getHours();
    hour.innerHTML = hourDate;
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