class CardStatus extends HTMLElement {
    set data(data) {
        this._data = data;
        this.render();
    }

    render() {
        this.innerHTML = `<div class="col-lg-12 col-md-12">
            <h6>${this._data.title}</h6>
        </div>`;
        for (const key of Object.keys(this._data.country)) {
            this.innerHTML += `
            <div class="col-md-4 col-sm-12">
                <div class="card mb-3">
                    <div class="card-header">${key}</div>
                    <div class="card-body">
                        <h5 class="card-title">${this._data.country[key]}</h5>
                        <p class="card-text">Orang</p>
                    </div>
                </div>
            </div>
            `;
        }
    }

    renderError(message) {
        this.innerHTML = `
            <div class="col-md-12 col-sm-12">
                <div class="card mb-3">
                    <div class="card-header">Tidak Ditemukan</div>
                    <div class="card-body">
                        <h5 class="card-title">${message}</h5>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('card-status', CardStatus);