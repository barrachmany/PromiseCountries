  
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

        async function createCountries(){
            const countries = await fetchCountries();

            const countriesContainer = document.querySelector('.countries-grid');

            countriesContainer.innerHTML = "";

            countries.forEach(country => {

                const element = document.createElement('a');
                element.href = "#";
                element.className = "country scale-effect";
                element.setAttribute('data-country-name' , country.name.common);

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
                title.textContent= country.name.common;
                info.appendChild(title);

                const brief = document.createElement('ul');
                brief.className = "country-brief";
                const population = document.createElement('li');
                population.innerHTML = "Population :" + country.population;
                const region = document.createElement('li');
                region.innerHTML = "region :" + country.region;
                const capital = document.createElement('li');
                capital.innerHTML = "capital :" + country.capital;
                brief.appendChild(population);
                brief.appendChild(region);
                brief.appendChild(capital);
                
                info.appendChild(brief);
                element.appendChild(info);

                countriesContainer.appendChild(element);

                

                element.addEventListener('click', function() {
            
                    let cssFilePath = "./css/main.css";

                    let htmlContent = `
                    <html>
                    <head>
                        <link rel="stylesheet" href="${cssFilePath}">
                    </head>
                    </html>
                    `;
                    
                    const newWindow = window.open("", "_blank");
                    newWindow.document.write(htmlContent);
                    newWindow.document.close();
                    
                    const newTitle = document.createElement('h1');
                    newTitle.textContent = country.name.common;
                    newTitle.classList.add("new-title");

                    const newFlag = document.createElement('img');
                    newFlag.classList.add("new-flag");
                    newFlag.src = country.flags.svg;

                    const newInfo = document.createElement('div');
                    newInfo.classList.add("new-info");

                    const newPopulation = document.createElement('p');
                    newPopulation.classList.add("new-population");
                    newPopulation.innerHTML = "Population :" + country.population;
                    const newRegion = document.createElement('p');
                    newRegion.classList.add("new-region");
                    newRegion.innerHTML = "region :" + country.region;
                    const newCapital = document.createElement('p');
                    newCapital.classList.add("new-capital");
                    newCapital.innerHTML = "capital :" + country.capital;

                    newInfo.appendChild(newPopulation);
                    newInfo.appendChild(newRegion);
                    newInfo.appendChild(newCapital);


                    newWindow.document.body.appendChild(newTitle);
                    newWindow.document.body.appendChild(newFlag);
                    newWindow.document.body.appendChild(newInfo);
                    
                })
                countriesContainer.appendChild(element);

                
            });
            
        }

        createCountries();