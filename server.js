const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, './dist')));
app.get('/*', function (_, res) {
    res.sendFile(path.join(__dirname, './dist/index.html'), function (err) {
        if (err) {
            res.status(500).send(err)
        }
    })
});

app.listen(9000, () => {
    console.log('Server start at port: 9000');
});
