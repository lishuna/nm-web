var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://127.0.0.1:27017/Test');
// db.connection.on('error', function(error){
//   console.log('数据库test连接失败：' + error);
// });
// db.connection.on('open', function(){
//   console.log('数据库test连接成功');
// });

var sm = new mongoose.Schema({
    loginId: { type: String },
    passwd: { type: String },
    nickName: { type: String },
    age: { type: Number, default: 0 }
});
var users = mongoose.model('user', sm);
// var user = new users({
//     loginId: '18501364356',
//     passwd: 'qweasd',
//     age: 18,
//     nickName: '会飞的鱼儿'
// });
// user.save(function(err) {
//     console.log(err);
// });

/* 新建集合 */
// users.create([{
// loginId: '18501364356',
//     passwd: 'qweasd',
//     age: 18,
//     nickName: '会飞的鱼儿'
// }],function(error, docs){
//     if(error) {
//         console.log(error);
//       } else {
//         console.log('save ok');
//         console.log(docs);
//       }
// });

/* -----------插入------------ */
users.insertMany([{
    loginId: '13111111111',
    passwd: 'qweasd',
    age: 19,
    nickName: '爱的抱抱'
}, {
    loginId: '14111111111',
    passwd: 'qweasd',
    age: 19,
    nickName: '想你的夜'
}], function(error, docs) {
    if (error) {
        console.log(error);
    } else {
        console.log('insert ok');
        console.log(docs);
    }
});

/* ---------更新一条数据----------- */
// users.update({loginId: '18501364356'},{
//     $set: {
//         age: '12'
//     }
// }, function (error, docs) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('update ok');
//         console.log(docs);
//     }
// });

/* ---------查询所有----------- */
// users.find({},'loginId passwd nickName age', function (error, docs) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('find ok');
//         console.log(docs);
//     }
// });

/* -----------查询带条件--------------- */
users.find({
        // loginId: /18/,
        age: { $gt: 17, $lt: 66 },
        nickName: { $in: ['会飞的鱼儿', '爱的抱抱'] }
    })
    // .limit(10)
    // .sort({age: -1})
    // .select({ loginId: 1, passwd: 0, age: 1, nickName: 1})
    .exec(function(error, docs) {
        if (error) {
            console.log(error);
        } else {
            console.log('find ok');
            console.log(docs);
        }
    });