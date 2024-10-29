const Comment = require("./comment.js");
const User = require("./user.js");

User.associate({ Comment });
Comment.associate({ User });

module.exports = { User, Comment };
