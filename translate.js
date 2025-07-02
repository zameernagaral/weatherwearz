const switcher = document.getElementById("languageSwitcher");

switcher.addEventListener("change", async function () {
    const lang = this.value;
    const res = await fetch(`${lang}.json`);
    const translations = await res.json();

    document.querySelectorAll("[data-key]").forEach(elem => {
        const key = elem.getAttribute("data-key");
        elem.textContent = translations[key];
    });
});

// Default to English on page load
switcher.value = "en";
switcher.dispatchEvent(new Event("change"));
