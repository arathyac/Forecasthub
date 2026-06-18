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

    fetchWeather(url);
}

function getWeather() {

    if (!navigator.geolocation) {
        document.getElementById("result").innerHTML =
            "<p>Geolocation is not supported by your browser.</p>";
        return;
    }

    document.getElementById("result").innerHTML =
        "<p>Detecting your GPS location...</p>";

    navigator.geolocation.getCurrentPosition(

        function(position) {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const url =
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            fetchWeather(url);
        },

        function(error) {

            document.getElementById("result").innerHTML =
                "<p>Please allow location access.</p>";
        }
    );
}

async function fetchWeather(url) {

    try {

        const response = await fetch(url);
        const data = await response.json();

        if (data.cod != 200) {
            document.getElementById("result").innerHTML =
                `<p>${data.message}</p>`;
            return;
        }

        const sunrise =
            new Date(data.sys.sunrise * 1000).toLocaleTimeString();

        const sunset =
            new Date(data.sys.sunset * 1000).toLocaleTimeString();

        document.getElementById("result").innerHTML = `
            <h3>${data.name}, ${data.sys.country}</h3>

            <p>🌡 Temperature: ${data.main.temp} °C</p>
            <p>🤗 Feels Like: ${data.main.feels_like} °C</p>
            <p>☁ Weather: ${data.weather[0].description}</p>

            <p>💧 Humidity: ${data.main.humidity}%</p>
            <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
            <p>🌍 Pressure: ${data.main.pressure} hPa</p>
            <p>👀 Visibility: ${(data.visibility / 1000).toFixed(1)} km</p>
            <p>☁ Cloud Coverage: ${data.clouds.all}%</p>

            <p>🌅 Sunrise: ${sunrise}</p>
            <p>🌇 Sunset: ${sunset}</p>

            <img class="weather-icon"
            src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
        `;

    } catch (error) {

        document.getElementById("result").innerHTML =
            "<p>Error fetching weather data.</p>";
    }
}
