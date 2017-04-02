var express = require('express')
var app = express()

/* 定义mock数据 */
var appData = require('../mock/data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

/* express 路径 */
var apiRoutes = express.Router();
apiRoutes.get('/seller', function(req, res) {
    res.json({
        errno: 0,
        data: seller
    })
});
apiRoutes.get('/goods', function(req, res) {
    res.json({
        errno: 0,
        data: goods
    })
});
apiRoutes.get('/ratings', function(req, res) {
    res.json({
        errno: 0,
        data: ratings
    })
});
app.use('', apiRoutes);

var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('临时服务器 访问地址为 http://%s:%s', host, port);
})
