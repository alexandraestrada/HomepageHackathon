var mongoose = require('mongoose');
var User = require('./user.js');

function saveItem() {
	var user1 = new User({
		name:"Alex",
		racID: "m669",
		password: "test"
	})
	user1.save()
}

module.exports = {saveItem: saveItem}

