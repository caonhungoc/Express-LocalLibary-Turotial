

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog');  //Import routes for "catalog" area of site

var app = express();

var Author = require("./models/author");
var Genre = require("./models/genre");
var Book = require("./models/book");
var BookInstance = require("./models/bookinstance");

function addBook(title, author, summary, isbn, genre) {
  let book = new Book({ title, author, summary, isbn, genre });

  book.save(function (err) {
    if (err) console.log(err)
    else {
      console.log(book)
    }
  });
}

function addBookInstance(book, imprint, status) {
  let bookInstance = new BookInstance({ book, imprint, status });

  bookInstance.save(function (err) {
    if (err) console.log(err)
    else {
      console.log(bookInstance)
    }
  });
}

function addAuthor(first_name, family_name) {
  let author = new Author({ first_name: first_name, family_name });

  author.save(function (err) {
    if (err) console.log(err)
    else {
      console.log(author)
    }
  });
}

function addGenre(name) {
  let genre = new Genre({ name });

  genre.save(function (err) {
    if (err) console.log(err)
    else {
      console.log(genre)
    }
  });
}

const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://ngoccao:Pass1234__@cluster0.lanpk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true}).then(() => {
  console.log("connect database sucesss");
  // var bob = new Genre({ name: 'Trinh Tham' });
  // addAuthor("he", "lo");
  // addBook("begin nodejs", "60a3977174cec337042c7cbf", "begin nodejs", "isbncode", "60a4ab452dda9a3e7463d6a0");
  // addBookInstance("60a4ac69cda09c4240064b3e", "imprint", "Available");
  // addBookInstance("60a4ac69cda09c4240064b3e", "imprint1", "Loaned");
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);  // Add catalog routes to middleware chain.

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
