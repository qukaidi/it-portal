import request from "@/utils/axios"

export function fetchOne(id) {
    return request({
        url: `/api/article/${id}`,
        method: 'GET'
    })
}

export function fetchList(data) {
    return request({
        url: '/api/article/list',
        method: 'get',
        params: data
    })
}

export function fetchMainList() {
    return request({
        url: '/api/article/main_list',
        method: 'get'
    })
}

export function fetchCommentList(id) {
    return request({
        url: `/api/article_comment?article_id=${id}`,
        method: 'GET'
    })
}

export function addComment(data) {
    return request({
        url: '/api/article_comment',
        method: 'post',
        data
    })
}

export function addStar(data) {
    return request({
        url: '/api/userArticleStar',
        method: 'post',
        data
    })
}

export function deleteStar(id) {
    return request({
        url: `/api/userArticleStar?article_id=${id}`,
        method: 'delete'
    })
}

export function fetchListByQuery(data) {
    return request({
        url: '/api/article/search_list',
        method: 'get',
        params: data
    })
}

