<template>
  <div v-loading="loading" class="s-table-box">
    <el-card v-if="localQuerys.length" :border="false" class="tw-mb-md query-form">
      <form-create v-model="fapi" :option="queryConfig" :rule="localQuerys" @submit="onSubmit" />
    </el-card>
    <slot name="middle" :data="originData" />
    <el-card :border="false">
      <slot name="table-top" :data="originData" />
      <el-table
        :data="dataSource"
        class="tw-mt-md"
        highlight-hover-row
        size="small"
        border
        stripe
        v-bind="$attrs"
        align="center"
      >
        <slot />
      </el-table>
      <el-row type="flex" justify="end" class="tw-mt-md">
        <el-pagination
          v-if="pageConfig.total > 0"
          v-bind="pageConfig"
          class="tw-mt-md"
          @current-change="pageChange"
          @size-change="sizeChange"
        />
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { handleApi } from '../util'
import waves from '@/directive/waves' // waves directive
import formCreate from '@form-create/element-ui'

const defaultGild = {
  xl: 6,
  lg: 6,
  md: 8,
  sm: 24,
  xs: 24
}

const noColumnProps = ['slotName']
export default {
  components: {
    formCreate: formCreate.$form()
  },
  directives: { waves },
  props: {
    querys: {
      type: Array,
      default: () => []
    },
    api: {
      type: [String, Object],
      required: true
    },
    autoRequest: {
      type: Boolean,
      default: true
    },
    formatter: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      fapi: null,
      originData: {},
      dataSource: [],
      pageConfig: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        layout: 'total, sizes, prev, pager, next, jumper',
        pageSizes: [10, 20, 50, 100, 200, 300, 400]
      }
    }
  },

  computed: {
    queryConfig() {
      const config = {
        resetBtn: true
      }
      return config
    },
    localQuerys() {
      const { querys } = this
      const _querys = querys.map((item) => {
        const _item = {
          ...item,
          style: {
            width: '100%'
          }
        }
        if (!this.isInline) {
          if (!_item.col) {
            _item.col = {
              ...defaultGild
            }
          } else {
            _item.col = Object.assign(
              {
                ...defaultGild
              },
              _item.col
            )
          }
        }
        _item.wrap = Object.assign({
          labelWidth: '80px',
          labelPosition: 'left'
        }, _item.wrap || {})
        return _item
      })
      return _querys
    }
  },
  mounted() {
    if (this.autoRequest) {
      this.loadData()
    }
  },
  methods: {
    fapiFn(name, ...args) {
      if (this.fapi) {
        this.fapi[name](...args)
      }
    },
    filterColumnProps(column) {
      const obj = {}
      Object.keys(column).forEach((key) => {
        if (!noColumnProps.includes(key)) {
          obj[key] = column[key]
        }
      })
      return obj
    },
    loadData() {
      this.loading = true
      const { currentPage: page, pageSize: size } = this.pageConfig
      handleApi(this.api, {
        page,
        size,
        ...this.getParams()
      })
        .then((res) => {
          const data = res.data
          this.originData = data
          if (data) {
            if (Array.isArray(data)) {
              this.dataSource = data
            } else {
              this.dataSource = data.Data
            }
          } else {
            this.dataSource = []
          }
          this.$set(this.pageConfig, 'total', res.total)
          this.$emit('result', data)
        })
        .catch(() => {
          this.dataSource = []
        })
        .finally(() => {
          setTimeout(() => {
            this.loading = false
          }, 300)
        })
    },
    pageChange(page) {
      this.$set(this.pageConfig, 'currentPage', page)
      this.refresh(false)
    },
    sizeChange(size) {
      this.$set(this.pageConfig, 'pageSize', size)
      this.refresh(true)
    },
    getParams() {
      if (this.localQuerys.length) {
        const params = this.fapi.formData()
        if (this.formatter) {
          return this.formatter(params) || params
        }
        return params
      }
      return {}
    },
    refresh(flag = false) {
      if (flag) {
        this.$set(this.pageConfig, 'currentPage', 1)
      }
      this.loadData()
    },
    onSubmit() {
      this.refresh(false)
    },
    clickQuery() {
      this.refresh(true)
    },
    reset() {
      this.fapi.resetFields()
      this.refresh(true)
    }
  }
}
</script>

<style lang="scss" scoped>
.query-form {
  margin-bottom: 10px;
  padding-bottom: 10px;
  ::v-deep .el-card__body {
      padding-bottom: unset !important;
  }
}
.s-table-box {
  ::v-deep .el-form-item {
    display: flex;
    .el-form-item__content {
      flex: 1;
      margin-left: 0px !important;
    }
  }
  ::v-deep .vxe-table--render-default .vxe-cell {
    white-space: unset;
    word-break: break-all;
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
