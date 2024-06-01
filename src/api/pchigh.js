

import request from '@/utils/request'

export function getPcHighOrderList(data) {
    return request({
        url: '/pcHigh/order',
        method: 'post',
        data
    })
}


export function getPcHighGroupAll(data) {
    return request({
        url: '/pcHigh/groupAll',
        method: 'post',
        data
    })
}
export function getPcHighGroupDay(data) {
    return request({
        url: '/pcHigh/groupDay',
        method: 'post',
        data
    })
}

export function getPcGroupOverView(data) {
    return request({
        url: '/pcHigh/group/overview',
        method: 'post',
        data
    })
}
