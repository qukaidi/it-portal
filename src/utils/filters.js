export function numberToZero(value) {
    return value > 9 ? value : "0" + value;
}

export function imgFormat(value) {
    if (!value) return './news_1.png'
    value = value.toString()
    return "/api/image/" + value
}

export function imgGallery(value) {
    if (!value) return ''
    value = value.toString()
    return "/api/image-zip/" + value
}

export function dateFormat(value) {
    return value ? value[0] + "-" + value[1] + "-" + value[2] : ''
}

export function timeFormat(value) {
    return value ? value[0] + "-" + numberToZero(value[1]) + "-" + numberToZero(value[2]) + ' ' + numberToZero(value[3]) + ":" + numberToZero(value[4]) : ''
}

export function noImgFormat(value) {
    return "/api/image/" + value;
}
