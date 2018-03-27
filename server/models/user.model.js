var mongoose = require('mongoose');

var User = new mongoose.Schema({
    loginId: { type: String },
    passwd: { type: String },
    nickName: { type: String },
    age: { type: Number, default: 0 }
});

User.statics = {
    get: function(loginId, passwd) {
        console.log('&&&&&&&&&&&' + loginId)
        return this.find({
                loginId: loginId,
                passwd: passwd
            })
            .select({ 'passwd': 0, '_id': 0, '__v': 0 });
    }
}
module.exports = mongoose.model('users', User);