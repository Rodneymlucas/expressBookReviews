const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here - pulled from Practice Lab
  const username = req.body.username;
  const password = req.body.password;

  // Check if both username and password are provided
  if (username && password) {
      // Check if the user does not already exist
      if (!isValid(username)) {
          // Add the new user to the users array
          users.push({"username": username, "password": password});
          console.log("A new user registered with id of: " + username);

          return res.status(200).json({message: "User successfully registered. Now you can login"});
      } else {
          return res.status(404).json({message: "User already exists!"});
      }
  }
  // Return error if username or password is missing
  return res.status(404).json({message: "Unable to register user."});
});


// Get the book list available in the shop - Task 1 and Task 10
public_users.get('/',function (req, res) {
    getAllBooks()
    .then(books => {
        console.log('Books:', books);
        res.send(JSON.stringify(books,null,4));            
    })
    .catch(error => {
        console.error('Error:', error);
        res.status(404);
    });
});

//Used with Task 1 and Task 10
function getAllBooks() {
    return new Promise((resolve, reject) => {
        // Simulate an asynchronous operation, e.g., reading from a database
        setTimeout(() => {
        if (books) {
            resolve(books);
        } else {
            reject('Error fetching books');
        }
        }, 10);
    });
}

// Get book details based on ISBN Task 2 and Task 11
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    getBooksByIsbn(isbn)
    .then(returnedBook => {
        console.log('Found book by ISBN#:', isbn);
        res.send(returnedBook);
    })
    .catch(error => {
        console.error('Error:', error);
        res.status(404);
    });
});

//Used with Task 2 and Task 11
function getBooksByIsbn(searchIsbn) {
    return new Promise((resolve, reject) => {
        // Simulate an asynchronous operation, e.g., reading from a database
        setTimeout(() => {
            resultBook = books[searchIsbn];
            if (resultBook) {
            resolve(resultBook);
        } else {
            reject('Error fetching books');
        }
        }, 10);
    });
}
 

// Get book details based on author - Task 3 and Task 12
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    getBooksByAuthor(author)
    .then(returnedBooksByAuthor => {
        console.log('Found books by author:', author);
        res.send(returnedBooksByAuthor);
    })
    .catch(error => {
        console.error('Error:', error);
        res.status(404);
    });

});

//Used with Task 3 and Task 12
function getBooksByAuthor(searchAuthor) {
    return new Promise((resolve, reject) => {
        // Simulate an asynchronous operation, e.g., reading from a database
        setTimeout(() => {
        const resultBooksByAuthor = Object.values(books).filter(book => book.author === searchAuthor);
            if (resultBooksByAuthor) {
            resolve(resultBooksByAuthor);
        } else {
            reject('Error fetching books by author');
        }
        }, 10);
    });
}

// Get all books based on title - Task 4 and Task 13 
// Need to filter on title coming from request and send that back
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;

  getBooksByTitle(title)
  .then(returnedBooksByTitle => {
      console.log('Found books by title:', title);
      res.send(returnedBooksByTitle);
  })
  .catch(error => {
      console.error('Error:', error);
      res.status(404);
  });

});

//Used with Task 4 and Task 13
function getBooksByTitle(searchTitle) {
    return new Promise((resolve, reject) => {
        // Simulate an asynchronous operation, e.g., reading from a database
        setTimeout(() => {
        const resultBooksByTitle = Object.values(books).filter(book => book.title === searchTitle);
            if (resultBooksByTitle) {
            resolve(resultBooksByTitle);
        } else {
            reject('Error fetching books by title');
        }
        }, 10);
    });
}


//  Task 5 Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  // Need get book on ISBN and then send back reviews books[isbn].review.[]
    const isbn = req.params.isbn;
    //res.send(books[isbn].reviews)
    res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
