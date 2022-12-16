class book {
    // Propiedades/Atributos
    #title
    #author
    #price
    #stock
    #id

    constructor(title, author, price, stock, id) {
    this.#title = title
    this.#author = author
    this.#price = price
    this.#stock = stock
    this.#id = id
    }

    get title() {
        return `Title: ${this.#title}`
    }

    set title(new_title) {
        this.#title =new_title
    }
}

// Instanciar:
const book1 = new book('Caballos Desbocados', 'Yukio M.', 250.00, 100, 1);

book1.title