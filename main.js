//Decalring the Different Variable and Objects
let new_cases = document.getElementById("new_case");
let new_death = document.getElementById("new_death");
let total_death = document.getElementById("total_death");
let total_recovered = document.getElementById("total_recovered");
let total_cases = document.getElementById("total_cases");
let table = document.getElementById('countries_stat');
let icases = document.querySelector('.icases');
let irec = document.querySelector('.irec');
let icric = document.querySelector('.icric');
let ideaths = document.querySelector('.ideaths');
let irank = document.querySelector('.irank');
var ic = 0;

// Fetching the Data from the server

//Fetching the World Data
fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": "53009286a0mshdc8ec356f7aa205p1e0e80jsn5858f548ed53"
        }
    })
    .then(response => response.json().then(data => {
        console.log(data);
        total_cases.innerHTML = data.total_cases;
        new_cases.innerHTML = data.new_cases;
        new_death.innerHTML = data.new_deaths;
        total_death.innerHTML = data.total_deaths;
        total_recovered.innerHTML = data.total_recovered;


    })).catch(err => {
        console.log(err);
    });

//Fetching The Case by Country Data
fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": "8d7d5cbf71msh0095b4a5dc5f506p1b908fjsnf874b0b0cee4"
        }
    })
    .then(response => response.json().then(data => {
        console.log(data)
        let countries_stat = data.countries_stat;
        //Getting all the country statistic using a loop
        for (let i = 0; i < countries_stat.length; i++) {
            console.log(countries_stat[i]);
            //we will start by inserting the new rows inside our table
            let row = table.insertRow(i + 1);
            let country_name = row.insertCell(0);
            let cases = row.insertCell(1);
            let deaths = row.insertCell(2);
            let serious_critical = row.insertCell(3);
            let recovered_per_country = row.insertCell(4);
            if (countries_stat[i].country_name == "India") {
                icases.innerHTML = countries_stat[i].cases;
                irank.innerHTML = i + 1;
                irec.innerHTML = countries_stat[i].total_recovered;
                icric.innerHTML = countries_stat[i].serious_critical;
                ideaths.innerHTML = countries_stat[i].deaths;

            }
            country_name.innerHTML = countries_stat[i].country_name;
            cases.innerHTML = countries_stat[i].cases;
            deaths.innerHTML = countries_stat[i].deaths;
            serious_critical.innerHTML = countries_stat[i].serious_critical;
            recovered_per_country.innerHTML = countries_stat[i].total_recovered;

        }
    }))
    .catch(err => {
        console.log(err);
    });