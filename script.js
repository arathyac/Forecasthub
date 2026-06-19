const apiKey = "66b52621a5c40778199009a8f70b4678";

function getWeather() {
    if (!navigator.geolocation) {
        document.getElementById("mainWeather").innerHTML =
            "<h1>Geolocation not supported</h1>";
        return;
    }

    document.getElementById("mainWeather").innerHTML =
        "<h1>Detecting your location...</h1>";

    navigator.geolocation.getCurrentPosition(
        function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const url =
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            fetchWeather(url);
        },
        function() {
            document.getElementById("mainWeather").innerHTML =
                "<h1>Please allow location access</h1>";
        }
    );
}

function getWeatherByCity() {
    const city = document.getElementById("cityInput").value.trim();

    if (!city) {
        document.getElementById("mainWeather").innerHTML =
            "<h1>Please enter a city</h1>";
        return;
    }

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetchWeather(url);
}

async function fetchWeather(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod != 200) {
            document.getElementById("mainWeather").innerHTML =
                `<h1>${data.message}</h1>`;
            return;
        }

        changeBackground(data.weather[0].main);

        const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

        document.getElementById("mainWeather").innerHTML = `
            <h1>${data.name}, ${data.sys.country}</h1>
            <div class="big-temp">${Math.round(data.main.temp)}°</div>
            <p>${data.weather[0].description}</p>
            <img class="weather-icon"
            src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
        `;

        document.getElementById("result").innerHTML = `
            <div class="detail-card">
                <h3>Feels Like</h3>
                <p>${data.main.feels_like} °C</p>
            </div>

            <div class="detail-card">
                <h3>Humidity</h3>
                <p>${data.main.humidity}%</p>
            </div>

            <div class="detail-card">
                <h3>Wind Speed</h3>
                <p>${data.wind.speed} m/s</p>
            </div>

            <div class="detail-card">
                <h3>Pressure</h3>
                <p>${data.main.pressure} hPa</p>
            </div>

            <div class="detail-card">
                <h3>Visibility</h3>
                <p>${(data.visibility / 1000).toFixed(1)} km</p>
            </div>

            <div class="detail-card">
                <h3>Cloud Coverage</h3>
                <p>${data.clouds.all}%</p>
            </div>

            <div class="detail-card">
                <h3>Sunrise</h3>
                <p>${sunrise}</p>
            </div>

            <div class="detail-card">
                <h3>Sunset</h3>
                <p>${sunset}</p>
            </div>
        `;

    } catch (error) {
        document.getElementById("mainWeather").innerHTML =
            "<h1>Error fetching weather</h1>";
    }
}

function changeBackground(weather) {
    document.body.className = "";

    if (weather === "Clear") {
        document.body.classList.add("clear");
    } else if (weather === "Clouds") {
        document.body.classList.add("clouds");
    } else if (weather === "Rain" || weather === "Drizzle") {
        document.body.classList.add("rain");
    } else if (weather === "Thunderstorm") {
        document.body.classList.add("storm");
    } else if (weather === "Mist" || weather === "Fog" || weather === "Haze") {
        document.body.classList.add("mist");
    } else {
        document.body.classList.add("default");
    }
}
