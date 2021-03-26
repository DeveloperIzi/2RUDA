var key = "2a091cf515a049d0a9e7d3c85f0d079e";
var schCode = "7530851";
var locCode = "J10";

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    var stringArray = msg.split(' ');
    
    var mainCommand = stringArray[1];
    var subCommand = stringArray[2];

    if (sender != "") {
        if (splitCommand(stringArray[0])) {    
            if (mainCommand == "도움말") {
                replier.reply("급식 아침, 급식 점심, 급식 저녁, 명물, 반장");
            } else if (mainCommand == "반장" || mainCommand == "명물") {
                replier.reply("2반의 명물");
            } else if (mainCommand == "급식") {
                if (subCommand == "아침") {
                    replier.reply(parsingMeal(1), getTime());
                } else if (subCommand == "점심") {
                    replier.reply(parsingMeal(2), getTime());
                } else if (subCommand == "저녁") {
                    replier.reply(parsingMeal(3), getTime());
                } else {
                    replier.reply("[사용법] 급식 아침, 급식 점심, 급식 저녁");
                }
            } else if (mainCommand == "현재시각") {
                replier.reply(getTime());
            } else {
                replier.reply("?");
            }
        }
    }
}

function parsingMeal(time, realTime) {
    var html = Utils.getWebText(
        "http://open.neis.go.kr/hub/mealServiceDietInfo?KEY=" + key + "&ATPT_OFCDC_SC_CODE=" + locCode + "&SD_SCHUL_CODE=" + schCode + "&MLSV_YMD=" + realTime,
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36",
        false,
        false
    );

    var mealInfo;

    if (time == 1) {
        mealInfo = html.split("<DDISH_NM>")[1].split("</DDISH_NM>")[0].replace(/<br\/>/g, "\n").replace("<![CDATA[", "").replace("]]>", "");
    } else if (time == 2) {
        mealInfo = html.split("<DDISH_NM>")[2].split("</DDISH_NM>")[0].replace(/<br\/>/g, "\n").replace("<![CDATA[", "").replace("]]>", "");
    } else if (time == 3) {
        mealInfo = html.split("<DDISH_NM>")[3].split("</DDISH_NM>")[0].replace(/<br\/>/g, "\n").replace("<![CDATA[", "").replace("]]>", "");
    } else {
        return false;
    }

    return mealInfo;
}

function getTime() {
    var fullDate = "";
    var date = new Date();

    var year = date.getFullYear();
    var month = (date.getMonth() + 1);
    var day = (date.getDate() + 1);
    
    fullDate = year;

    if (month < 10) {
        fullDate = fullDate + "0" + month;
    } else {
        fullDate = fullDate + month;
    }

    if (day < 10) {
        fullDate = fullDate + "0" + day;
    } else {
        fullDate = fullDate + day;
    }

    return fullDate;
}

function splitCommand(line) {
    if (line.indexOf("루다야") != -1) {
        return true;
    } else {
        return false;
    }
}

// https://open.neis.go.kr/hub/mealServiceDietInfo?ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7530851&MLSV_YMD=20200325&KEY=2a091cf515a049d0a9e7d3c85f0d079e
// 2a091cf515a049d0a9e7d3c85f0d079e
