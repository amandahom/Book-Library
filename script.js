(function() {
  let myLibrary = [];

  // Function Objects - Constructor
  function book(title, author, read, rating) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.rating = rating;
  }

  // Function to display form
  function displayForm() {
    let modal = document.getElementById("modal");
    if (modal.style.display === "none") {
      modal.style.display = "block";
    } else {
      modal.style.display = "none";
    }
  }

  // Function to add book to array
  function addBook(title, author, read, rating) {
    let newBook = new book(title, author, read, rating);
    myLibrary.push(newBook);
    console.log(myLibrary);
  }

  // Render Function
  function render() {
    let libraryLength = myLibrary.length;
    for (let i = 0; i < libraryLength; i++) {}
    return;
  }

  // Number Validation for Form
  function numValidation() {
    let numResponse = document.getElementById("text-rating").value;
    let text;
    let modal = document.getElementById("modal");
    if (isNaN(numResponse)) {
      text = "Input not valid";
      console.log("error");
      modal.style.display = "block";
    } else if (numResponse == "") {
      text = "";
    }
    document.getElementById("numberValidation").innerHTML = text;
    // addBook()
  }
  // Function to delete book from array
  function removeBook() {
    console.log("remove");
  }

  // Hide form until clicked
  function hideForm() {
    let modal = document.getElementById("modal");
    modal.style.display = "none";
  }

  // Load default books
  function defaultBooks() {
    let book1 = new book(
      "Harry Potter and the Goblet of Fire",
      "J. K. Rowling",
      "read",
      "10/10"
    );
    let book2 = new book("Book2", "author", "read", "4/10");
    myLibrary.push(book1, book2);
  }

  // Document's Main Function
  function main() {
    let newBook = document.getElementById("newBook");
    newBook.addEventListener("click", displayForm);

    let deleteBook = document.getElementById("delete");
    deleteBook.addEventListener("click", removeBook);

    let bookSubmit = document.getElementById("submit");
    bookSubmit.addEventListener("click", numValidation);

    defaultBooks();
    render();
    hideForm();
    numValidation();
  }
  document.addEventListener("DOMContentLoaded", function() {
    main();
  });
})();
