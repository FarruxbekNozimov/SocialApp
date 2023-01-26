"use strict";

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

var router = require("express").Router();

var bcrypt = require("bcrypt");

var User = require("../models/User"); // PLAN
// -- UPDATE USER


router.put("/:username", function _callee(req, res) {
  var _req$body, username, password, salt, user;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, password = _req$body.password;

          if (!(username == req.params.username || req.user.isAdmin)) {
            _context.next = 27;
            break;
          }

          if (!password) {
            _context.next = 15;
            break;
          }

          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 6:
          salt = _context.sent;

          _readOnlyError("password");

          _context.next = 10;
          return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

        case 10:
          req.body.password = password = _context.sent;
          _context.next = 15;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](3);

        case 15:
          _context.prev = 15;
          _context.next = 18;
          return regeneratorRuntime.awrap(User.findOneAndUpdate({
            username: username
          }, req.body));

        case 18:
          user = _context.sent;
          res.status(200).json("Account has been updated");
          _context.next = 25;
          break;

        case 22:
          _context.prev = 22;
          _context.t1 = _context["catch"](15);
          return _context.abrupt("return", res.status(500).json(err));

        case 25:
          _context.next = 28;
          break;

        case 27:
          return _context.abrupt("return", res.status(403).json("You can update only your account"));

        case 28:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 13], [15, 22]]);
}); // -- DELETE USER
// -- GET USER
// -- GET USER
// -- FOLLOW USER
// -- UNFOLLOW USER

router.get("/", function (req, res) {});
module.exports = router;