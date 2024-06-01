
import request from '@/utils/request'

export function getMineOrderList(data) {
    return request({
        url: '/mine/order',
        method: 'post',
        data
    })
}
