const apiUrl = 'https://restcountries.com/v3.1/all'; // API endpoint to fetch all countries

// Function to fetch countries from the API
async function fetchCountries() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching countries:', error);
        return [];
    }
}

async function createCountries() {
    const countries = await fetchCountries();

    const countriesContainer = document.querySelector('.countries-grid');
    countriesContainer.innerHTML = "";

    countries.forEach(country => {
        const element = document.createElement('a');
        element.href = "#";
        element.className = "country scale-effect";
        element.setAttribute('data-country-name', country.name.common);

        const flag = document.createElement('div');
        flag.className = "country-flag";
        const img = document.createElement('img');
        img.src = country.flags.svg;

        flag.appendChild(img);
        element.appendChild(flag);

        const info = document.createElement('div');
        info.className = "country-info";
        const title = document.createElement('h2');
        title.className = "country-title";
        title.textContent = country.name.common;
        info.appendChild(title);

        const brief = document.createElement('ul');
        brief.className = "country-brief";
        const population = document.createElement('li');
        population.innerHTML = "Population: " + country.population;
        const region = document.createElement('li');
        region.innerHTML = "Region: " + country.region;
        const capital = document.createElement('li');
        capital.innerHTML = "Capital: " + country.capital;
        brief.appendChild(population);
        brief.appendChild(region);
        brief.appendChild(capital);
        
        info.appendChild(brief);
        element.appendChild(info);

        countriesContainer.appendChild(element);

        element.addEventListener('click', function() {
            const newWindow = window.open("", "_blank");
            newWindow.document.write(`<html>
                <head>
                    <link rel="stylesheet" href="./css/main.css">
                </head>
                <body>
                    <h1 class="new-title">${country.name.common}</h1>
                    <img class="new-flag" src="${country.flags.svg}" alt="${country.name.common} Flag">
                    <div class="new-info">
                        <p class="new-population">Population: ${country.population}</p>
                        <p class="new-region">Region: ${country.region}</p>
                        <p class="new-capital">Capital: ${country.capital}</p>
                    </div>
                </body>
                </html>`);
            newWindow.document.close();
        });
    });

    // Search Functionality
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', function() {
        const searchText = this.value.toLowerCase().trim();
        const filteredCountries = countries.filter(country => country.name.common.toLowerCase().startsWith(searchText));
        displayCountries(filteredCountries);
    });

    // Filter by Continent
    const filterInput = document.getElementById('browser');
    filterInput.addEventListener('change', function() {
        const selectedRegion = this.value.toLowerCase().trim();
        const filteredCountries = countries.filter(country => selectedRegion === 'all' || country.region.toLowerCase() === selectedRegion);
        displayCountries(filteredCountries);
    });  

    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.querySelector('body');
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        const themeText = document.querySelector('.theme-text');
        if (body.classList.contains('dark-mode')) {
            themeText.textContent = 'Light Mode';
        } else {
            themeText.textContent = 'Dark Mode';
        }
    });
}

function displayCountries(countries) {
    const countriesContainer = document.querySelector('.countries-grid');
    countriesContainer.innerHTML = "";

    countries.forEach(country => {
        const element = document.createElement('a');
        element.href = "#";
        element.className = "country scale-effect";
        element.setAttribute('data-country-name', country.name.common);

        const flag = document.createElement('div');
        flag.className = "country-flag";
        const img = document.createElement('img');
        img.src = country.flags.svg;

        flag.appendChild(img);
        element.appendChild(flag);

        const info = document.createElement('div');
        info.className = "country-info";
        const title = document.createElement('h2');
        title.className = "country-title";
        title.textContent = country.name.common;
        info.appendChild(title);

        const brief = document.createElement('ul');
        brief.className = "country-brief";
        const population = document.createElement('li');
        population.innerHTML = "Population: " + country.population;
        const region = document.createElement('li');
        region.innerHTML = "Region: " + country.region;
        const capital = document.createElement('li');
        capital.innerHTML = "Capital: " + country.capital;
        brief.appendChild(population);
        brief.appendChild(region);
        brief.appendChild(capital);
        
        info.appendChild(brief);
        element.appendChild(info);

        countriesContainer.appendChild(element);
    });
}

createCountries();