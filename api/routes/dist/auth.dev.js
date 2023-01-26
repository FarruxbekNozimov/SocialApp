"use strict";

var router = require("express").Router();

var User = require("../models/User");

var bcrypt = require("bcrypt");

router.post("/register", function _callee(req, res) {
  var salt, hashedPassword, newUser, user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("salom");
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 4:
          salt = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, salt));

        case 7:
          hashedPassword = _context.sent;
          // CREATE NEW USER AND RESPONSE
          newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
          });
          _context.next = 11;
          return regeneratorRuntime.awrap(newUser.save());

        case 11:
          user = _context.sent;
          res.status(200).json(user);
          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 15]]);
}); // LOGIN

router.post("/login", function _callee2(req, res) {
  var _req$body, email, password, user, validPassword;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, email = _req$body.email, password = _req$body.password;

          if (!(!email && !password)) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt("return", res.status(200).json("All fields are required"));

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 6:
          user = _context2.sent;

          if (user) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", res.status(200).json("User not found"));

        case 9:
          _context2.next = 11;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 11:
          validPassword = _context2.sent;

          if (validPassword) {
            _context2.next = 14;
            break;
          }

          return _context2.abrupt("return", res.status(200).json("Password is wrong"));

        case 14:
          res.status(200).json(user);
          _context2.next = 20;
          break;

        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](0);
          res.status(200).json(_context2.t0);

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 17]]);
});
module.exports = router;