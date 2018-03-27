var mongoose = require('mongoose');
var app = require('./config/express');

mongoose.connect('mongodb://127.0.0.1:27017/Test', { server: { socketOptions: { keepAlive: 1 } } });

mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database:`);
}).on('open', function() {
    console.log('数据库test连接成功');
});

app.listen('4004', () => {
    console.info(`server started on port 4004`); // eslint-disable-line no-console
});
module.exports = app;