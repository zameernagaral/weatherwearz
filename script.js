// Move detectLocation outside so it is globally accessible
function detectLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            // Fetch weather using coordinates
            const API_key = "cd210460aeb56354fd13bf8911d788b6";
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`)
                .then(response => {
                    if (!response.ok) throw new Error("Location weather not found.");
                    return response.json();
                })
                .then(data => {
                    const cityName = data.name;
                    const weatherDescription = data.weather[0].description;
                    const weatherMain = data.weather[0].main;
                    const temperature = Math.round(data.main.temp - 273.15);
                    window.location.href = `outfit.html?city=${cityName}&temp=${temperature}&description=${weatherDescription}&main=${weatherMain}`;
                })
                .catch(() => {
                    alert("Could not fetch weather for your location.");
                });
        }, () => {
            alert("Location access denied.");
        });
    } else {
        alert("Geolocation not supported by your browser.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const logo = document.querySelector('.logo');
    const API_key = "cd210460aeb56354fd13bf8911d788b6";
    const cityInput = document.querySelector('.inputform');
    let sunny = document.querySelector('.sunny');
    let rainy = document.querySelector('.rainy');
    let cold = document.querySelector('.cold');
    let searchButton = document.querySelector('.search');
    const gpsBtn = document.getElementById('gpsBtn');
    let packingList = document.getElementById('packingList');

    // Fashion tips
    const tips = [
        "Layering light jackets with bold accessories keeps you stylish and warm on breezy days.",
        "Choose breathable fabrics for hot days.",
        "Bright colors can lift your mood on rainy days.",
        "Don't forget waterproof shoes during monsoon!",
        "Scarves are both stylish and practical for cold weather."
    ];
    document.getElementById('newTipBtn').addEventListener('click', () => {
        const tip = tips[Math.floor(Math.random() * tips.length)];
        document.getElementById('fashionTip').textContent = tip;
    });

    // Outfit suggestion navigation
    if (sunny) sunny.addEventListener('click', () => {
        window.location.href = `outfit.html?main=Clear`;
    });
    if (rainy) rainy.addEventListener('click', () => {
        window.location.href = `outfit.html?main=Rain`;
    });
    if (cold) cold.addEventListener('click', () => {
        window.location.href = `outfit.html?main=Clouds`;
    });

    // Search city weather
    if (searchButton && cityInput) {
        searchButton.addEventListener('click', () => {
            let city = cityInput.value.trim();
            if (city) {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`;
                fetch(url)
                    .then(response => {
                        if (!response.ok) throw new Error("City not found. Please enter a valid city name.");
                        return response.json();
                    })
                    .then(data => {
                        const cityName = data.name;
                        const weatherDescription = data.weather[0].description;
                        const weatherMain = data.weather[0].main;
                        const temperature = Math.round(data.main.temp - 273.15);
                        window.location.href = `outfit.html?city=${cityName}&temp=${temperature}&description=${weatherDescription}&main=${weatherMain}`;
                    })
                    .catch(error => {
                        alert(error.message);
                    });
            }
        });
    }

    // GPS/location button
    if (gpsBtn) {
        gpsBtn.addEventListener('click', detectLocation);
    }

    // Responsive nav menu for mobile
    function handleMenu() {
        if (window.innerWidth <= 768) {
            menuToggle.classList.remove('hidden');
            navLinks.classList.add('hidden');
            menuToggle.onclick = () => navLinks.classList.toggle('hidden');
        } else {
            menuToggle.classList.add('hidden');
            navLinks.classList.remove('hidden');
            menuToggle.onclick = null;
        }
    }
    handleMenu();
    window.addEventListener('resize', handleMenu);

    // Logo click
    if (logo) {
        logo.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    // Packing list (with weather-based suggestions)
    const packingForm = document.getElementById('packingForm');
    if (packingForm) {
        packingForm.addEventListener('submit', function (e) {
            e.preventDefault();
            packingList.classList.remove('hidden');
            const cityP = document.getElementById('tripCity').value.trim();
            const listP = document.getElementById('packingList');
            if (cityP) {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityP}&appid=${API_key}`;
                fetch(url)
                    .then(response => {
                        if (!response.ok) throw new Error("City not found. Please enter a valid city name.");
                        return response.json();
                    })
                    .then(data => {
                        const weatherMain = data.weather[0].main;
                        let items = [
                            `<li>Weather-appropriate outfits for ${cityP}</li>`,
                            `<li>Comfortable shoes</li>`,
                            `<li>Chargers and essentials</li>`
                        ];
                        if (weatherMain === "Clear") {
                            items.splice(1, 0, "<li>Sunscreen</li>");
                        } else if (weatherMain === "Clouds") {
                            items.splice(1, 0, "<li>Sweatshirt</li>");
                        } else if (weatherMain === "Rain") {
                            items.splice(1, 0, "<li>Umbrella or raincoat (just in case!)</li>");
                        }
                        listP.innerHTML = items.join('');
                    })
                    .catch(error => {
                        listP.innerHTML = `<li>${error.message}</li>`;
                    });
            } else {
                document.getElementById('packingList').innerHTML = `<li>Please enter both city.</li>`;
            }
        });
    }

    // Dark mode toggle (if present)
    const pref = JSON.parse(localStorage.getItem('weatherwear_prefs') || '{}');
    if (pref.darkMode) {
        
        
        document.getElementById('mainBody').classList.add('dark-mode');
    }
});