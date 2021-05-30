class SearchBar extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    set clickEvent(event) {
        this._clickEvent = event;
        this.render();
    }

    set inputEvent(event) {
        this._inputEvent = event;
        this.render();
    }

    set data(data) {
        this._data = data;
        this.render();
    }

    get value() {
        return this.shadowDOM.querySelector("#searchElement").value;
    }

    /**
     * At first I want use this method, but I don't know how to get list clicked from datalists
     */
    get dataLists() {
        return this.shadowDOM.querySelector('#searchElements').childNodes;
    }
    /**
     * Just a quick help with datalist
     * Basically we can use select, but i just need this done faster
     * Sorry
     */
    render() {
        let dataList = `<datalist id="searchElements">`;
        if (typeof this._data === 'undefined') {
            this._data = { "country": [], "value": '' };
        }
        if (this._data.country) {
            this._data.country.forEach(element => {
                dataList += `<option value="${element.name}">${element.iso3}</option>`;
            });
        }
        dataList += `</datalist>`;
        this.shadowDOM.innerHTML = `
        <style>
        .search-container {
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            padding: 16px;
            border-radius: 5px;
            display: flex;
            top: 10px;
            background-color: white;
        }

        .search-container > input {
            width: 75%;
            padding: 16px;
            border: 0;
            border-bottom: 1px solid cornflowerblue;
            font-weight: bold;
        }

        .search-container > input:focus {
            outline: 0;
            border-bottom: 2px solid cornflowerblue;
        }

        .search-container > input:focus::placeholder {
            font-weight: bold;
        }

        .search-container >  input::placeholder {
            color: cornflowerblue;
            font-weight: normal;
        }

        .search-container > button {
            width: 23%;
            cursor: pointer;
            margin-left: auto;
            padding: 16px;
            background-color: cornflowerblue;
            color: white;
            border: 0;
            text-transform: uppercase;
        }

        @media screen and (max-width: 550px){
            .search-container {
                flex-direction: column;
                position: static;
            }

            .search-container > input {
                width: 100%;
                margin-bottom: 12px;
            }

            .search-container > button {
                width: 100%;
            }
        }
        </style>
        <div id="search-container" class="search-container">
            <input placeholder="Cari Negara" id="searchElement" type="search" list="searchElements" value="${this._data.value}">
            ${dataList}
            <button id="searchButtonElement" type="submit">Search</button>
        </div>
       `;
        this.shadowDOM.querySelector("#searchButtonElement").addEventListener("click", this._clickEvent);
        this.shadowDOM.querySelector("#searchElement").addEventListener("input", this._inputEvent);
    }
}

customElements.define("search-bar", SearchBar);
