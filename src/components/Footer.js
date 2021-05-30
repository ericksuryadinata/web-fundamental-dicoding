class Footer extends HTMLElement {
    set title(title) {
        this._title = title;
        this.render();
    }

    render() {
        this.innerHTML = `
            <footer class="py-5 bg-dark">
            <div class="container">
            <p class="m-0 text-center text-white">Copyright &copy; <span id="copyright"></span> ${this._title}</p>
            </div>
        </footer>`;
        
    }
}

customElements.define('footer-element', Footer);