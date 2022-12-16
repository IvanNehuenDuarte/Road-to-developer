const _private = new WeakMap()

class Book {
    constructor(title, author, price) {
        const properties = {
            _title: title,
            _author: author,
            _price: price
        }

        _private.set(this, {properties});
    }

    // Obtiene el valor(titulo en este caso) de la propiedad del libro:
    get title() {
        return _private.get(this).properties['_title'];
    }

    // Setea/modifica el valor(titulo en este caso) de la propiedad de un libro:
    set title(newTitle) {
        return _private.get(this).properties['_title'] = newTitle;
    }

    get author() {
        return _private.get(this).properties['_author'];
    }

    set author(newAuthor) {
        return _private.get(this).properties['_author'] = newAuthor;
    }

    get price() {
        return _private.get(this).properties['_price'];
    }

    set price(newPrice) {
        return _private.get(this).properties['_price'] = newPrice;
    }

}

class Comic extends Book{
    constructor(name, author, price, illustrators) {
        super(name, author, price);

        this.illustrators = illustrators;
    }

    addIllustrator(newIllustrator = []) {
        this.illustrators.push(newIllustrator)
    }
}

class ShoppingCart {
    constructor() {
        this.products = [];
    }

    addProduct(amount, price){
        this.products.push(...Array(amount).fill(price));
    }

    showProducts(){
        console.log(this.products);
    }

    calcTotal() {
        return this.products
            .map(price => price)
            .reduce((ac, price) => ac + price, 0) //* .reduce lo que hace es acumular los elementos de un array y luego ejecutar uan funciona (en este caso la suma), "ac"(acumulador), price(precio de los elementos del array), "0"(en que valor inicia el ac)
    }

    printTicket() {
        console.log(`Total a pagar ${ this.calcTotal() }`);
    }

}

// Instancia de Book
const book1 = new Book('1984', 'Georfe Orwell', 350);
const book2 = new Book('Frakenstein', 'M.S', 200);

const comic1 = new Comic('The Killing Joke', 'A.M', 150, ['B.B']);

console.log(book1.title);
console.log(book2);

comic1.addIllustrator('J.H')

console.log(comic1.illustrators);

const cart = new ShoppingCart();

cart.addProduct(2, comic1.price)

cart.addProduct(3, book1.price)

cart.showProducts();

cart.printTicket();