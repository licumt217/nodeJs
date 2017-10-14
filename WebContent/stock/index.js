/**
 *
 */
var http = require('http');
var path = require('path');
var fs = require('fs');
var request = require('request');

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

                if(filename=='600231'){
                    console.log(todayData);
                    console.log(maxObj)
                }
                // console.log(filename+" "+(todayData.endPrice - maxObj.beginPrice)+" "+((maxObj.endPrice - maxObj.beginPrice) / 1.8))
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
                if (next_1_Data.percent > 0) {
                    revenueArray.push(next_1_Data.percent)
                    continue;
                }
                if (next_2_Data.percent > 0) {
                    revenueArray.push(next_2_Data.percent)
                    continue
                }
                revenueArray.push(next_3_Data.percent)

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

    let myC = 0;
    let upCount = 0;
    let downCount = 0;

    let result = []
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

    fs.readFile('./data/csv/' + fileName + '.csv', function (err, data) {
        if (err) {
            console.log(err.stack);
            return;
        }
        transCsv2Json(data)
    });

    function transCsv2Json(data) {
        data = data.toString();
        let table = [];
        let rows = data.split("\r\n");
        let fileName = '';
        for (let i = 1; i < rows.length - 1; i++) {
            let row = rows[i].split(",");
            let code = String(row[1]).replace("'", '');
            let beginPrice = Number(row[6]);
            let endPrice = Number(row[3]);
            let maxPrice = Number(row[4]);
            let percent = Number(row[9]);
            let size = Number(row[11]);

            if (endPrice !== 0) {
                fileName = code;
                let jsonObj = {
                    code: code,
                    endPrice: endPrice,
                    maxPrice: maxPrice,
                    percent: percent,
                    size: size,
                    beginPrice: beginPrice,
                }

                table.push(jsonObj);
            }
        }

        fs.appendFileSync('./data/json/' + fileName + '.json', JSON.stringify(table), 'utf-8', function (err) {
        });

    }
}








































