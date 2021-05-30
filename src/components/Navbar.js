class Navbar extends HTMLElement{
    set title(title) {
        this._title = title;
        this.render();
    }

    render() {
        this.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
            <div class="container">
                <a class="navbar-brand js-scroll-trigger" href="#">${this._title}</a>
            </div>
        </nav>`;
    }
}

customElements.define('navbar-element', Navbar);