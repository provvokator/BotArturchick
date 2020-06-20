const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
class Weather {
    constructor(keyf, keys) {
        this.keyf = keyf;
        this.keys = keys;
    }

    //FrowCelsiusToKelvin=(val)=>Math.round(val-273);

    GetWeather(city) {
        return new Promise((resolve) => {
            let xhr = new XMLHttpRequest();
            let url = encodeURI(this.keyf + city + this.keys);
            xhr.open('GET', url, true);

            /**
             * @return {number}
             */

            function FromCelsiusToKelvin(val) {
                return Math.round(val - 273);
            }

            /**
             * @return {number}
             */
            function FromMetersToKpmh (value){
                return value*3;
            }
            
            function responseRender(data){
                return "Город:" + data.name + '\n Температура :'+ FromCelsiusToKelvin((Math.round(data.main.temp)))+"℃"+'\n'
                    +"Мин: "+FromCelsiusToKelvin((Math.round(data.main.temp_min))) + ' ℃'+'\n'
                    +"Макс: "+FromCelsiusToKelvin((Math.round(data.main.temp_max))) + ' ℃'+'\n'+
                    "Ощущается как: " +FromCelsiusToKelvin((Math.round(data.main.feels_like))) + ' ℃'+'\n'
                    +"Ветер: "+FromMetersToKpmh(data.wind.speed)+" Км/ч \n"+
                    "Влажность: " + data.main.humidity + "%\n"+
                    "Давление: "+ data.main.pressure + "гПа\n";



            }


            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 400) {
                    var data = JSON.parse(xhr.responseText);
                    console.log(data);

                   console.log("Температура "+data.main.temp);

                    let weather = responseRender(data);
                    resolve(weather);
                }
            };
            xhr.send();


        })


    }
}

//var weather = new Weather('http://api.openweathermap.org/data/2.5/weather?q=','&APPID=d160ea4124bd5a60d58084735ce6bb69')
// weather.GetWeather("Moscow").then(function (result) {
//     console.log(result);
// })
 module.exports = Weather;






