

import request from '@/utils/request'

export function getDiceOrderList(data) {
    return request({
        url: '/dice/order',
        method: 'post',
        data
    })
}
