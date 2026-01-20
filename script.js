const library = document.querySelector("tbody");
const showButton = document.querySelector("dialog + button");
const addButton = document.querySelector("dialog button")
const dialog = document.querySelector("dialog");

const myLibrary = [];

function Book(title, author, numPage, isRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.numPage = numPage;
    this.isRead = isRead;
}

Book.prototype.toggleRead = function () {
    this.isRead = !this.isRead;
}

function addBookToLibrary() {
    library.innerHTML = "";

    myLibrary.forEach((book, index) => {
        const bookRow = document.createElement("tr");
        bookRow.dataset.bookId = book.id;

        const title = document.createElement("td");
        title.textContent = `${book.title}`;

        const author = document.createElement("td");
        author.textContent = `${book.author}`;

        const numPage = document.createElement("td");
        numPage.textContent = `${book.numPage}`;

        const readStatus = document.createElement("td");
        readStatus.textContent = `${book.isRead ? "Yes" : "No"}`;

        const toggleReadButton = document.createElement("button");
        toggleReadButton.textContent = "Toggle Read";

        toggleReadButton.addEventListener("click", () => {
            // const index = myLibrary.findIndex(b => b.id === book.id);
            // if (index !== -1) {
            //     myLibrary[index].isRead = !myLibrary[index].isRead;
            book.toggleRead();
            addBookToLibrary();
            // }
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            const index = myLibrary.findIndex(b => b.id === book.id);
            if (index !== -1) {
                myLibrary.splice(index, 1);
                addBookToLibrary();
            }
        });

        library.appendChild(bookRow)
        bookRow.append(title, author, numPage, readStatus, toggleReadButton, deleteButton);
    });
}

showButton.addEventListener("click", (e) => {
e.preventDefault();
dialog.showModal();
});

addButton.addEventListener("click", (e) => {
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;

    myLibrary.push(new Book(title, author, pages, false));

    addBookToLibrary();
    dialog.close();
});