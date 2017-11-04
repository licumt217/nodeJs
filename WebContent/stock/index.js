/**
 *
 */
var http = require('http');
var path = require('path');
var fs = require('fs');
var iconv = require('iconv-lite');
var request = require('request');

var csv = require('csv');


// transCsv2Json('600361')
// transCsv2Json('600795')
// transCsv2Json('603089')

// analysis("600606")
// analysis("600361")
// analysis("600795")
// analysis("603089")

// filterResult();
// transAllCsv2Json();

// updateByCode('600361');

// analysisAll();

// validateRuleAll();

// forecast();

// transCsv2Json('silent')

remove()

/**
 * codes文件中移除不存在的codes
 */
function remove() {
    let file = "./data/json/aaa.json";
    let dataArray = JSON.parse(fs.readFileSync(file));

    let newArray=[];
    let theArray=['云JJK789',
        '台Y77771',
        '台T66661',
        '晋TTT999',
        '云T66544',
        '蒙S33444',
        '津W22222',
        '京MN7197',
        '津FTYYUU',
        '京TTTT01',
        '京N92K90',
        '京TTTT02',
        '陕U66621',
        '陕H67676',
        '豫WWWWWW',
        '陕U56K21',
        '川EE666V',
        '京Z12349',
        '京MA7179',
        '辽EEEE51',
        '鲁YY6666',
        '皖TR4545',
        '晋YYY555',
        '京RTTTTTT',
        '贵FFD112',
        '冀UUUUUU',
        '云R33321',
        '云D83332',
        '豫ZXCV12',
        '京FYHHNNN',
        '京111112',
        '陕E12332',
        '冀Q12345',
        '京N252H0',
        '津111112',
        '吉YYYYYYY',
        '桂555555',
        '湘222222',
        '粤TN7777',
        '甘Y66668',
        '甘Y666U2',
        '桂PL0900',
        '京TTT777',
        '晋BTT888',
        '甘WW1111',
        '晋U66666',
        '冀T44546',
        '闽44R445',
        '陕J22221',
        '辽678877',
        '晋666776',
        '鲁R43333',
        '闽U66621',
        '晋FFF123',
        '蒙IIIIOO',
        '鲁R66666',
        '辽OOIIIO',
        '鄂KKKKKK',
        '豫E56788',
        '京YYYY07',
        '青FFD113',
        '陕H33441',
        '京YY7889',
        '吉A77700',
        '川A9XM02',
        '京ERTTYY',
        '蒙TTT222',
        '蒙TTTUUU',
        '京GHHHHH',
        '闽D7865G',
        '蒙F88877',
        '蒙R25282',
        '蒙R89990',
        '湘112222',
        '鄂FD9000',
        '晋AAABBB',
        '晋CD9990',
        '藏000000',
        '京E33444',
        '陕T55321',
        '豫K78787',
        '陕YU6767',
        '吉JJKK00',
        '辽Y88880',
        '豫R11111',
        '辽YY1111',
        '川A99999',
        '晋U66663',
        '贵DD5556',
        '皖PPPPPP',
        '津D33777',
        '蒙A12345',
        '川Q12345']

    console.log('oright length:'+dataArray.length)
    let str='';
    for(let i=0;i<dataArray.length;i++){
        if(!theArray.includes(dataArray[i].data2)){
            newArray.push(dataArray[i])

            // str+=(dataArray[i].data0+',')
            // str+=(dataArray[i].data1+',')
            // str+=(dataArray[i].data2+',')
            // str+=(dataArray[i].data3+',')
            // str+=(dataArray[i].data4+',')
            // str+=(dataArray[i].data5+',')
            // str+=(dataArray[i].data6+',')
            // str+=(dataArray[i].data7+'\\n');






        }
    }

    console.log('newArray length:'+newArray.length)


    var json2csv = require('json2csv');
    var fields = ['data0','data1','data2','data3','data4','data5','data6','data7'];
    var csv = json2csv({ data: newArray, fields: fields });

    fs.writeFile('fffffffffffffffffffffffff.csv', csv, function(err) {
        if (err) throw err;
        console.log('file saved');
    });



    // fs.writeFile('./data/result.csv', JSON.stringify(str), 'utf-8', function (err) {
    // });






}


/**
 * codes文件中移除不存在的codes
 */
function removeUnexistCodes() {
    let file = "./data/codes.json";
    let codesArray = JSON.parse(fs.readFileSync(file));
    console.log('len:' + codesArray.length)
    let realResult = []
    let newArray=[];
    for (let i = 0; i < codesArray.length; i++) {
        let filename=codesArray[i];
        let file = "./data/json/" + filename + ".json";

        try {
            let dataArray = JSON.parse(fs.readFileSync(file));
        } catch (err) {
            continue;
        }
        newArray.push(filename);


    }
    console.log('len:' + newArray.length)
    fs.writeFile('./data/codes.json', JSON.stringify(newArray), 'utf-8', function (err) {
    });
}



/**
 * 明日预测
 * @param index
 */
function forecast(index) {
    if(!index){
        index=0;
    }
    let file = "./data/codes.json";
    let codesArray = JSON.parse(fs.readFileSync(file));
    console.log('len:' + codesArray.length)
    let realResult = []
    for (let i = 0; i < codesArray.length; i++) {
        let result = forecastDetail(codesArray[i],index);
        if(result){
            realResult.push(result)
        }


    }

    console.log("len:"+realResult.length+" "+JSON.stringify(realResult))



}


function forecastDetail(filename,i) {
    let file = "./data/json/" + filename + ".json";
    let dataArray = [];

    try {
        dataArray = JSON.parse(fs.readFileSync(file));
    } catch (err) {
        return null;
    }


    let result = null;

    if(dataArray.length>(12+i)){
        let todayData = dataArray[i];

        let t_11 = dataArray[i + 11]
        let t_10 = dataArray[i + 10]
        let t_9 = dataArray[i + 9]
        let t_8 = dataArray[i + 8]
        let t_7 = dataArray[i + 7]
        let t_6 = dataArray[i + 6]
        let t_5 = dataArray[i + 5]
        let t_4 = dataArray[i + 4]
        let t_3 = dataArray[i + 3]
        let t_2 = dataArray[i + 2]
        let t_1 = dataArray[i + 1]

        let t_array=[t_1,t_2,t_3,t_4,t_5,t_6,t_7,t_8,t_9,t_10,t_11]

        let maxObj = null;
        let upAmount = 7;
        let maxIndex=-1;
        if (t_1.percent > upAmount) {
            maxObj = t_1;
            maxIndex=1;
        } else if (t_2.percent > upAmount) {
            maxObj = t_2;
            maxIndex=2;
        } else if (t_3.percent > upAmount) {
            maxObj = t_3;
            maxIndex=3;
        } else if (t_4.percent > upAmount) {
            maxObj = t_4;
            maxIndex=4;
        } else if (t_5.percent > upAmount) {
            maxObj = t_5;
            maxIndex=5;
        } else if (t_6.percent > upAmount) {
            maxObj = t_6;
            maxIndex=6;
        } else if (t_7.percent > upAmount) {
            maxObj = t_7;
            maxIndex=7;
        } else if (t_8.percent > upAmount) {
            maxObj = t_8;
            maxIndex=8;
        }else if (t_9.percent > upAmount) {
            maxObj = t_9;
            maxIndex=9;
        }else if (t_10.percent > upAmount) {
            maxObj = t_10;
            maxIndex=10;
        }else if (t_11.percent > upAmount) {
            maxObj = t_11;
            maxIndex=11;
        }
        if(maxIndex<3){
            maxObj=null;
        }

        function isAllSizeLess() {
            let result=true;
            for(let i=0;i<maxIndex-1;i++){
                if(t_array[i].size>(maxObj.size*0.8)){
                    result=false;
                    break;
                }
            }
            if((t_array[0]>maxObj.size*0.45)){
                result=false;
            }
            return result;
        }

        function isPriceGood() {
            let result=false;
            let thePrice=t_array[0].endPrice-maxObj.beginPrice;
            let theOldPrice=maxObj.endPrice-maxObj.beginPrice;
            if(Math.abs(t_array[0].percent)<2 && t_array[0].endPrice<maxObj.endPrice && t_array[0].beginPrice>maxObj.beginPrice && (thePrice/theOldPrice)<0.65){
                result=true;
            }
            return result;
        }



        if (maxObj) {


            if (isAllSizeLess() && isPriceGood()) {
                result=filename;
            }
        }
    }

    return result;



}


function validateRuleAll() {
    let file = "./data/codes.json";
    let codesArray = JSON.parse(fs.readFileSync(file));
    console.log('len:' + codesArray.length)
    let money = 10000;
    let allRevenueArray = []
    for (let i = 0; i < codesArray.length; i++) {
        let result = filterAnalysis(codesArray[i]);
        if (result) {
            let dataArray = result.dataArray;
            let targetArray = result.data;
            let revenueArray = []
            for (let j = 0; j < targetArray.length; j++) {
                let target = targetArray[j];
                let targetData = target.data;
                let targetIndex = target.index;
                let next_1_Data = dataArray[targetIndex - 1]
                let next_2_Data = dataArray[targetIndex - 2]
                let next_3_Data = dataArray[targetIndex - 3]
                // if (next_1_Data.percent > 0) {
                //     revenueArray.push(next_1_Data.percent)
                //     continue;
                // }
                // if (next_2_Data.percent > 0) {
                //     revenueArray.push(next_2_Data.percent+next_1_Data.percent)
                //     continue
                // }
                revenueArray.push(next_1_Data.percent)

            }
            allRevenueArray.push(revenueArray)

        }

    }

    console.log('done ok!')

    let count=0;
    let redC=0;
    let redAmount=0;
    let greenC=0;
    let greenAmount=0;
    for(let m=0;m<allRevenueArray.length;m++){
        let array=allRevenueArray[m];
        for(let n=0;n<array.length;n++){
            count++;
            if(array[n]>0){
                redC++;
                redAmount+=array[n]
            }else if(array[n]<0){
                greenC++;
                greenAmount+=array[n]
            }
        }
    }


    console.log("count:"+count+" redCount:"+redC+" "+((redC/count)*100).toFixed(2)+"% greenCount:"+greenC+" "+((greenC/count)*100).toFixed(2)+"%")
    console.log('all Revenue:'+((redAmount+greenAmount)).toFixed(2)+" averageRevenue:"+((redAmount+greenAmount)/count).toFixed(2)+"%")

    fs.writeFile('./data/result.json', JSON.stringify(allRevenueArray), 'utf-8', function (err) {
    });


}


function analysisAll() {
    let file = "./data/codes.json";
    let codesArray = JSON.parse(fs.readFileSync(file));
    console.log('len:' + codesArray.length)
    for (let i = 0; i < codesArray.length; i++) {
        analysis(codesArray[i]);
    }
    console.log('done')
}

function transAllCsv2Json() {
    let file = "./data/codes.json";
    let codesArray = JSON.parse(fs.readFileSync(file));
    console.log('len:' + codesArray.length)
    for (let i = 0; i < codesArray.length; i++) {
        transCsv2Json(codesArray[i]);
    }
    console.log('done')
}


/**
 * 每天收盘后将当天数据更新进入本地数据库中
 * @param code
 */
function updateByCode(code) {
    if (code) {
        let url = ''
        if (code.startsWith('6')) {
            url = 'http://web.juhe.cn:8080/finance/stock/hs?gid=sh' + code + '&key=ddc1c75dee3aeeb8957b2dd3b0ad8b4c'
        } else {
            url = 'http://web.juhe.cn:8080/finance/stock/hs?gid=sz' + code + '&key=ddc1c75dee3aeeb8957b2dd3b0ad8b4c'
        }

        http.get(url, function (res) {
            let resData = "";
            res.on("data", function (data) {
                resData += data;
            });


            res.on("end", function () {
                resData = JSON.parse(resData);
                console.log("done...code:" + code)
                if (resData.resultcode == '200') {

                    let data = resData.result[0].data;
                    let jsonObj = {
                        code: code,
                        endPrice: Number(data.nowPri),
                        maxPrice: Number(data.todayMax),
                        percent: Number(data.increPer),
                        size: Number(data.traNumber),
                        beginPrice: Number(data.todayStartPri),
                    }

                    let file = "./data/json/" + code + ".json";
                    let dataArray = JSON.parse(fs.readFileSync(file));
                    console.log(jsonObj)
                    dataArray.unshift(jsonObj)
                    fs.writeFile('./data/json/' + code + '.json', JSON.stringify(dataArray), 'utf-8', function (err) {
                    });


                }


            });

        }).on('error', function (err) {
            console.log(err);
        });
    }


}


/**
 * 过滤出目标数据
 */
function filterResult() {
    let file = "./data/codes.json";
    let codesArray = JSON.parse(fs.readFileSync(file));
    let resultArray = [];
    for (let i = 0; i < codesArray.length; i++) {
        let code = codesArray[i];
        let tempFileName = "./data/json/" + code + ".json";
        let dataArray = JSON.parse(fs.readFileSync(tempFileName));

        let t_7 = dataArray[i + 7]
        let t_6 = dataArray[i + 6]
        let t_5 = dataArray[i + 5]
        let t_4 = dataArray[i + 4]
        let t_3 = dataArray[i + 3]
        let t_2 = dataArray[i + 2]
        let t_1 = dataArray[i + 1]


        let maxObj = null;
        let upAmount = 5;
        if (t_1.percent > upAmount) {
            maxObj = t_1;
        } else if (t_2.percent > upAmount) {
            maxObj = t_2;
        } else if (t_3.percent > upAmount) {
            maxObj = t_3;
        } else if (t_4.percent > upAmount) {
            maxObj = t_4;
        } else if (t_5.percent > upAmount) {
            maxObj = t_5;
        }


        if (maxObj) {
            if ((todayData.endPrice - maxObj.beginPrice) < ((maxObj.endPrice - maxObj.beginPrice) / 1.8)
                && (todayData.endPrice - maxObj.beginPrice) > ((maxObj.endPrice - maxObj.beginPrice) / 9)
                && todayData.endPrice < maxObj.endPrice
                && isRed(todayData)
            ) {
                resultArray.push(code);
            }
        }
    }

    console.log("=====筛选出结果====== " + JSON.stringify(resultArray))
}

function filterAnalysis(filename) {
    let file = "./data/json/" + filename + ".json";
    let dataArray = [];

    try {
        dataArray = JSON.parse(fs.readFileSync(file));
    } catch (err) {
        // Here you get the error when the file was not found,
        // but you also get any other error
    }


    let all = 0;
    let redC = 0;
    let greenC = 0;
    let balanceC = 0;

    let result = []
    for (let i = 11; i < dataArray.length - 12; i++) {
        all++;

        // console.log(i)
        let todayData = dataArray[i];

        if (todayData.percent > 0) {
            redC++;
        } else if (todayData.percent < 0) {
            greenC++;
        } else {
            balanceC++;
        }

        let t_11 = dataArray[i + 11]
        let t_10 = dataArray[i + 10]
        let t_9 = dataArray[i + 9]
        let t_8 = dataArray[i + 8]
        let t_7 = dataArray[i + 7]
        let t_6 = dataArray[i + 6]
        let t_5 = dataArray[i + 5]
        let t_4 = dataArray[i + 4]
        let t_3 = dataArray[i + 3]
        let t_2 = dataArray[i + 2]
        let t_1 = dataArray[i + 1]

        let t_array=[t_1,t_2,t_3,t_4,t_5,t_6,t_7,t_8,t_9,t_10,t_11]

        let maxObj = null;
        let upAmount = 7;
        let maxIndex=-1;
        if (t_1.percent > upAmount) {
            maxObj = t_1;
            maxIndex=1;
        } else if (t_2.percent > upAmount) {
            maxObj = t_2;
            maxIndex=2;
        } else if (t_3.percent > upAmount) {
            maxObj = t_3;
            maxIndex=3;
        } else if (t_4.percent > upAmount) {
            maxObj = t_4;
            maxIndex=4;
        } else if (t_5.percent > upAmount) {
            maxObj = t_5;
            maxIndex=5;
        } else if (t_6.percent > upAmount) {
            maxObj = t_6;
            maxIndex=6;
        } else if (t_7.percent > upAmount) {
            maxObj = t_7;
            maxIndex=7;
        } else if (t_8.percent > upAmount) {
            maxObj = t_8;
            maxIndex=8;
        }else if (t_9.percent > upAmount) {
            maxObj = t_9;
            maxIndex=9;
        }else if (t_10.percent > upAmount) {
            maxObj = t_10;
            maxIndex=10;
        }else if (t_11.percent > upAmount) {
            maxObj = t_11;
            maxIndex=11;
        }
        if(maxIndex<3){
            maxObj=null;
        }

        function isAllSizeLess() {
            let result=true;
            for(let i=0;i<maxIndex-1;i++){
                if(t_array[i].size>(maxObj.size*0.8)){
                    result=false;
                    break;
                }
            }
            if((t_array[1]>maxObj.size*0.45)){
                result=false;
            }
            return result;
        }

        function isPriceGood() {
            let result=false;
            let thePrice=t_array[1].endPrice-maxObj.beginPrice;
            let theOldPrice=maxObj.endPrice-maxObj.beginPrice;
            if(Math.abs(t_array[1].percent)<2 && t_array[1].endPrice<maxObj.endPrice && t_array[1].beginPrice>maxObj.beginPrice && (thePrice/theOldPrice)<0.65){
                result=true;
            }
            return result;
        }



        if (maxObj) {


            if(isAllSizeLess()){
                console.log("..................")
            }

            if (isAllSizeLess() && isPriceGood()) {
                result.push({
                    data: todayData,
                    index: i
                })
            }
        }


    }
    // console.log('[base] all:'+all+" red:"+redC+" green:"+greenC+" "+((redC/all)*100).toFixed(2)+"% "+((greenC/all)*100).toFixed(2)+"% ")

    // console.log('[my] myC:'+myC+" red:"+upCount+" green:"+downCount+" "+((upCount/myC)*100).toFixed(2)+"% "+((downCount/myC)*100).toFixed(2)+"% ")


    if(result.length>0){
        return {
            dataArray: dataArray,
            data: result
        }
    }else{
        return null;
    }



}

function analysis(filename) {
    let file = "./data/json/" + filename + ".json";
    let dataArray = [];

    try {
        dataArray = JSON.parse(fs.readFileSync(file));
    } catch (err) {
        // Here you get the error when the file was not found,
        // but you also get any other error
    }


    let all = 0;
    let redC = 0;
    let greenC = 0;
    let balanceC = 0;

    let myC = 0;
    let upCount = 0;
    let downCount = 0;


    for (let i = 11; i < dataArray.length - 12; i++) {
        all++;


        let todayData = dataArray[i];
        let nextData = dataArray[i - 1];
        let prevData = dataArray[i + 1];
        let liangbi = todayData.size / prevData.size;

        if (todayData.percent > 0) {
            redC++;
        } else if (todayData.percent < 0) {
            greenC++;
        } else {
            balanceC++;
        }

        let t_11 = dataArray[i + 11]
        let t_10 = dataArray[i + 10]
        let t_9 = dataArray[i + 9]
        let t_8 = dataArray[i + 8]
        let t_7 = dataArray[i + 7]
        let t_6 = dataArray[i + 6]
        let t_5 = dataArray[i + 5]
        let t_4 = dataArray[i + 4]
        let t_3 = dataArray[i + 3]
        let t_2 = dataArray[i + 2]
        let t_1 = dataArray[i + 1]

        let t_n_1 = dataArray[i - 1];
        let t_n_2 = dataArray[i - 2];
        let t_n_3 = dataArray[i - 3];
        let t_n_4 = dataArray[i - 4];
        let t_n_5 = dataArray[i - 5];
        let t_n_6 = dataArray[i - 6];
        let t_n_7 = dataArray[i - 7];


        let maxObj = null;
        let upAmount = 5;
        if (t_1.percent > upAmount) {
            maxObj = t_1;
        } else if (t_2.percent > upAmount) {
            maxObj = t_2;
        } else if (t_3.percent > upAmount) {
            maxObj = t_3;
        } else if (t_4.percent > upAmount) {
            maxObj = t_4;
        } else if (t_5.percent > upAmount) {
            maxObj = t_5;
        } else if (t_6.percent > upAmount) {
            maxObj = t_6;
        } else if (t_7.percent > upAmount) {
            maxObj = t_7;
        } else if (t_8.percent > upAmount) {
            maxObj = t_8;
        } else if (t_9.percent > upAmount) {
            maxObj = t_9;
        } else if (t_10.percent > upAmount) {
            maxObj = t_10;
        } else if (t_11.percent > upAmount) {
            maxObj = t_11;
        }


        if (maxObj) {

            if ((todayData.endPrice - maxObj.beginPrice) < ((maxObj.endPrice - maxObj.beginPrice) / 1.8)
                && (todayData.endPrice - maxObj.beginPrice) > ((maxObj.endPrice - maxObj.beginPrice) / 9)
                && todayData.endPrice < maxObj.endPrice
                && isRed(todayData)
            ) {
                myC++;
                let rate = 0.001;
                if (
                    (t_n_1.percent > 0 && (t_n_1.endPrice - todayData.endPrice) / todayData.endPrice > rate) ||
                    (t_n_2.percent > 0 && (t_n_2.endPrice - todayData.endPrice) / todayData.endPrice > rate) ||
                    (t_n_3.percent > 0 && (t_n_3.endPrice - todayData.endPrice) / todayData.endPrice > rate)

                ) {
                    upCount++;
                } else {
                    downCount++;
                }
            }
        }


    }
    // console.log('[base] all:'+all+" red:"+redC+" green:"+greenC+" "+((redC/all)*100).toFixed(2)+"% "+((greenC/all)*100).toFixed(2)+"% ")

    // console.log('[my] myC:'+myC+" red:"+upCount+" green:"+downCount+" "+((upCount/myC)*100).toFixed(2)+"% "+((downCount/myC)*100).toFixed(2)+"% ")

    if ((upCount != 0 || downCount != 0) && (upCount + downCount) > 9) {
        console.log('fileName:' + filename + '===> allCount:' + myC + "___" + ((myC / all) * 100).toFixed(2) + "% " + " red:" + upCount + " green:" + downCount + " " + ((upCount / myC) * 100).toFixed(2) + "% " + ((downCount / myC) * 100).toFixed(2) + "% ")

    }


}


/**
 * 给定数据是否红盘
 * @param data
 * @returns {boolean}
 */
function isRed(data) {
    return data.endPrice > data.beginPrice
}

/**
 * 给定数据是否绿盘
 * @param data
 * @returns {boolean}
 */
function isGreen(data) {
    return data.endPrice < data.beginPrice
}


/**
 * 将csv转为json文件
 * @param fileName
 */
function transCsv2Json(fileName) {

    fs.readFile('./data/csv/' + fileName + '.csv', {encoding:'binary'},function (err, data) {
        if (err) {
            console.log(err.stack);
            return;
        }
        transCsv2Json(data)
    });




    function getZh(val) {
        var buf = new Buffer(val, 'binary');

        var str = iconv.decode(buf, 'GBK');
        return str;
    }

    function transCsv2Json(data) {
        data = data.toString();
        let table = [];
        let rows = data.split("\r\n");
        let fileName = '';
        for (let i = 1; i < rows.length - 1; i++) {
            let row = rows[i].split(",");



            let data0 = getZh(row[0]);
            let data1 = getZh(row[1]);
            let data2 = getZh(row[2]);
            let data3 = getZh(row[3]);
            let data4 = getZh(row[4]);
            let data5 = getZh(row[5]);
            let data6 = getZh(row[6]);
            let data7 = getZh(row[7]);

            console.log(data1)
            console.log(data2)
            console.log(data3)


                let jsonObj = {
                    data0: data0,
                    data1: data1,
                    data2: data2,
                    data3: data3,
                    data4: data4,
                    data5: data5,
                    data6: data6,
                    data7: data7,
                }

                table.push(jsonObj);
        }

        fs.appendFileSync('./data/json/aaa.json', JSON.stringify(table), 'utf-8', function (err) {
        });

    }
}












































