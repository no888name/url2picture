const express = require('express')
const app = express();
const PORT = process.env.PORT || 5000;

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 5 // limit each IP to 100 requests per windowMs
});

var fs = require('fs');
var webshot = require('node-webshot');

let helper = {
    baseurl: function (req) {
        return req.protocol + '://' + req.get('host');
    },
}


app.use(limiter).use(express.json())
    .get('/', (req, res) => {
        res.send('API root')
    })
    .get('/test', (req, res) => {
        res.send('test')
    })
    .post('/picture', (req, res) => {
        console.log('starting capturing ...');
        var url = req.body.url;
        //todo: add url validation
        if (url) {

            // var renderStream = webshot(url);


            var name = Buffer.from(url).toString('base64') + '.png';
            console.log('name ', name, `static/images/${name}`);
            if (fs.existsSync(`static/images/${name}`)) {
                console.log('exist');
                //file exists
                res.send({
                    url_hash: name,
                    imgName: name,
                    imgUrl: helper.baseurl(req) + `/images/${name}`,
                    cache: true
                });
            } else {
                console.log('not exist, requesting',url);

                webshot(url, `static/images/${name}`, function (err) {
                    // screenshot now saved to google.png
                    if (!err) {
                        console.log(`screenshot now saved to static/images/${name}`);
                        res.send({
                            url_hash: name,
                            imgName: name,
                            imgUrl: helper.baseurl(req) + `/images/${name}`,
                            cache: false
                        });

                    }
                });


            }


        }


    })
    .listen(PORT, () => console.log(`Listening on ${PORT}`))

// export the server middleware
module.exports = {
    path: '/api',
    handler: app
}