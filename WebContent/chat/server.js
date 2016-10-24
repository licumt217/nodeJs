/**
 * Created by liqiang on 2016/10/19.
 */
'use strict';
var http=require('http');
var fs=require('fs');
var path=require('path');
var mime=require('mime');
var chatServer=require('./lib/chat_server')
let cache={};

function send404(res){
    res.writeHead(404,{'Content-Type':'text/plain'});
    res.write('Error 404:not found!');
    res.end();
}
function sendFile(res,filePath,fileContents){
    res.writeHead(200,{'Content-Type':mime.lookup(path.basename(filePath))});
    res.end(fileContents);
}
//缓存静态资源
function serveStatic(res,cache,absPath){
    if(cache[absPath]){
        sendFile(res,absPath,cache[absPath])
    }else{
        fs.exists(absPath, function (exists) {
            if(exists){
                fs.readFile(absPath, function (err,data) {
                    if(err){
                        send404(res)
                    }else{
                        cache[absPath]=data;
                        sendFile(res,absPath,data)
                    }
                })
            }else{
                send404(res);

            }
        })
    }
}

let server=http.createServer(function (req,res) {
    var filePath=false;
    if(req.url=='/'){
        filePath='public/index.html'
    }else{
        filePath='public'+req.url
    }
    var absPath='./'+filePath;
    serveStatic(res,cache,absPath)
});
chatServer.listen(server);
server.listen(3000, function () {
    console.log('listening on port 3000...')
})

