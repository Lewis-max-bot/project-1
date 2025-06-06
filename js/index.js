const apiUrl = "https://server-nine-omega-53.vercel.app/books";

document.addEventListener("DOMContentLoaded", fetchBooks);
document.getElementById("search-btn").addEventListener("click", searchBooks);
document.getElementById("add-book-form").addEventListener("submit", addBook);

function fetchBooks() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const bookList = document.getElementById("book-list");
            bookList.innerHTML = "";
            data.forEach(book => {
                const bookItem = document.createElement("div");
                bookItem.classList.add("book-item");
                bookItem.innerHTML = `
                    <h3>${book.title}</h3>
                    <p>Author: ${book.author}</p>
                    <button onclick="deleteBook(${book.id})">Delete</button>
                    <button onclick="updateBook(${book.id})">Update</button>
                `;
                bookList.appendChild(bookItem);
            });
        });
}


function addBook(event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author })
    })
    .then(() => {
        fetchBooks();
        document.getElementById("add-book-form").reset();
    });
}


function deleteBook(id) {
    fetch(`${apiUrl}/${id}`, { method: "DELETE" })
        .then(() => fetchBooks());
}


function updateBook(id) {
    const newTitle = prompt("Enter new title:");
    const newAuthor = prompt("Enter new author:");

    if (newTitle && newAuthor) {
        fetch(`${apiUrl}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: newTitle, author: newAuthor })
        })
        .then(() => fetchBooks());
    }
}


function searchBooks() {
    const searchTerm = document.getElementById("search").value.toLowerCase();

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const filteredBooks = data.filter(book => 
                book.title.toLowerCase().includes(searchTerm) ||
                book.author.toLowerCase().includes(searchTerm)
            );

            const bookList = document.getElementById("book-list");
            bookList.innerHTML = "";
            filteredBooks.forEach(book => {
                const bookItem = document.createElement("div");
                bookItem.classList.add("book-item");
                bookItem.innerHTML = `
                    <h3>${book.title}</h3>
                    <p>Author: ${book.author}</p>
                    <button onclick="deleteBook(${book.id})">Delete</button>
                    <button onclick="updateBook(${book.id})">Update</button>
                `;
                bookList.appendChild(bookItem);
            });
        });
}
