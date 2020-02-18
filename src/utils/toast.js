import {Toast} from 'vant';

const durtion = 1000;
const forbidClick = true;
const loadingType = "spinner"

export default function (message, type) {
    Toast({
        duration: durtion,
        forbidClick: forbidClick,
        loadingType: loadingType,
        message: message,
        type: type ? type : 'text'
    });
}
