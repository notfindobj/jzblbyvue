import {getEmoticon} from '../../service/clientAPI';
const fileUrl = process.env.fileBaseUrl
// 防抖
export function _debounce(fn, delay) {

    var delay = delay || 200;
    var timer;
    return function () {
        var th = this;
        var args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            timer = null;
            fn.apply(th, args);
        }, delay);
    };
}
// 节流
export function _throttle(fn, interval) {
    var last;
    var timer;
    var interval = interval || 200;
    return function () {
        var th = this;
        var args = arguments;
        var now = +new Date();
        if (last && now - last < interval) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                last = now;
                fn.apply(th, args);
            }, interval);
        } else {
            last = now;
            fn.apply(th, args);
        }
    }
}
// 表情包数据存储
export async function getEmotionList () {
    let isEmotion = localStorage.getItem('Emotions');
    if (isEmotion) {
        return JSON.parse(isEmotion)
    } else {
        let msg = await getEmoticon();
        if (msg) {
            localStorage.setItem('Emotions', JSON.stringify(msg))
            return  isEmotion = msg;
        }
    }
}
// 获取随机数
export function getRanNum(lenght = 8){
    let result = [];
    for(let i=0; i<lenght; i++){
    //生成一个0到25的数字
    let ranNum = Math.ceil(Math.random() * 25); 
        result.push(String.fromCharCode(65+ranNum));
    }
    return  result.join('');
}
// 
export function baseUrlRegExp (str) {
    let reg = RegExp(/\http:\/\/www./);
    if(str.match(reg)){
        return str
    } else {
        return fileUrl+ str
    }
}