;(function() {
  let myLibrary = []
  console.log(myLibrary)

  // Function Objects - Constructor
  function Book(title, author, rating, read) {
    return {
      title,
      author,
      rating,
      read,
    }
  }

  // Function to add book to array
  function addBook(title, author, rating, read) {
    let book = Book(title, author, rating, read)
    myLibrary.push(book)
  }

  // Render Function
  function render() {
    // Deleting everything before we render any new items. To avoid duplicates.
    let myNode = document.getElementById('card-content')
    myNode.innerHTML = ''

    myLibrary.forEach(function(book) {
      const newBook = document.createElement('div')
      newBook.setAttribute('class', 'book')

      const title = document.createElement('div')
      title.setAttribute('class', 'bookTitle')
      title.textContent = 'Title: ' + book.title
      let key = getIdFromBookTitle(book)

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
      removeButton.textContent = 'Delete Book'
      mainCard.appendChild(removeButton)
      removeButton.addEventListener('click', removeBook) 

      read.addEventListener('click', changeRead)
    })
    hideForm()
  }

  // Function to delete book from array
  function removeBook(e) {
    myLibrary = myLibrary.filter(function(book) {
      return getIdFromElement(e) !== getIdFromBookTitle(book)
    })
    render()
  }

  // Change Read Status
  function changeRead(e) {
    myLibrary = myLibrary.map(function(book) {
      if (getIdFromElement(e) == getIdFromBookTitle(book)) {
        book.read = !book.read
      }
      return book
    })
    render()
  }

  // Get Id from specific element
  function getIdFromElement(e) {
    if (e.path) {
      if (e.composedPath) {
        // console.log("Supports `path` and `composedPath`");
        return e.path[2].id
      } else {
        // console.log("Supports `path` but not `composedPath`");
      }
    } else if (e.composedPath) {
      // console.log("Supports `composedPath` (but not `path`)");
      return e.target.parentNode.parentNode.id
    } else {
      // console.log("Supports neither `path` nor `composedPath`");
    }
  }
 
  // Get Id from Book Title
  function getIdFromBookTitle(book) {
    return book.title.toLowerCase().replace(/ /g, '_')
  }

  // Form Validation
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
    let numResponse = document.getElementById('text-rating').value
    let readResponse = document.getElementById('text-read').value
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
    let read = document.getElementById('text-read').checked
    addBook(title, author, rating, read)
    render()
  }

  // Function to display form
  function displayForm() {
    let modal = document.getElementById('modal')
    if (modal.style.display === 'none') {
      modal.style.display = 'block'
    } else {
      modal.style.display = 'none'
      document.getElementById('text-title').value = ''
      document.getElementById('text-author').value = ''
      document.getElementById('text-rating').value = ''
      document.getElementById('text-read').checked = false
      document.getElementById('requiredValidation').innerHTML = ''
      document.getElementById('numberValidation').innerHTML = ''
      document.getElementById('inputValidation').innerHTML = ''
    }
  }

  //Hide form when close is clicked
  function hideForm() {
    let modal = document.getElementById('modal')
    modal.style.display = 'none'
    document.getElementById('text-title').value = ''
    document.getElementById('text-author').value = ''
    document.getElementById('text-rating').value = ''
    document.getElementById('text-read').checked = false
    document.getElementById('requiredValidation').innerHTML = ''
    document.getElementById('numberValidation').innerHTML = ''
    document.getElementById('inputValidation').innerHTML = ''
  }

  // Load default books
  function defaultBooks() {
    let book1 = Book('Harry Potter and the Goblet of Fire', 'J. K. Rowling', '10', true)
    let book2 = Book('East of Eden', 'John Steinbeck', '8', false)
    let book3 = Book('The Lightning Thief', 'Rick Riordan', '9', false)
    myLibrary.push(book1, book2, book3)
  }

  // Document's Main Function
  function main() {
    let newBook = document.getElementById('newBook')
    newBook.addEventListener('click', displayForm)

    let newBookForm = document.getElementById('modal')
    newBookForm.addEventListener('submit', function(e) {
      e.preventDefault()
    })

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
