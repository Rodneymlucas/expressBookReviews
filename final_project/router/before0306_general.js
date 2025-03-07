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
  //Write your code here - similar to functionality in Practice Lab
  res.send(JSON.stringify(books,null,4));
  //res.status(200);

});

// Get book details based on ISBN Task 2 and Task 11
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
    // Retrieve the isbn parameter from the request URL and send the corresponding friend's details
    const isbn = req.params.isbn;
    res.send(books[isbn]);
 });
  
// Get book details based on author - Task 3 and Task 12
// Need to filter on author coming from request and send that back

public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  const booksByAuthor = books.filter(author => author === books.author);
  res.send(booksByAuthor);
});

// Get all books based on title - Task 4 and Task 13 
// Need to filter on title coming from request and send that back
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  res.send(books[title]);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  // Need get book on ISBN and then send back reviews books[isbn].review.[]
    const isbn = req.params.isbn;
    res.send(books[isbn].reviews)
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
