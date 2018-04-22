
var ajax = function (method, url, data, sufn, failfn) {
    var request = new XMLHttpRequest();
    request.open(method, url);
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                sufn(request.responseText);
            } else {
                failfn(request.statusText);
            }
        }
    }
    request.send(data);
}


function futureWeather(res) {
    var jsonRes = JSON.parse(res);

    var weatherDetial = document.getElementsByClassName('weather-detail')[0];
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    var date = myDate.getDate();



    var str = '<div>'+
        '<div class="today-weather">'+
            '<h1 class="city-location">'+jsonRes.HeWeather6[0].basic.location +'</h1>'+
            '<div class="row-detail">'+
            '<img src="../weatherIcon/'+ jsonRes.HeWeather6[0].now.cond_code+'.png"/>'+
            '<h1>'+ jsonRes.HeWeather6[0].now.tmp +'&#176'+'</h1>'+
            '</div>'+
            '<div class="wind">'+
                '<h2>'+ jsonRes.HeWeather6[0].now.cond_txt+'</h2>'+
                '<h4>'+ jsonRes.HeWeather6[0].now.wind_dir  + '  '+ '风力' + jsonRes.HeWeather6[0].now.wind_sc + '级' + '   '+ '湿度' +jsonRes.HeWeather6[0].now.hum +'%'+ '</h4>'+
            '</div>'+
        '</div>'+
        '<div class="content">'+
            '<div class="wrap" id="wrap">'+
                '<div class="row">'+
                    '<h4>'+jsonRes.HeWeather6[0].daily_forecast[0].date +'</h4>'+
                    '<img src="../weatherIcon/'+ jsonRes.HeWeather6[0].now.cond_code+'.png"/>'+
                    '<h1>'+jsonRes.HeWeather6[0].daily_forecast[0].tmp_min +'&#176'+'~'+jsonRes.HeWeather6[0].daily_forecast[0].tmp_max +'&#176'+'</h1>'+
                    '<h4>'+jsonRes.HeWeather6[0].now.cond_txt +'</h4>'+
                '</div>'+
                '<div class="row">'+
                    '<h4>'+jsonRes.HeWeather6[0].daily_forecast[1].date +'</h4>'+
                    '<img src="../weatherIcon/'+ jsonRes.HeWeather6[0].daily_forecast[1].cond_code_d +'.png"/>'+
                    '<h1>'+jsonRes.HeWeather6[0].daily_forecast[1].tmp_min +'&#176'+'~'+jsonRes.HeWeather6[0].daily_forecast[0].tmp_max +'&#176'+'</h1>'+
                    '<h4>'+jsonRes.HeWeather6[0].daily_forecast[1].cond_txt_d +'</h4>'+
                '</div>'+
                '<div class="row">'+
                    '<h4>'+jsonRes.HeWeather6[0].daily_forecast[2].date +'</h4>'+
                    '<img src="../weatherIcon/'+ jsonRes.HeWeather6[0].daily_forecast[2].cond_code_d +'.png"/>'+
                    '<h1>'+jsonRes.HeWeather6[0].daily_forecast[2].tmp_min +'&#176'+'~'+jsonRes.HeWeather6[0].daily_forecast[2].tmp_max +'&#176'+'</h1>'+
                    '<h4>'+jsonRes.HeWeather6[0].daily_forecast[2].cond_txt_d +'</h4>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>';

    weatherDetial.innerHTML = str;

}


function reject(res) {
    console.log('something wrong ' + res);
}


window.onload = function () {
    var searchWeather = document.getElementsByClassName('search-weather')[0];
    var searchBtn = document.getElementsByClassName('search-btn')[0];
    var city;
    
    searchBtn.onclick = function(){
        var cityValue = searchWeather.value;
                
        cityValue && citydata[cityValue] ? city = citydata[cityValue] : city = 'CN101010100';
        updateCity(city);
    }

    updateCity("CN101010100");
   
}

function updateCity(cityId) {
    ajax('GET','https://free-api.heweather.com/s6/weather?location='+ cityId +'&key=b7a1091a431f44a89af18b8a210b4e62', null, futureWeather, reject);
}
