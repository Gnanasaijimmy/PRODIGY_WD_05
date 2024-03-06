const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const hidecity = document.querySelector(".hide-city");

search.addEventListener('click',() => {
    const APIKey = 'fea1afb47bf597034ea1bf7aaa899bb3';

    const city = document.querySelector(".search-box input").value;

    if (city == "")
        return;
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

    if(json.cod == '404'){
        hidecity.textContent = city;
        container.style.height = '400px';
        weatherBox.classList.remove('active');
        weatherDetails.classList.remove('active');
        error404.classList.add('active');
        return;
    }

    container.style.height = '550px';
    weatherBox.classList.add('active');
    weatherDetails.classList.add('active');
    error404.classList.remove('active');

    const image = document.querySelector(".weather-box img");
    const temperature = document.querySelector(".weather-box .temperature");
    const description = document.querySelector(".weather-box .description");
    const humidity = document.querySelector(".weather-details .humidity span");
    const wind = document.querySelector(".weather-details .wind span");

    if (hidecity.textContent == city){
            return;
    }
    else{
        hidecity.textContent = city;

        container.style.height = '550px';
        container.classList.add('active');
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        setTimeout(() => {
            container.classList.remove('active');
        }, 2500);

        switch (json.weather[0].main) {
            case 'Clear':
                image.src ='images/sun_4814268.png';
                
                break;

            case 'Rain':
                image.src ='images/storm_1207658.png'
                
                break;
        
            case 'Snow':
                image.src ='images/snow_9116650.png'
                
                break;

            case 'Clouds':
                image.src ='images/cloudy_1163661.png'
                
                break;
                
            case 'Mist':
                image.src ='images/wind_4834709.png'
                
                break;
            
            case 'Haze':
                image.src ='images/wind_4834709.png'
                
                break;
            
            default:
                image.src = "images/cloudy_1163661.png";
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        const weatherinfo = document.querySelector('.info-weather');
        const humidityinfo = document.querySelector('.humidity-info');
        const windinfo = document.querySelector('.wind-info');

        const cloneweatherinfo = weatherinfo.cloneNode(true);
        const clonehumidityinfo = humidityinfo.cloneNode(true);
        const clonewindinfo = windinfo.cloneNode(true);

        cloneweatherinfo.id = 'clone-info-weather';
        cloneweatherinfo.classList.add('active-clone');

        clonehumidityinfo.id = 'clone-info-humidity';
        clonehumidityinfo.classList.add('active-clone');

        clonewindinfo.id = 'clone-info-wind';
        clonewindinfo.classList.add('active-clone');

        setTimeout(() => {
            weatherinfo.insertAdjacentElement('afterend',cloneweatherinfo);
            humidityinfo.insertAdjacentElement('afterend',clonehumidityinfo);
            windinfo.insertAdjacentElement('afterend',clonewindinfo);
        }, 2200);

        const allcloneweatherinfo = document.querySelectorAll('.info-weather.active-clone');
        const totalcloneweatherinfo = allcloneweatherinfo.length;
        const cloneweatherinfofirst = allcloneweatherinfo[0];

        const allclonehumidityinfo = document.querySelectorAll('.humidity-info.active-clone');
        const clonehumidityinfofirst = allclonehumidityinfo[0];

        const allclonewindinfo = document.querySelectorAll('.wind-info.active-clone');
        const clonewindinfofirst = allclonewindinfo[0];

        if (totalcloneweatherinfo > 0){
            cloneweatherinfofirst.classList.remove('active-clone');
            clonehumidityinfofirst.classList.remove('active-clone');
            clonewindinfofirst.classList.remove('active-clone');

            setTimeout(() => {
                cloneweatherinfofirst.remove();
                clonehumidityinfofirst.remove();
                clonewindinfofirst.remove();
            }, 2200);
        }

    }
        
    });
})
