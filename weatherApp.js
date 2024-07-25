document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '9c29b0bcf513c1e4360dbb9f05fa699e'
    const form = document.getElementById('locationInput');
    const searchInput = document.querySelector('.search');
    const tempElement = document.querySelector('.temp');
    const cityElement = document.querySelector('.name');
    const conditionElement = document.querySelector('.condition');
    const timeElement = document.querySelector('.time');
    const dateElement = document.querySelector('.date');
    const iconElement = document.querySelector('.icon');
    const weatherApp = document.querySelector('.weather-app');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const city = searchInput.value;
        getWeather(city);
    });

    function getWeather(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                updateWeather(data);
            })
            .catch(error => console.error('Error fetching weather data:', error));
    }

    function updateWeather(data) {
        const { main, name, sys, weather, wind } = data;
        const { temp } = main;
        const { description, icon } = weather[0];

        const localTime = new Date((data.dt + data.timezone) * 1000).toISOString().slice(11, 16);
        const localDate = new Date((data.dt + data.timezone) * 1000).toISOString().slice(0, 10);

        tempElement.innerHTML = `${Math.round(temp)}&#176;`;
        cityElement.innerHTML = name;
        conditionElement.innerHTML = description.charAt(0).toUpperCase() + description.slice(1);
        timeElement.innerHTML = localTime;
        dateElement.innerHTML = localDate;
        iconElement.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

        changeBackground(description);
    }

    function changeBackground(description) {
        let backgroundImage;

        switch(description.toLowerCase()) {
            case 'clear sky':
                backgroundImage = 'url("https://png.pngtree.com/thumb_back/fh260/background/20210129/pngtree-blue-gradient-sky-beautiful-natural-scenery-picture-image_548418.jpg")';
                break;
            case 'few clouds':
            case 'scattered clouds':
            case 'broken clouds':
                backgroundImage = 'url("https://www.shutterstock.com/image-photo/blue-sky-scattered-clouds-260nw-132256844.jpg")';
                break;
            case 'shower rain':
            case 'rain':
                backgroundImage = 'url("https://static.vecteezy.com/system/resources/thumbnails/020/568/608/small/heavy-rain-drop-at-the-road-surface-bokeh-background-photo.jpg")';
                break;
            case 'thunderstorm':
                backgroundImage = 'url("https://kubrick.htvapps.com/vidthumb/images/thunderstorm-6463fa10c42e8.png?crop=1xw:0.9969230769230769xh;center,top&resize=640:*.jpg")';
                break;
            case 'snow':
                backgroundImage = 'url("https://t3.ftcdn.net/jpg/06/12/44/44/360_F_612444415_kyhCEWuanutyMIMlx4laytje9NLEgTl9.jpg")';
                break;
            case 'mist':
                backgroundImage = 'url("https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?cs=srgb&dl=pexels-lum3n-44775-167699.jpg&fm=jpg")';
                break;
            default:
                backgroundImage = 'url("https://png.pngtree.com/thumb_back/fh260/background/20210129/pngtree-blue-gradient-sky-beautiful-natural-scenery-picture-image_548418.jpg")';
                break;
        }

        weatherApp.style.backgroundImage = backgroundImage;
    }

    // Fetch initial weather data for a default city
    getWeather('London');
});
