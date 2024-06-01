import request from '@/utils/request'

export function getFlashOrderList(data) {
    return request({
        url: '/flash/order',
        method: 'post',
        data
    })
}

export function getFlashRechargeList(data) {
    return request({
        url: '/flash/recharge',
        method: 'post',
        data
    })
}
