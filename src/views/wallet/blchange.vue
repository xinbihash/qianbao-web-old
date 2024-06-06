<template>
  <div class="app-container">
    <s-table
      :api="{
        url: '/wallet/blChange',
        method: 'POST',
      }"
      :querys="querys"
      :formatter="formatter"
    >
      <el-table-column
        label="用户ID"
        prop="Uid"
        align="center"
        width="150"
      />
      <el-table-column
        label="用户名"
        prop="Username"
        align="center"
        width="100"
      />
      <el-table-column
        label="用户昵称"
        prop="Nickname"
        align="center"
        width="100"
      />

      <el-table-column
        label="货币"
        prop="CoinType"
        width="100px"
        align="center"
      >
        <template slot-scope="{ row }">
          <el-tag>{{ row.CoinType | coinTypeFilter }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="变化量"
        prop="ChangeBalance"
        width="100"
        align="left"
      />

      <el-table-column
        label="当前值"
        prop="AfterChangeBalance"
        width="100"
        align="left"
      />

      <el-table-column
        label="备注"
        prop="Remark"
        width="300px"
        align="left"
      />

      <el-table-column
        label="创建时间"
        prop="CreatedAt"
        width="200px"
        align="center"
      />

      <el-table-column
        label="更新时间"
        prop="CreatedAt"
        width="200px"
        align="center"
      />
    </s-table>
  </div>
</template>

<script>
import dayjs from 'dayjs'

const coinTypeMap = {
  1: 'usdt',
  2: 'trx',
  3: '彩usdt',
  4: '彩trx'
}

export default {
  name: 'BlChange',
  filters: {
    coinTypeFilter(coinType) {
      return coinTypeMap[coinType]
    }
  },
  data() {
    return {
      querys: [
        {
          field: 'uid',
          title: '用户ID',
          props: {
            placeholder: '用户ID'
          }
        },
        {
          field: 'username',
          title: '用户名',
          props: {
            placeholder: '用户名'
          }
        },
        {
          field: 'coinType',
          title: '类型',
          props: {
            placeholder: '1,2,3,4'
          }
        },
        {
          field: 'date',
          title: '日期',
          type: 'datePicker',
          props: {
            placeholder: '选择日期'
          }
        }
      ]
    }
  },
  methods: {
    formatter(data) {
      if (data.uid) {
        data.uid = Number(data.uid)
      }
      if (data.date) {
        data.date = dayjs(data.date).startOf('day').toISOString()
      }
      return data
    }
  }
}
</script>
