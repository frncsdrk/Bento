// ┬ ┬┌─┐┌─┐┌┬┐┬ ┬┌─┐┬─┐
// │││├┤ ├─┤ │ ├─┤├┤ ├┬┘
// └┴┘└─┘┴ ┴ ┴ ┴ ┴└─┘┴└─
// Functions to setup Weather widget.

const container   = document.querySelector('.weatherBlock');
const iconElement = document.querySelector('.weatherIcon');
const tempElement = document.querySelector('.weatherValue p');
const descElement = document.querySelector('.weatherDescription p');

const weather = {};
weather.temperature = {
	unit: 'celsius',
};

const cfg = CONFIG.weather;
var tempUnit = cfg.weather.weatherUnit;

const KELVIN = 273.15;
const key = `${cfg.weather.weatherKey}`;
if (cfg.weather.enabled) {
    container.classList.remove('hide');
    setPosition();
}

// called by document
function setPosition(position) {
	if (!cfg.weather.trackLocation || !navigator.geolocation) {
		if (cfg.weather.trackLocation) {
			console.error('Geolocation not available');
		}
		getWeather(cfg.weather.defaultLatitude, cfg.weather.defaultLongitude);
		return;
	}
	navigator.geolocation.getCurrentPosition(
		pos => {
			getWeather(pos.coords.latitude.toFixed(3), pos.coords.longitude.toFixed(3));
		},
		err => {
			console.error(err);
			getWeather(cfg.weather.defaultLatitude, cfg.weather.defaultLongitude);
		}
	);
}

// called by `setPosition`
function getWeather(latitude, longitude) {
	let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=${cfg.weather.language}&appid=${key}`;
	fetch(api)
		.then(function(response) {
			let data = response.json();
			return data;
		})
		.then(function(data) {
			let celsius = Math.floor(data.main.temp - KELVIN);
			weather.temperature.value = tempUnit == 'C' ? celsius : (celsius * 9) / 5 + 32;
			weather.description = data.weather[0].description;
			weather.iconId = data.weather[0].icon;
		})
		.then(function() {
			displayWeather();
		});
}

// called by `getWeather`
function displayWeather() {
	iconElement.innerHTML = `<img src="assets/icons/${cfg.weather.weatherIcons}/${weather.iconId}.png"/>`;
	tempElement.innerHTML = `${weather.temperature.value.toFixed(0)}°<span class="darkfg">${tempUnit}</span>`;
	descElement.innerHTML = weather.description;
}
