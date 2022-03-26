const bcrypt = require("bcrypt");

const hashed = bcrypt.hashSync("hello", 12);
console.log(hashed);
