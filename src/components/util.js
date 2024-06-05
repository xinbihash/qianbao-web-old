import request from '@/utils/request'

export function handleApi(api, extra) {
  const config = {}
  if (typeof api === 'string') {
    config.url = api
    config.method = 'get'
  } else if (typeof api === 'object') {
    config.method = api.method || 'get'
    config.url = api.url
    if (config.method === 'get') {
      config.params = api.data || {}
    } else {
      config.data = api.data || {}
    }
  } else if (typeof api === 'function') {
    return handleApi(api(), extra)
  }
  if (extra) {
    if (config.method === 'get') {
      config.params = Object.assign(config.params || {}, extra)
    } else {
      config.data = Object.assign(config.data || {}, extra)
    }
  }
  return request(config)
}
