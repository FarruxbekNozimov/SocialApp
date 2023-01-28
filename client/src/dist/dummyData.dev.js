"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Posts = exports.Users = void 0;
var Users = [{
  id: 1,
  profilePicture: "assets/person/1.png",
  username: "Toshmatov Alisher"
}, {
  id: 2,
  profilePicture: "assets/person/2.png",
  username: "Eshmatov G'anisher"
}];
exports.Users = Users;
var Posts = [{
  id: 1,
  desc: "Hello my love , I miss you !",
  photo: "assets/post/1.png",
  date: "5 mins ago",
  userId: 1,
  like: 32,
  comment: 10
}, {
  id: 2,
  desc: "What is your name ?",
  photo: "assets/post/2.png",
  date: "1 hour ago",
  userId: 2,
  like: 12,
  comment: 4
}, {
  id: 3,
  desc: "What is not my name",
  photo: "assets/post/3.png",
  date: "5 hour ago",
  userId: 2,
  like: 17,
  comment: 8
}];
exports.Posts = Posts;