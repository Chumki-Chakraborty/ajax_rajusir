let mongoose = require('mongoose');
let Schema = mongoose.Schema;

userSchema = new Schema({
	
	username: String,
	fullname: String,
	age: String
}),
User = mongoose.model('user1', userSchema);

module.exports = User;