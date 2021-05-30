import ky from 'ky'

class Source {

    // Just trying to define static keywords
    // static #baseUrl = "http://URL"
    // but this method still in stage 3 ESNext

    static async getAllCountries() {
        const countries = await ky("https://covid19.mathdro.id/api/countries").json()
        return countries.countries
    }

    static async getCountryData(iso3) {

        const countryData = await ky(`https://covid19.mathdro.id/api/countries/${iso3}`, { throwHttpErrors:false}).json()
        
        if (countryData.error) {
            return Promise.reject(`Data untuk negara ${iso3} tidak ditemukan`)
        } else {
            return {
                confirmed: countryData.confirmed.value,
                recovered: countryData.recovered.value,
                deaths: countryData.deaths.value
            }
        }

    }

    static async getGlobalData() {
        const globalData = await ky("https://covid19.mathdro.id/api/").json()
        return {
            confirmed: globalData.confirmed.value,
            recovered: globalData.recovered.value,
            deaths: globalData.deaths.value
        }
    }
}

export default Source