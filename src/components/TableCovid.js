class TableCovid extends HTMLElement {

    set data({ thead, allCovid }) {
        this._tbody = allCovid;
        this._thead = thead;
        this.render();
    }

    render() {
        let thead = "<thead><tr>";
        for (const element of this._thead) {
            thead += `<th class="stay-in-there">${element}</th>`;
        }
        thead += "</tr></thead>";
        let tbody = "<tbody>";
        for (const country of this._tbody) {
            if (typeof country !== 'undefined') {
                tbody += `<tr>
                    <td></td>
                    <td>${country.name}</td>
                    <td>${country.data.confirmed}</td>
                    <td>${country.data.recovered}</td>
                    <td>${country.data.deaths}</td>
                </tr>`;
            }
        }
        tbody += "</tbody>";
        this.innerHTML = `<table class="table table-bordered table-hover css-serial">${thead}${tbody}</table>`;
    }
}

customElements.define('table-covid', TableCovid);
