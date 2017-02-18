var weatherApiKey = config.weatherApiKey;
function gettingWeather(){
$.getJSON("//crossorigin.me/http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid="+weatherApiKey,function(json){
    document.write(JSON.stringify(json));
});
};