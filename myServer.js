/**
 * Created by liq on 2016/10/7.
 */
const http=require('http');
const hostName='127.0.0.1';
const port=3000;

const server=http.createServer(function (req,res) {
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    res.end('hello world!');
});

server.listen(port,hostName, function () {
    console.log('sta...........')
})