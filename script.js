;(function() {
  let myLibrary = []
  console.log(myLibrary)

  // Function Objects - Constructor
  function Book(title, author, read, rating) {
    this.title = title
    this.author = author
    this.read = read
    this.rating = rating
  }

  // Function to add book to array
  function addBook(title, author, read, rating) {
    let book = new Book(title, author, read, rating)
    myLibrary.push(book)
  }

  // Render Function
  function render() {
    myLibrary.forEach(function(book, index) {
      const newBook = document.createElement('div')
      newBook.setAttribute('class', 'book')
      newBook.setAttribute('id', index)

      const title = document.createElement('div')
      title.setAttribute('class', 'bookTitle')
      title.textContent = 'Title: ' + book.title

      const author = document.createElement('div')
      author.setAttribute('class', 'description')
      author.setAttribute('id', 'bookAuthor')
      author.textContent = 'Author: ' + book.author

      const read = document.createElement('div')
      read.setAttribute('class', 'description')
      read.setAttribute('id', 'bookRead')
      read.textContent = book.read

      const rating = document.createElement('div')
      rating.setAttribute('class', 'description')
      rating.setAttribute('id', 'bookRating ')
      rating.textContent = 'Rating: ' + book.rating

      const mainCard = document.createElement('div')
      mainCard.setAttribute('class', 'card-main')

      newBook.appendChild(title)
      mainCard.appendChild(author)
      mainCard.appendChild(read)
      mainCard.appendChild(rating)
      newBook.appendChild(mainCard)

      let currentDiv = document.getElementById('card-content')
      currentDiv.appendChild(newBook)

      let bookIcon = document.createElement('div')
      bookIcon.setAttribute('class', 'material-icons')
      bookIcon.setAttribute('id', 'book')
      bookIcon.textContent = 'book'
      mainCard.appendChild(bookIcon)

      let removeButton = document.createElement('div')
      removeButton.setAttribute('class', 'material-icons')
      removeButton.setAttribute('id', 'delete')
      removeButton.textContent = 'delete'
      mainCard.appendChild(removeButton)
    })
  }

  // Function to delete book from array
  function removeBook() {
    bookDelete = document.getElementById('delete')
  }

  // Function to display form
  function displayForm() {
    let modal = document.getElementById('modal')
    if (modal.style.display === 'none') {
      modal.style.display = 'block'
    } else {
      modal.style.display = 'none'
    }
  }

  // Validation for Form
  function validation() {
    let text
    let modal = document.getElementById('modal')
    let titleResponse = document.getElementById('text-title').value
    let authorResponse = document.getElementById('text-author').value
    let readResponse = document.getElementById('text-read').value
    let numResponse = document.getElementById('text-rating').value
    if (titleResponse == '' || authorResponse == '' || readResponse == '' || numResponse == '') {
      text = 'Field is required.'
      console.log('required error')
      modal.style.display = 'block'
      document.getElementById('requiredValidation').innerHTML = text
    } else if (isNaN(numResponse)) {
      text = 'Input is not valid. Please input a number between 0 and 10. '
      console.log('num error')
      modal.style.display = 'block'
      document.getElementById('numberValidation').innerHTML = text
    } else if (numResponse < 0 || numResponse > 10) {
      text = 'Input is not between 0 and 10. Please try again.'
      console.log('integer error')
      document.getElementById('inputValidation').innerHTML = text
    } else {
      submitBook()
      console.log('submitting')
    }
  }

  // Submit Book
  function submitBook() {
    let title = document.getElementById('text-title').value
    let author = document.getElementById('text-author').value
    let read = document.getElementById('text-read').checked
    let rating = document.getElementById('text-rating').value
    addBook(title, author, read, rating)
    render()
  }

  // Toggle

  // Hide form until clicked
  function hideForm() {
    let modal = document.getElementById('modal')
    modal.style.display = 'none'
  }

  // Load default books
  function defaultBooks() {
    let book1 = new Book('Harry Potter and the Goblet of Fire', 'J. K. Rowling', 'read', '10/10')
    let book2 = new Book('East of Eden', 'John Steinbeck', 'Read', '8')
    myLibrary.push(book1, book2)
  }

  // Document's Main Function
  function main() {
    let newBook = document.getElementById('newBook')
    newBook.addEventListener('click', displayForm)

    let bookSubmit = document.getElementById('submit')
    bookSubmit.addEventListener('click', validation)

    let deleteBook = document.getElementById('delete')
    // deleteBook.addEventListener("click", removeBook)

    defaultBooks()
    render()
    hideForm()
  }
  document.addEventListener('DOMContentLoaded', function() {
    main()
  })
})()
