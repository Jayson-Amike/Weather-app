const WheatherImg=["raining.png","sun.png","cloudy-day.png","cloud.png"];// get a reference to the form element
var myForm = document.getElementById("search");

/*
   read in the city from the form and send to to get weather function
*/
myForm.addEventListener("submit", function(event) {
  // prevent the default form submission behavior
  event.preventDefault();

  // call your function here
  var input = document.getElementById("inputField").value;
  getWeather(input);
});

/*
   get weather of inputed city
*/
function getWeather(city){
    let l2="https://api.api-ninjas.com/v1/weather?city="+city;
    fetch(l2, {
        method: "GET",
        headers: {
            'X-Api-Key': 'NiP60u5mcmNzkS3gKkA39w==m0LnbfxMuL1dpriq'
        }
    }).then(function(reponse){
        return reponse.json();
    }).then(function(obj){
        if(obj.temp!=undefined){
            setAtrr(obj,city);
        }else{
            alert("the city is not in the database");
        }
        console.log(obj.temp,city)
     //   boj.citySec
    }).catch(function (error){
        console.error('An error occurred while retrieving the data:', error);
    });
    
}


//default
/*
var citySec = document.getElementById("city");
citySec.innerHTML="london";
*/
function displayWeatherImage(info) {
    weatherIcon=document.getElementById("WeatherImg");
    weatherIcon.src="image/";
    console.log("temp: "+info.temp+" humidity: "+info.humidity );
    if (info.temp > 0 && info.humidity >30 ) {
        weatherIcon.src +=WheatherImg[1];
    } else if (info.temp > 0 && info.temp <= 30 && info.humidity < 70 ) {
        weatherIcon.src +=WheatherImg[3];
    } else if (info.temp > 10 && info.temp <= 20 && info.humidity < 80 ) {
        weatherIcon.src +=WheatherImg[2];
    } else if (info.temp <= 10 || info.humidity >= 80 ) {
        weatherIcon.src +=WheatherImg[0];
    }
  }
  
/*
    this is a function that set atrribute of the city weather
*/
function setAtrr(info,city){
    var tempSec = document.getElementById("weather");
    var citySec = document.getElementById("city");
    var HumidityInfo = document.getElementById("HumidityInfo");
    var WindyInfo = document.getElementById("WindyInfo");
    var Humanitylbl = document.getElementById("Humanitylbl");
    var Windlbl = document.getElementById("Windylbl");
    var icon = document.getElementsByClassName("icon");

    tempSec.innerHTML=info.temp+"°C";
    citySec.innerHTML=city;
    HumidityInfo.innerHTML=info.humidity+"%";
    WindyInfo.innerHTML=info.wind_speed+"Km/h";
    Humanitylbl.innerHTML="Humidity";
    Windlbl.innerHTML="Wind speed";
    for(var i=0; i<icon.length;i++){
        icon[i].style.display="block";
    }
    displayWeatherImage(info);
}

