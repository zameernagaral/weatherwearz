async function loadLanguage(lang) {
    const res = await fetch(`${lang}.json`);
    const translations = await res.json();

    document.querySelectorAll("[data-key]").forEach(elem => {
        const key = elem.getAttribute("data-key");

        if (elem.tagName === "INPUT") {
            elem.setAttribute("placeholder", translations[key]);
        } else if (elem.tagName === "BUTTON") {
            elem.textContent = translations[key];
        } else {
            elem.textContent = translations[key];
        }
    });
}

// Load default language
loadLanguage("en");

  