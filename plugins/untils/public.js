import {getEmoticon} from '../../service/clientAPI';
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