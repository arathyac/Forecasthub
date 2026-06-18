const apiKey = "66b52621a5c40778199009a8f70b4678";

async function getWeatherByCity() {
    const city = document.getElementById("cityInput").value.trim();

    if (!city) {
        document.getElementById("result").innerHTML =
            "<p>Please enter a city name.</p>";
        return;
    }

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod != 200) {
            document.getElementById("result").innerHTML =
                `<p>${data.message}</p>`;
            return;
        }

	document.getElementById("result").innerHTML = `
    		<h3>${data.name}, ${data.sys.country}</h3>

    		<p>🌡 Temperature: ${data.main.temp} °C</p>
 	   	<p>🤗 Feels Like: ${data.main.feels_like} °C</p>
   		<p>☁ Weather: ${data.weather[0].description}</p>

    		<p>💧 Humidity: ${data.main.humidity}%</p>
    		<p>💨 Wind Speed: ${data.wind.speed} m/s</p>
    		<p>🌍 Pressure: ${data.main.pressure} hPa</p>
    		<p>👀 Visibility: ${(data.visibility / 1000).toFixed(1)} km</p>
    		<p>☁ Cloud Coverage: ${data.clouds.all}%</p>            <img class="weather-icon"
            src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
        `;
    } catch (error) {
        document.getElementById("result").innerHTML =
            "<p>Error fetching weather data.</p>";
    }
}

function getWeather() {
    document.getElementById("result").innerHTML =
        "<p>Location may not work on EC2 HTTP. Use city search instead.</p>";
}
