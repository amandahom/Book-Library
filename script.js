;(function() {
  let myLibrary = []
  console.log(myLibrary)

  // Function Objects - Constructor
  function Book(title, author, rating, read) {
    this.title = title
    this.author = author
    this.rating = rating
    this.read = read
  }

  // Function to add book to array
  function addBook(title, author, rating, read) {
    let book = new Book(title, author, rating, read)
    myLibrary.push(book)
  }

  // Render Function
  function render() {
    myLibrary.forEach(function(book) {
      const newBook = document.createElement('div')
      newBook.setAttribute('class', 'book')

      const title = document.createElement('div')
      title.setAttribute('class', 'bookTitle')
      title.textContent = 'Title: ' + book.title
      let key = book.title.toLowerCase().replace(/ /g, '_')

      const author = document.createElement('div')
      author.setAttribute('class', 'description')
      author.setAttribute('class', 'bookAuthor')
      author.textContent = 'Author: ' + book.author

      const rating = document.createElement('div')
      rating.setAttribute('class', 'description')
      rating.setAttribute('class', 'bookRating ')
      rating.textContent = 'Rating: ' + book.rating

      const read = document.createElement('div')
      read.setAttribute('class', 'description')
      read.setAttribute('class', 'bookRead')
      read.textContent = book.read ? 'Read' : 'Not Read'

      const mainCard = document.createElement('div')
      mainCard.setAttribute('class', 'card-main')

      newBook.appendChild(title)
      mainCard.appendChild(author)
      mainCard.appendChild(rating)
      mainCard.appendChild(read)
      newBook.appendChild(mainCard)
      newBook.setAttribute('id', key)

      let currentDiv = document.getElementById('card-content')
      currentDiv.appendChild(newBook)

      let removeButton = document.createElement('button')
      removeButton.setAttribute('class', 'delete')
      removeButton.textContent = 'delete'
      mainCard.appendChild(removeButton)
      removeButton.addEventListener('click', removeBook)

      read.addEventListener('click', e => changeRead(e, key))
    })
    hideForm()
  }

  // Function to delete book from array
  function removeBook() {
    let key = document.parentElement
    console.log(key)
    myLibrary.splice(key, 1)
    console.log('remove')
    render()
  }

  // Change Read Status
  function changeRead(key) {
    if (myLibrary[key].read) {
      myLibrary[key] = false
      e.target.textContent = 'Not Read'
    } else {
      myLibrary[key].read = true
      e.target.textContent = 'Read'
    }
  }

  // Validation for Form
  function validation() {
    document.addEventListener(
      'invalid',
      (function() {
        return function(e) {
          e.preventDefault()
        }
      })(),
      true,
    )
    let text
    let titleResponse = document.getElementById('text-title').value
    let authorResponse = document.getElementById('text-author').value
    let readResponse = document.getElementById('text-read').value
    let numResponse = document.getElementById('text-rating').value
    if (titleResponse == '' || authorResponse == '' || readResponse == '' || numResponse == '') {
      text = 'Field is required.'
      document.getElementById('requiredValidation').innerHTML = text
    } else if (isNaN(numResponse)) {
      text = 'Input is not valid. Please input a number between 0 and 10. '
      document.getElementById('numberValidation').innerHTML = text
    } else if (numResponse < 0 || numResponse > 10) {
      text = 'Input is not between 0 and 10. Please try again.'
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
    let rating = document.getElementById('text-rating').value
    let read = document.getElementById('text-read').value
    addBook(title, author, read, rating)
    render()
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

  //Hide form when close is clicked
  function hideForm() {
    let modal = document.getElementById('modal')
    modal.style.display = 'none'
  }

  // Load default books
  function defaultBooks() {
    let book1 = new Book('Harry Potter and the Goblet of Fire', 'J. K. Rowling', '10', true)
    let book2 = new Book('East of Eden', 'John Steinbeck', '8', false)
    let book3 = new Book('The Lightning Thief', 'Rick Riordan', '9', false)
    myLibrary.push(book1, book2, book3)
  }

  // Document's Main Function
  function main() {
    let newBook = document.getElementById('newBook')
    newBook.addEventListener('click', displayForm)

    let bookSubmit = document.getElementById('submit')
    bookSubmit.addEventListener('click', validation)

    let closeForm = document.getElementById('close')
    closeForm.addEventListener('click', hideForm)

    defaultBooks()
    render()
  }
  document.addEventListener('DOMContentLoaded', function() {
    main()
  })
})()
