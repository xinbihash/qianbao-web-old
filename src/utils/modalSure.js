import request from './request'
export default function modalSure(delfromData) {
  return new Promise((resolve, reject) => {
    if (!delfromData.info) {
      delfromData.info = ''
    }
    const h = this.$createElement
    this.$msgbox({
      title: '提示',
      message: h('p', null, [h('div', null, `确定要${delfromData.title}吗？`), h('div', null, `${delfromData.info}`)]),
      showCancelButton: true,
      cancelButtonText: '取消',
      confirmButtonText: '确定',
      iconClass: 'el-icon-warning',
      confirmButtonClass: 'btn-custom-cancel'
    })
      .then(() => {
        if (delfromData.success) {
          delfromData.success
            .then((res) => {
              resolve(res)
            })
            .catch((res) => {
              reject(res)
            })
        } else {
          request(delfromData.api)
            .then((res) => {
              resolve(res)
            })
            .catch((res) => {
              reject(res)
            })
        }
      })
      .catch(() => {})
  })
}
