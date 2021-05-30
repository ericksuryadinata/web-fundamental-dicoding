import "../components/Navbar.js";
import "../components/Footer.js";
import "../components/TableCovid.js";
import "../components/CardStatus.js";
import "../components/SearchBar.js";
import Source from "../data/Source.js";

const index = async () => {
    const title = "Yet Another Covid-19";
    const thead = ["No", "Negara", "Konfirmasi", "Sembuh", "Meninggal"];
    const navbar = document.querySelector('navbar-element');
    const footerElement = document.querySelector('footer-element');
    const tableCovid = document.querySelector('table-covid');
    const cardStatus = document.querySelector('card-status');
    const searchBar = document.querySelector('search-bar');

    navbar.title = title;
    footerElement.title = title;
    document.getElementById('copyright').appendChild(document.createTextNode(new Date().getFullYear()));

    const onSearch = async () => {
        try {
            let countries = await Source.getAllCountries();
            let countryData = await Source.getGlobalData();
            let title = 'Seluruh Dunia';
            if (searchBar.value != "") {
                countries = countries.filter(country => {
                    return country.name === searchBar.value;
                });
                countryData = await Source.getCountryData(countries[0].iso3);
                title = countries[0].name;
            }
            renderResult({
                'country': countryData,
                'title': title
            });
        } catch (message) {
            fallback(message);
        }
    };

    const onInput = async () => {
        try {
            let countries = await Source.getAllCountries();
            countries = countries.filter(country => {
                return country.name.toLowerCase().indexOf(searchBar.value) == 0;
            })
            searchBar.data = { country: countries, value: searchBar.value };
        } catch (message) {
            searchBar.dataList = message;
        }
    };

    const renderResult = results => {
        cardStatus.data = results;
    };

    const fallback = message => {
        cardStatus.renderError(message)
    };

    // After we search and get country list, I want to onClick on dataList to automatically get result but I don't know how to do that
    // so you need to click 'search' to get result
    // 
    // SOLUTION :
    //
    searchBar.data = { "country": [], "value": '' };
    searchBar.clickEvent = onSearch;
    searchBar.inputEvent = onInput;

    const globalData = await Source.getGlobalData();
    const allCovid = await allCovidData();

    cardStatus.data = { 'country': globalData, 'title': 'Seluruh Dunia' };

    tableCovid.data = { thead, allCovid };

};

const allCovidData = async () => {
    const loader = document.getElementById("loader");
    const mainContainer = document.getElementsByClassName('main-container')[0];
    try {
        let countries = await Source.getAllCountries();

        // since the data contains undefined iso3, we need to filter it, so we can process next request
        countries = countries.filter(country => {
            return typeof country.iso3 !== 'undefined';
        }).map(async country => {
            try {
                let countryData = await Source.getCountryData(country.iso3);
                country.data = await countryData;
                return country;
            } catch (error) {
                console.log(error);
            }
        });

        // get all of them
        countries = await Promise.all(countries);
        loader.parentNode.removeChild(loader);
        mainContainer.classList.add('show');
        return countries;
    } catch (error) {
        alert(error);
    }
};

export default index;