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
// 处理多个scroll事件
export function addEvent(obj,type,fn){
    if(obj.attachEvent){
        obj.attachEvent('on'+type,function(){
            fn.call(obj);
        })
    }else{
        obj.addEventListener(type,fn,false);
    }
}
// 
let Top = null
export function preventSliding (className) {
    let isOpen = document.body.className === '' ? false : true;
    // if (!isOpen) {
    //     Top = $(window).scrollTop();
    //     document.body.classList.add(className)
    //     $('body').css("top", - Top + "px");
    // } else {
    //     document.body.classList.remove(className)
    //     $('body').removeAttr("style");
    //     $(window).scrollTop(Top);
    // }
}
// 
export function baseUrlRegExp (str='') {
    let reg = RegExp(/\http:\/\//);
    if(str.match(reg)){
        return str
    } else {
        return fileUrl+ str
    }
}
export function scrollToTop() {
    (function smoothscroll(){
        var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo (0,currentScroll - (currentScroll/5));
        }
    })();
}
export function analogJump (href) {
    let hta = document.createElement('a');
    hta.setAttribute('href', href);
    hta.setAttribute('target', '_blank');
    hta.setAttribute('id', 'startTelMedicine');
    // 防止反复添加
    if(document.getElementById('startTelMedicine')) {
        document.body.removeChild(document.getElementById('startTelMedicine'));
    }
    document.body.appendChild(hta);
    hta.click();
}