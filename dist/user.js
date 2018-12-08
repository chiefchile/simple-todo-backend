"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    username: String,
    password: String
});
exports.User = mongoose.model('User', userSchema);
//# sourceMappingURL=user.js.map