var weatherApiKey = config.weatherApiKey;
function gettingWeather(){
$.getJSON("//api.openweathermap.org/data/2.5/weather?q=London&APPID="+weatherApiKey,function(json){
    document.write(json);
});
};