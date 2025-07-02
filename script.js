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
    function setLanguage() {
        const lang = document.getElementById('languageSelect').value;
        alert(`Language switched to: ${lang === 'en' ? 'English' : lang === 'kn' ? 'Kannada' : 'Hindi'}`);
        // You can implement actual language switching using i18n libraries or JSON translations here
    }


    const darkToggle = document.getElementById('darkModeToggle');
    const body = document.getElementById('body');
    darkToggle.addEventListener('change', () => {
        body.classList.toggle('bg-white');
        body.classList.toggle('bg-gray-900');
        body.classList.toggle('text-white');
    });



    
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