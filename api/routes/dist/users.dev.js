"use strict";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

var router = require("express").Router();

var bcrypt = require("bcrypt");

var User = require("../models/User"); // PLAN
// -- UPDATE USER


router.put("/:id", function _callee(req, res) {
  var _req$body, id, password, isAdmin, salt, user;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, id = _req$body.id, password = _req$body.password, isAdmin = _req$body.isAdmin;

          if (!(id == req.params.id || isAdmin)) {
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
          return regeneratorRuntime.awrap(User.findByIdAndDelete(id, req.body));

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

router["delete"]("/:id", function _callee2(req, res) {
  var _req$body2, userId, password, isAdmin, user;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, userId = _req$body2.userId, password = _req$body2.password, isAdmin = _req$body2.isAdmin;

          if (!(userId == req.params.id || isAdmin)) {
            _context2.next = 14;
            break;
          }

          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(User.findByIdAndDelete(id));

        case 5:
          user = _context2.sent;
          res.status(200).json("Account has been Deleted");
          _context2.next = 12;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](2);
          return _context2.abrupt("return", res.status(500).json(err));

        case 12:
          _context2.next = 15;
          break;

        case 14:
          return _context2.abrupt("return", res.status(403).json("You can delete only your account"));

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 9]]);
}); // -- GET USER

router.get("/:id", function _callee3(req, res) {
  var user, _user$_doc, password, updatedAt, other;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.params.id));

        case 3:
          user = _context3.sent;
          _user$_doc = user._doc, password = _user$_doc.password, updatedAt = _user$_doc.updatedAt, other = _objectWithoutProperties(_user$_doc, ["password", "updatedAt"]);
          res.status(200).json(other);
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json(err).json(err);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); // -- FOLLOW USER

router.put("/:id/follow", function _callee4(req, res) {
  var user, currentUser;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (!(req.body.userId != req.params.id)) {
            _context4.next = 23;
            break;
          }

          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(User.findById(req.params.id));

        case 4:
          user = _context4.sent;
          _context4.next = 7;
          return regeneratorRuntime.awrap(User.findById(req.body.userId));

        case 7:
          currentUser = _context4.sent;

          if (user.followers.includes(req.body.userId)) {
            _context4.next = 16;
            break;
          }

          _context4.next = 11;
          return regeneratorRuntime.awrap(user.updateOne({
            $push: {
              followers: req.body.userId
            }
          }));

        case 11:
          _context4.next = 13;
          return regeneratorRuntime.awrap(currentUser.updateOne({
            $push: {
              followings: req.params.id
            }
          }));

        case 13:
          res.status(200).json("User has been followed");
          _context4.next = 17;
          break;

        case 16:
          res.status(403).json("You already follow this user");

        case 17:
          _context4.next = 21;
          break;

        case 19:
          _context4.prev = 19;
          _context4.t0 = _context4["catch"](1);

        case 21:
          _context4.next = 24;
          break;

        case 23:
          res.status(200).json("You can not follow yourself");

        case 24:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 19]]);
}); // -- UNFOLLOW USER

router.get("/", function (req, res) {});
module.exports = router;