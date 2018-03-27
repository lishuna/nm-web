var fs = require('fs');
var path = require('path');

var cwd = process.cwd();
var basePath = path.join(cwd, 'mock', 'data');

module.exports = {
    '**.json': {
        bypass: function(req, res) {
            res.json(JSON.parse(fs.readFileSync(path.join(basePath, req.url), 'utf8')));
            res.end();
        }
    }
};
