<template>
  <div v-loading="loading" class="s-table-box">
    <el-card v-if="hasQuery" :border="false" class="query-form">
      <el-form ref="formRef" label-width="70px" :model="model">
        <el-row :gutter="10">
          <slot name="query" :model="model" />
          <el-col v-bind="queryFormGrid" style="text-align: right">
            <el-button
              v-if="showQuery"
              v-waves
              type="primary"
              icon="el-icon-search"
              @click="refresh(false)"
            >查询</el-button>
            <el-button
              v-if="showReset"
              v-waves
              icon="el-icon-refresh"
              @click="reset"
            >重置</el-button>
          </el-col>
        </el-row>
      </el-form>
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

const noColumnProps = ['slotName']
export default {
  directives: { waves },
  props: {
    hasQuery: {
      type: Boolean,
      default: false
    },
    showQuery: {
      type: Boolean,
      default: true
    },
    showReset: {
      type: Boolean,
      default: true
    },
    api: [String, Object],
    autoRequest: {
      type: Boolean,
      default: true
    },
    formatter: Function
  },
  data() {
    return {
      loading: false,
      originData: {},
      dataSource: [],
      model: {},
      pageConfig: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        layout: 'total, sizes, prev, pager, next, jumper',
        pageSizes: [10, 20, 50, 100, 200, 300, 400]
      }
    }
  },
  mounted() {
    if (this.autoRequest) {
      this.loadData()
    }
  },
  methods: {
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
      let params = this.model
      if (this.formatter) {
        params = this.formatter(params) || params
      }
      return params
    },
    refresh(flag = false) {
      if (flag) {
        this.$set(this.pageConfig, 'currentPage', 1)
      }
      this.loadData()
    },
    reset() {
      this.$refs.formRef.resetFields()
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
</style>
