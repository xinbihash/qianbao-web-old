
import request from '@/utils/request'

export function getMineOrderList(data) {
    return request({
        url: 'https://apple.xinbi.com/mine/order',
        method: 'post',
        data
    })
}