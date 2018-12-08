var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    password: String
});

export const User = mongoose.model('User', userSchema);

export interface IUser {
	username: String,
    password: String
}