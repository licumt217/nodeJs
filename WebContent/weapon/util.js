/**
 *
 */
var http = require('http');
var path = require('path');
var fs = require('fs');
var iconv = require('iconv-lite');
var request = require('request');
var csv = require('csv');

let allData=[]
let myAll=0,myCount=0;
let util={
    validate:function (year,params) {
        year=String(year)
        let path="./data/json/week"+year;
        fs.readdir(path, function(err, files){
            if(err){
                console.log('error:\n' + err);
                return;
            }

            for(let i=0;i<files.length;i++){
                let file=files[i];
                let filename=file.substr(0,6);
                util.analysis(filename,year,params)
            }

        });

        setTimeout(function () {
            console.log(year+' all:'+myAll,' average:'+((myCount/myAll)*100).toFixed(2)+'%',params)
            util.save2file();
        },5000)
    },
    analysis:function (filename,year,params) {
        let file = "./data/json/week"+year+"/" + filename + ".json";
        let dataArray = [];

        try {
            dataArray = JSON.parse(fs.readFileSync(file));
        } catch (err) {
            // Here you get the error when the file was not found,
            // but you also get any other error
        }
        let all = 0;
        let balanceC = 0;

        function isRight(dataArray,i) {
            let prev1 = dataArray[i -1];
            let prev2 = dataArray[i -2];
            let prev3 = dataArray[i -3];
            let prev4 = dataArray[i -4];
            let prev5 = dataArray[i -5];
            let prev6 = dataArray[i -6];
            let size=params.size;//1.5;
            let percent=params.percent;//0.03;
            function isRedMore() {
                let r1=(prev1.end>prev1.begin)?1:0;
                let r2=(prev2.end>prev2.begin)?1:0;
                let r3=(prev3.end>prev3.begin)?1:0;
                let r4=(prev4.end>prev4.begin)?1:0;
                let r5=(prev5.end>prev5.begin)?1:0;
                let r6=(prev6.end>prev6.begin)?1:0;
                return (r1+r2+r3+r4+r5+r6)>3 && r2>0 && r1>0 && r3>0;
            }
            function isSizeMore() {
                let isMore=(prev1.size+prev2.size+prev3.size)/(prev4.size+prev5.size+prev6.size)>1.5;
                return isMore && (prev1.size+prev2.size)/(prev3.size+prev4.size)>1.4
            }
            function isPercentMore() {
                return (prev1.percent+prev2.percent+prev3.percent)>(prev4.percent+prev5.percent+prev6.percent)
            }
            function isNotSoHigh() {
                let p=0.09;
                let p2=0.04
                return prev1.percent<p && prev2.percent<p && prev3.percent<p && prev1.percent>p2 && prev2.percent>p2 && prev3.percent>p2
            }
            function isRed() {
                return prev1.end>prev1.begin && prev2.end>prev2.begin ;
            }
            function isNotSoRed() {
                return prev1.percent<=percent && prev2.percent<=percent && prev3.percent<=percent;
            }
            function isBig() {
                return (prev1.size>0 && prev2.size>0 && prev3.size>0 && prev4.size>0 ) && (prev1.size>prev4.size || prev2.size>prev4.size || prev3.size>prev4.size  ) && (prev1.size<prev3.size || prev2.size<prev3.size) && prev1.size<prev2.size;
            }
            function isNotSoBig() {
                return (prev1.size/prev3.size)<size && (prev2.size/prev3.size)<size  && (prev1.size/prev2.size)<params.magicSize ;
            }
            function isTrend() {

            }
            if(isRedMore() ){
                return true;
            }
            return false;
        }
        for (let i = 6; i < dataArray.length - 1; i++) {
            let todayData = dataArray[i];

            if(isRight(dataArray,i)){

                allData.push(todayData);
                // console.log(todayData)

                all++;
                balanceC+=(todayData.percent.toFixed(2)*1)
            }

        }
        if(all>0){
            myAll+=all;
            myCount+=balanceC;
        }
    },
    save2file:function () {
        fs.appendFileSync('./data/json/result.json', JSON.stringify(allData), 'utf-8', function (err) {
        });
    },
    transAll2Json:function () {
        transCsv2Json('2001','2001/1/5','2001/12/28')
    },
    /**
     * 将csv转为json文件
     * @param fileName
     */
    transCsv2JsonPan:function () {
        fs.readFile('./data/csv/sh000001.csv', {encoding:'binary'},function (err, data) {
            if (err) {
                console.log(err.stack);
                return;
            }
            transCsv2Json(data)
        });

        function getZh(val) {
            // console.log(val)
            var buf =null;
            var str=null;
            try{
                buf= new Buffer(val, 'binary');
                str = iconv.decode(buf, 'GBK');
            }catch(e){
                console.log('-------------'+val)
            }
            return str;
        }

        function transCsv2Json(data) {
            data = data.toString();
            let table = [];
            let lastCode=null;
            let rows = data.split("\n");
            for (let i = 1; i < rows.length-1; i++) {
                let row = rows[i].split(",");
                let data0 = getZh(row[0]);
                let data1 = getZh(row[1]);
                let data2 = getZh(row[2]);
                let data3 = getZh(row[3]);
                let data4 = getZh(row[4]);
                let data5 = getZh(row[5]);
                let data6 = getZh(row[6]);
                let data7 = getZh(row[8]);



                let jsonObj = {
                    date: data1,
                    code: data0,
                    begin: Number(data2),
                    high: Number(data5),
                    low: Number(data4),
                    end: Number(data3),
                    percent: Number(data7),
                    size: Number(data6),
                }

                if(lastCode && lastCode!=jsonObj.code){
                    table=[]
                    lastCode=jsonObj.code;
                }else{
                    lastCode=jsonObj.code;
                }

                table.push(jsonObj);


            }
            fs.appendFileSync('./data/json/bigPan.json', JSON.stringify(table), 'utf-8', function (err) {
            });
            console.log('bigPan csv to json done!')
        }
    },
    /**
     * 将csv转为json文件
     * @param fileName
     */
    transCsv2Json:function (fileName) {
        fs.readFile('./data/csv/' + fileName + '.csv', {encoding:'binary'},function (err, data) {
            if (err) {
                console.log(err.stack);
                return;
            }
            transCsv2Json(data)
        });

        function getZh(val) {
            // console.log(val)
            var buf =null;
            var str=null;
            try{
                buf= new Buffer(val, 'binary');
                str = iconv.decode(buf, 'GBK');
            }catch(e){
                console.log('-------------'+val)
            }
            return str;
        }

        function transCsv2Json(data) {
            data = data.toString();
            let table = [];
            let lastCode=null;
            let rows = data.split("\n");
            for (let i = 1; i < rows.length-1; i++) {
                let row = rows[i].split(",");
                let data0 = getZh(row[1]);
                let data1 = getZh(row[0]);
                let data2 = getZh(row[2]);
                let data3 = getZh(row[3]);
                let data4 = getZh(row[4]);
                let data5 = getZh(row[5]);
                let data6 = getZh(row[6]);
                let data7 = getZh(row[7]);



                let jsonObj = {
                    date: data0,
                    code: data1,
                    begin: Number(data2),
                    high: Number(data3),
                    low: Number(data4),
                    end: Number(data5),
                    percent: Number(data6),
                    size: Number(data7),
                }

                if(lastCode && lastCode!=jsonObj.code){
                    table=[]
                    lastCode=jsonObj.code;
                }else{
                    lastCode=jsonObj.code;
                }

                table.push(jsonObj);


            }
            fs.appendFileSync('./data/json/'+fileName.substr(2,6)+'.json', JSON.stringify(table), 'utf-8', function (err) {
            });
            console.log('csv to json done!')
        }
    }
}

// trans();
// util.transCsv2JsonPan()

/**
 * csv转json
 */
function trans(){
    let path="./data/csv";
    fs.readdir(path, function(err, files){
        //err 为错误 , files 文件名列表包含文件夹与文件
        if(err){
            console.log('error:\n' + err);
            return;
        }
        let realResult=[]
        files.forEach(function(file){

            fs.stat(path + '/' + file, function(err, stat){
                if(err){console.log(err); return;}
                let filename=file.substr(0,8);
                util.transCsv2Json(filename)
            });

        });


    });
}

function getBigPanData() {
    let filePan = "./data/json/bigPan.json";
    let dataPan = [];

    try {
        dataPan = JSON.parse(fs.readFileSync(filePan));
    } catch (err) {
        return null;
    }
    return dataPan;
}

/**
 * csv转json
 */
function trans(){
    let path="./data/csv";
    fs.readdir(path, function(err, files){
        //err 为错误 , files 文件名列表包含文件夹与文件
        if(err){
            console.log('error:\n' + err);
            return;
        }
        let realResult=[]
        files.forEach(function(file){

            fs.stat(path + '/' + file, function(err, stat){
                if(err){console.log(err); return;}
                let filename=file.substr(0,8);
                console.log(filename)
                util.transCsv2Json(filename)
            });

        });


    });
}
module.exports=util;