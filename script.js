// Move detectLocation outside so it is globally accessible
function detectLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            alert(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
            // You can send these coordinates to your backend or fetch weather data here
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
    const cityInput  = document.querySelector('.inputform');
    
    
    
    let searchButton = document.querySelector('.search');

    searchButton.addEventListener('click', () => {
        let city = cityInput.value.trim();

        
    
    if (city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    
                    throw new Error("City not found. Please enter a valid city name.");
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                const cityName = data.name;
                
                const weatherDescription = data.weather[0].description;
                const weatherMain = data.weather[0].main;
                const temperature = Math.round(data.main.temp - 273.15); // Convert from Kelvin to Celsius
                console.log(weatherMain);
               window.location.href = `outfit.html?city=${cityName}&temp=${temperature}&description=${weatherDescription}&main=${weatherMain}`;     
                
            })
            .catch(error => {
                console.error("Error:", error);
            });

    } 

    })

    menuToggle.classList.add('hidden');
    

    // Your mobile-only JS code here
    
    // Run this code only on mobile devices (screen width <= 768px)
    if (window.innerWidth <= 768) {
        // Your mobile-only JS code here
        menuToggle.classList.remove('hidden');
        navLinks.classList.add('hidden');
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('hidden');
        });
    }
    logo.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

});