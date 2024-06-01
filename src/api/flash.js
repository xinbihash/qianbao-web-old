import request from '@/utils/request'

export function getFlashOrderList(data) {
    return request({
        url: 'https://apple.xinbi.com/flash/order',
        method: 'post',
        data
    })
}

export function getFlashRechargeList(data) {
    return request({
        url: 'https://apple.xinbi.com/flash/recharge',
        method: 'post',
        data
    })
}