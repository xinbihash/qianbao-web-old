

import request from '@/utils/request'

export function getDiceOrderList(data) {
    return request({
        url: 'https://apple.xinbi.com/dice/order',
        method: 'post',
        data
    })
}
