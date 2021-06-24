export const formatDate = (value) => {
    let date = value;
    let y = date.getFullYear(),m = date.getMonth() + 1,d = date.getDate(),hh = date.getHours(),mm = date.getMinutes(),ss = date.getSeconds();
    if (m >= 1 && m <= 9) {
        m = "0" + m;
    }
    if (d >= 0 && d <= 9) {
        d = "0" + d;
    }
    if(hh >= 0 && hh <= 9) {
        hh = "0" + hh
    }
    if(mm >= 0 && mm <= 9) {
        mm = "0" + mm
    }
    if(ss >= 0 && ss <= 9) {
        ss = "0" + ss
    }
    return y+'-'+m+'-'+d+ ' ' + hh+':'+mm+':'+ss
}
/**
 * 时间戳转日期13
 */
export const longToDate = (long) => {
    if(!long){
        return;
    }
    let date = new Date(long);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate();
    let hh = date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours() + ':';
    let mm = date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes() + ':';
    let ss = date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds();
    return Y+M+D+ ' '+hh+mm+ss
}


/**
 * 时间戳转日期10
 */
export const longToDate_10 = (long) => {
    if(!long){
        return;
    }
    let date = new Date(long * 1000);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate();
    let hh = date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours() + ':';
    let mm = date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes() + ':';
    let ss = date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds();
    return Y+M+D+ ' '+hh+mm+ss
}

// 当天日期
export const getNowFormatDate= () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    let weekDay = date.getDay()
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    let currentdate = year + '-' + month + '-' + strDate;
    return {
        currentdate,
        weekDay
    };
}

// 格式化周
export const formatWeekDay = (val) => {
    switch(val) {
        case 0 :
            return "星期日";
        case 1 :
            return "星期一";
        case 2 :
        return "星期二"; 
        case 3 :
        return "星期三"; 
        case 4 :
        return "星期四"; 
        case 5 :
        return "星期五"; 
        case 6 :
        return "星期六";    

    }
}

