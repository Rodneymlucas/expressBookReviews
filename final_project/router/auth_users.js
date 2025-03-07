const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
    // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}


const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records. - copied from Prac Lab
    // Filter the users array for any user with the same username and password
    let validusers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });
    // Return true if any valid user is found, otherwise false
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}


//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here - copied from the practice lab
  const username = req.body.username;
  const password = req.body.password;

  // Check if username or password is missing
  if (!username || !password) {
      return res.status(404).json({ message: "Error logging in" });
  }

  // Authenticate user
  if (authenticatedUser(username, password)) {
      // Generate JWT access token
      let accessToken = jwt.sign({
          data: password
      }, 'access', { expiresIn: 60 * 60 });

      // Store access token and username in session
      req.session.authorization = {
          accessToken, username
      }
      console.log("A new user logged in with id: " + username);
      return res.status(200).send("User successfully logged in");
  } else {
      return res.status(208).json({ message: "Invalid Login. Check username and password" });
  }
});


// Add a book review - Task 8
regd_users.post("/auth/review/:isbn", (req, res) => {
    console.log("inside the review functionality")
    //code suggested from AI assistance inside of the lab environment
    const isbn = req.query; 
    const userReview = req.body.Review
    const username = req.session.username; // Get the username from the session

    if (!isbn || !userReview) {
        return res.status(400).send('ISBN and review are required.');
    }

    // Assuming you have a function to find a review by username and ISBN
    let existingReview = findReviewByUserAndISBN(username, isbn);
    if (existingReview) {
        // Update the existing review
        existingReview.text = review;
        res.send('Review updated successfully.');
    } else {
        // Add a new review
        addNewReview({ username, isbn, review });
        res.send('Review added successfully.');
    }
});

const findReviewByUserAndISBN = (username, isbn)=>{ //returns boolean
    //add in the search functionality here
    return false;
}
    
// Delete a book review - Task 9


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
