import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('dateFormat', (str, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!str) return ''
  return dayjs(str).format(format)
})
