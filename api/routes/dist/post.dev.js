"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var router = require("express").Router();

var shuffleArray = require("../utils/shuffle");

var Post = require("../models/Post");

var User = require("../models/User"); // PLAN
// -- CREATE POST


router.post("/", function _callee(req, res) {
  var newPost, savedPost;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(new Post(req.body));

        case 2:
          newPost = _context.sent;
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(newPost.save());

        case 6:
          savedPost = _context.sent;
          res.status(200).json(savedPost);
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](3);
          res.status(500).json(_context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 10]]);
}); // -- UPDATE POST

router.put("/:id", function _callee2(req, res) {
  var post;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Post.findById(req.params.id));

        case 3:
          post = _context2.sent;
          console.log(post);

          if (!(post.userId == req.body.userId)) {
            _context2.next = 11;
            break;
          }

          _context2.next = 8;
          return regeneratorRuntime.awrap(post.updateOne({
            $set: req.body
          }));

        case 8:
          res.status(200).json("Post has been updated");
          _context2.next = 12;
          break;

        case 11:
          res.status(403).json("You can update only your post");

        case 12:
          _context2.next = 17;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json(_context2.t0);

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 14]]);
}); // -- DELETE POST

router["delete"]("/:id", function _callee3(req, res) {
  var post;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Post.findById(req.params.id));

        case 3:
          post = _context3.sent;

          if (!(post.userId == req.body.userId)) {
            _context3.next = 10;
            break;
          }

          _context3.next = 7;
          return regeneratorRuntime.awrap(post.deleteOne());

        case 7:
          res.status(200).json("Post has been deleted");
          _context3.next = 11;
          break;

        case 10:
          res.status(403).json("You can delete only your post");

        case 11:
          _context3.next = 16;
          break;

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json(_context3.t0);

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 13]]);
}); // -- LIKE / DISLIKE POST

router.put("/:id/like", function _callee4(req, res) {
  var post;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Post.findById(req.params.id));

        case 3:
          post = _context4.sent;

          if (post.likes.includes(req.body.userId)) {
            _context4.next = 10;
            break;
          }

          _context4.next = 7;
          return regeneratorRuntime.awrap(post.updateOne({
            $push: {
              likes: req.body.userId
            }
          }));

        case 7:
          res.status(200).json("Post has been liked");
          _context4.next = 13;
          break;

        case 10:
          _context4.next = 12;
          return regeneratorRuntime.awrap(post.updateOne({
            $pull: {
              likes: req.body.userId
            }
          }));

        case 12:
          res.status(200).json("Post has been disliked");

        case 13:
          _context4.next = 18;
          break;

        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json(_context4.t0);

        case 18:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 15]]);
}); // -- GET TIMELINE POSTS

router.get("/timeline/all", function _callee5(req, res) {
  var currentUser, userPosts, friendPosts;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.body.userId));

        case 3:
          currentUser = _context5.sent;
          _context5.next = 6;
          return regeneratorRuntime.awrap(Post.find({
            userId: currentUser._id
          }));

        case 6:
          userPosts = _context5.sent;
          _context5.next = 9;
          return regeneratorRuntime.awrap(Promise.all(currentUser.followings.map(function (friendId) {
            return Post.find({
              userId: friendId
            });
          })));

        case 9:
          friendPosts = _context5.sent;
          res.json(shuffleArray(userPosts.concat.apply(userPosts, _toConsumableArray(friendPosts))));
          _context5.next = 16;
          break;

        case 13:
          _context5.prev = 13;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json(_context5.t0);

        case 16:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 13]]);
}); // -- GET POST

router.get("/:id", function _callee6(req, res) {
  var post;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Post.findById(req.params.id));

        case 3:
          post = _context6.sent;
          res.status(200).json(post);
          _context6.next = 10;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          res.status(500).json(_context6.t0);

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
module.exports = router;