var express = require('express'),
    server = express(),
    ejs = require('ejs'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    mongoose = require('mongoose'),
    session = require('express-session');
    MONGOURI = process.env.MONGOLAB_URI || "mongodb://localhost:27017",
    DBNAME = "todoodles",
    PORT = process.env.PORT || 3000,
    Schema = mongoose.Schema,
    expressLayouts = require('express-ejs-layouts');

    mongoose.connect(MONGOURI + "/" + DBNAME);

var itemSchema = new Schema ({
  todo_value: { type: String, required: true },
  created: { type: Date, default: Date.now },
  due_date: { type: Date, default: Date.now },
  finished: { type: Boolean, default: false }
});

var Item = mongoose.model('Item', itemSchema);

server.use(express.static('./public'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));



// Items

server.get('/items', function(req, res) {
  Item.find({}, function(err, items) {
    if (err) {
      res.send(err);
    } else {
    res.json(items);
    }
  });


});

server.post('/items', function(req, res) {
  Item.create(req.body, function (err, data) {
    Item.find({}, function(err, items) {
      res.json(items);
    });
  });
});

server.patch('/items/:id', function(req, res) {
  var itemOptions = req.body.item;
  Item.findByIdAndUpdate(req.params.id, itemOptions, function (err) {
    if(err) {
      console.log(err);
    } else {
      console.log("updated");
      Item.find(function(err, items) {
        if(err){
          res.send(err);
        } else {
        res.json(items);
        }
      });
    }
  });
});

server.delete('/items/:id', function(req, res) {
  Item.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("gone");
      Item.find(function(err, items) {
        if(err){
          res.send(err);
        } else {
        res.json(items);
        }
      });
    }
  });
});

// mongoose.connect('mongodb://localhost:27017/todoodles');
server.listen(PORT, function() {
  console.log("Server is listening! on port:", PORT);
});
//FOR USER LOGIN
// server.set('views', './views');
// server.set('view engine', 'ejs');
//
// server.use(session({
//   secret: "hellotherefriend",
//   resave: true,
//   saveUninitialized: false
// }));
//
// server.use(express.static("./public"));
//
// server.use(bodyParser.urlencoded({
//   extended: true
// }));
// server.use(methodOverride('_method'));
//
// server.use(function (req, res, next) {
//   console.log("---------Req Start---------");
//   console.log("Req dot body\n", req.body);
//   console.log("Req dot params\n", req.params);
//   console.log("Req dot session\n", req.session);
//   console.log("---------Req End----------");
//   next();
// })
//
// //Routes
//
// var userController = require('./controllers/users.js');
// server.use('/users', userController);
//
// //No Routes
// server.use(function (req, res, next) {
//   res.send("Nothing here");
//   res.end();
// })
//
// //Database / server
// mongoose.connect('mongodb://localhost:27017/todoodles');
// var db = mongoose.connection;
//
// db.on('error', function() {
//   console.log("Errors!");
// });
//
// db.once('open', function () {
//   console.log("Database up and running");
//   server.listen(3000, function () {
//     console.log("I'm listening!");
//   });
// });
