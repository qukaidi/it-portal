import request from "@/utils/axios"

export function fetchOne(id) {
    return request({
        url: `/api/gallery/user/${id}`,
        method: 'GET'
    })
}

export function fetchList(data) {
    return request({
        url: '/api/gallery',
        method: 'get',
        params: data
    })
}

export function addStar(data) {
    return request({
        url: '/api/userGalleryStar',
        method: 'post',
        data
    })
}

export function deleteStar(id) {
    return request({
        url: `/api/userGalleryStar?gallery_id=${id}`,
        method: 'delete'
    })
}

export function fetchListByQuery(data) {
    return request({
        url: '/api/gallery/search_list',
        method: 'get',
        params: data
    })
}

