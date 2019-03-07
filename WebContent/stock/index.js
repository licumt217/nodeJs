/**
 * my weapon
 */
var http = require('http');
var fs = require('fs');
var request = require('request');
var util=require('./util')

let all=0;
let redAll=0;
let greenAll=0;
let redAmount=0;
let greenAmount=0;
let year=2017;
var result=[];
let money=1;
let r1Begin=0.018,
    r1End=0.04
    // myRatio=1.35,
    myRatio=1.6,
    r2=-0.021,
    r3=0.021
    r4=-0.013;


analysisAll()
// setInterval(function () {
//     reset();
//     // r1Begin+=0.001;
//     year--;
//     // myRatio+=0.03
//     analysisAll()
// },12000)


function analysisAll() {
     all=0;
     redAll=0;
     greenAll=0;
     redAmount=0;
     greenAmount=0;
    result=[]
    let path="./data/json";
    fs.readdir(path, function(err, files){
        //err 为错误 , files 文件名列表包含文件夹与文件
        if(err){
            console.log('error:\n' + err);
            return;
        }

        // files=files.slice(0,5);
        files.forEach(function(file){

            fs.stat(path + '/' + file, function(err, stat){
                if(err){console.log(err); return;}
                let filename=file.substr(0,6);
                analysis(filename)
            });

        });


        setTimeout(function () {
            let redPercent=((redAll/all)*100).toFixed(2)+"%";
            let greenPercent=((greenAll/all)*100).toFixed(2)+"%";
            console.log('year：'+year+' all:'+all+' redPercent:'+redPercent+' greenPercent:'+greenPercent+'redAmount:'+redAmount+' greenAmount:'+greenAmount+' '+((redAmount+greenAmount)/all)*100+'%')
            console.log('money:'+money)

            // fs.writeFile('./data/result.json', JSON.stringify(result), 'utf-8', function (err) {
            // });
            handleResult(result)
        },10000)


    });
}

function reset() {
    all=0;
    redAll=0;
    greenAll=0;
    redAmount=0;
    greenAmount=0;
    money=1.1;
}

function handleResult(data) {
    let bb=1;
    let newData=[];
    let dateArray=[];
    console.log('len:'+data.length)
    data.forEach(function (item) {
        if(!dateArray.includes(item.date)){
            newData.push(item);
            dateArray.push(item.date);
            bb*=(1+item.percent)
        }

    })


    console.log('len2:'+newData.length)
    console.log('bb:'+bb)
    data=newData;
    
    var yearArray01=[];
    var yearArray02=[];
    var yearArray03=[];
    var yearArray04=[];
    var yearArray05=[];
    var yearArray06=[];
    var yearArray07=[];
    var yearArray08=[];
    var yearArray09=[];
    var yearArray10=[];
    var yearArray11=[];
    var yearArray12=[];
    data.forEach(function (item) {
        if(item.date.includes(year+'-01')){
            yearArray01.push(item);
        }else if(item.date.includes(year+'-02')){
            yearArray02.push(item);
        }else if(item.date.includes(year+'-03')){
            yearArray03.push(item);
        }else if(item.date.includes(year+'-04')){
            yearArray04.push(item);
        }else if(item.date.includes(year+'-05')){
            yearArray05.push(item);
        }else if(item.date.includes(year+'-06')){
            yearArray06.push(item);
        }else if(item.date.includes(year+'-07')){
            yearArray07.push(item);
        }else if(item.date.includes(year+'-08')){
            yearArray08.push(item);
        }else if(item.date.includes(year+'-09')){
            yearArray09.push(item);
        }else if(item.date.includes(year+'-10')){
            yearArray10.push(item);
        }else if(item.date.includes(year+'-11')){
            yearArray11.push(item);
        }else if(item.date.includes(year+'-12')){
            yearArray12.push(item);
        }
    })
    var array=new Array();
    array.concat(
        yearArray01,
        yearArray02,
        yearArray03,
        yearArray04,
        yearArray05,
        yearArray06,
        yearArray07,
        yearArray08,
        yearArray09,
        yearArray10,
        yearArray11,
        yearArray12
    );
    // console.log(yearArray17)

    // fs.writeFile('./data/result.json', JSON.stringify(yearArray17), 'utf-8', function (err) {
    // });


    // console.log('2012',handleDetail(yearArray12))
    // console.log('2011',handleDetail(yearArray11))
    // console.log('2010',handleDetail(yearArray10))
    // console.log('2009',handleDetail(yearArray09))
    // console.log('2008',handleDetail(yearArray08))
    // console.log('2007',handleDetail(yearArray07))
    // console.log('2006',handleDetail(yearArray06))
    // console.log('2005',handleDetail(yearArray05))
    // console.log('2004',handleDetail(yearArray04))
    // console.log('2003',handleDetail(yearArray03))
    // console.log('2002',handleDetail(yearArray02))
    // console.log('2001',handleDetail(yearArray01))
}

function handleResult_year(data) {
    var yearArray17=[];
    var yearArray16=[];
    var yearArray15=[];
    var yearArray14=[];
    var yearArray13=[];
    var yearArray12=[];
    var yearArray11=[];
    var yearArray10=[];
    var yearArray09=[];
    var yearArray08=[];
    var yearArray07=[];
    var yearArray06=[];
    var yearArray05=[];
    var yearArray04=[];
    var yearArray03=[];
    var yearArray02=[];
    var yearArray01=[];
    data.forEach(function (item) {
        if(item.date.includes('2017')){
            yearArray17.push(item);
        }else if(item.date.includes('2016')){
            yearArray16.push(item);
        }else if(item.date.includes('2015')){
            yearArray15.push(item);
        }else if(item.date.includes('2014')){
            yearArray14.push(item);
        }else if(item.date.includes('2013')){
            yearArray13.push(item);
        }else if(item.date.includes('2012')){
            yearArray12.push(item);
        }else if(item.date.includes('2011')){
            yearArray11.push(item);
        }else if(item.date.includes('2010')){
            yearArray10.push(item);
        }else if(item.date.includes('2009')){
            yearArray09.push(item);
        }else if(item.date.includes('2008')){
            yearArray08.push(item);
        }else if(item.date.includes('2007')){
            yearArray07.push(item);
        }else if(item.date.includes('2006')){
            yearArray06.push(item);
        }else if(item.date.includes('2005')){
            yearArray05.push(item);
        }else if(item.date.includes('2004')){
            yearArray04.push(item);
        }else if(item.date.includes('2003')){
            yearArray03.push(item);
        }else if(item.date.includes('2002')){
            yearArray02.push(item);
        }else if(item.date.includes('2001')){
            yearArray01.push(item);
        }
    })
    var array=new Array();
    array.concat(
        yearArray01,
        yearArray02,
        yearArray03,
        yearArray04,
        yearArray05,
        yearArray06,
        yearArray07,
        yearArray08,
        yearArray09,
        yearArray10,
        yearArray11,
        yearArray12,
        yearArray13,
        yearArray14,
        yearArray15,
        yearArray16,
        yearArray17
    );
    // console.log(yearArray17)

    fs.writeFile('./data/result.json', JSON.stringify(yearArray17), 'utf-8', function (err) {
    });


    // console.log('2017',handleDetail(yearArray17))
    // console.log('2016',handleDetail(yearArray16))
    // console.log('2015',handleDetail(yearArray15))
    // console.log('2014',handleDetail(yearArray14))
    // console.log('2013',handleDetail(yearArray13))
    // console.log('2012',handleDetail(yearArray12))
    // console.log('2011',handleDetail(yearArray11))
    // console.log('2010',handleDetail(yearArray10))
    // console.log('2009',handleDetail(yearArray09))
    // console.log('2008',handleDetail(yearArray08))
    // console.log('2007',handleDetail(yearArray07))
    // console.log('2006',handleDetail(yearArray06))
    // console.log('2005',handleDetail(yearArray05))
    // console.log('2004',handleDetail(yearArray04))
    // console.log('2003',handleDetail(yearArray03))
    // console.log('2002',handleDetail(yearArray02))
    // console.log('2001',handleDetail(yearArray01))
}

function handleDetail(data) {
    let obj={},red=0,green=0,rCount=0,gCount=0;
    data.forEach(function (item) {
        if(item.percent>0){
            rCount++;
            red+=item.percent;
        }else if(item.percent<0){
            gCount++;
            green+=item.percent;
        }
    })
    obj.date=data[0].date;
    obj.red=red;
    obj.green=green;
    obj.rCount=rCount;
    obj.gCount=gCount;
    obj.gCount=gCount;
    obj.ratio=(rCount/(gCount+rCount))*100+'%';

    console.log(obj)
}
function handleDetail_year(data) {
    let obj={},red=0,green=0,rCount=0,gCount=0;
    data.forEach(function (item) {
        if(item.percent>0){
            rCount++;
            red+=item.percent;
        }else if(item.percent<0){
            gCount++;
            green+=item.percent;
        }
    })
    obj.date=data[0].date;
    obj.red=red;
    obj.green=green;
    obj.rCount=rCount;
    obj.gCount=gCount;
    obj.gCount=gCount;
    obj.ratio=(rCount/(gCount+rCount))*100+'%';

    console.log(obj)
}




function analysis(code){
    let file = "./data/json/" + code + ".json";
    let data = [];

    try {
        data = JSON.parse(fs.readFileSync(file));
    } catch (err) {
        return null;
    }

    function isRed(obj) {
        return obj.end>obj.begin;
    }




    for(let i=4;i<data.length-10;i++){
        let cur=data[i];
        let prev1=data[i+1]
        let prev2=data[i+2]
        let prev3=data[i+3]
        let prev4=data[i+4]
        let prev5=data[i+5]
        let prev6=data[i+6]
        let prev7=data[i+7]

        if(


            prev3.percent>0
            && prev4.percent<0
            && prev5.percent>0
            && prev1.percent>0
            && prev2.percent<0
            && prev6.percent>0
            && prev7.percent<0
            // && Math.abs(prev3.percent)<0.02
            // && Math.abs(prev4.percent)<0.02
            // && Math.abs(prev5.percent)<0.02
            // && Math.abs(prev2.percent)<0.02
            //     && Math.abs(prev1.percent)<0.045

                && prev1.size<prev2.size

                && prev1.percent>0.02 && prev1.percent<0.04




            && prev1.date.includes(String(year))
            ){
                all++;
                let thePercent=cur.percent
                if(thePercent>0 ){
                    redAmount+=thePercent;
                    redAll++;

                }else{
                    greenAmount+=thePercent;
                    greenAll++;
                }
                money*=(1+thePercent)
                result.push(cur);
        }

    }






}


















/**

 /**
 * 明日预测
 * @param index
 */
function forecast(year) {
    let path="./data/json/week"+year;
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
                let filename=file.substr(0,6);
                let result = forecastDetail(year,filename);
                if(result){
                    realResult.push(filename)
                }
            });

        });

        setTimeout(function () {
            console.log('result:'+realResult)
        },5000)

    });





}


function forecastDetail(year,filename) {
    let file = "./data/json/week"+year+'/' + filename + ".json";
    let dataArray = [];

    try {
        dataArray = JSON.parse(fs.readFileSync(file));
    } catch (err) {
        return null;
    }


    let result = null;
    let length=dataArray.length;
    let prev1=dataArray[length-1]
    let prev2=dataArray[length-2]
    let prev3=dataArray[length-3]
    let prev4=dataArray[length-4]

    function isRed() {
        return prev1.end>prev1.begin && prev2.end>prev2.begin && prev3.end>prev3.begin  && prev4.end>prev4.begin
            && prev1.end>prev2.end && prev2.end>prev3.end && prev3.end>prev4.end
            ;
    }
    function isNotSoRed() {
        return prev1.percent<=percent && prev2.percent<=percent && prev3.percent<=percent;
    }
    function isNotSoBig() {
        return (prev1.size/prev2.size)<size && (prev2.size/prev3.size)<size && (prev3.size/prev4.size)<size  ;
    }

    if(isRed() && isNotSoRed() && isNotSoBig()){
        return true;
    }

    return false;
}



