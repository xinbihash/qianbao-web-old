<template>
  <div class="app-container">
    <s-table
      ref="tableRef"
      :api="{
        url: '/wallet/recharge',
        method: 'POST',
      }"
      :querys="querys"
      :formatter="formatter"
    >
      <template #table-top="{ data }">
        <el-row type="flex">
          <el-row type="flex" align="middle">
            <span class="tw-font-bold tw-text-xl">usdt</span>
            <el-statistic
              group-separator=","
              prefix="（"
              suffix="）"
              :precision="0"
              :value="data.UsdtCnt"
            />
            <el-statistic
              group-separator=","
              :precision="6"
              :value="data.UsdtSum"
            />
          </el-row>
          <el-row type="flex" align="middle" class="tw-ml-2xl">
            <span class="tw-font-bold tw-text-xl">trx</span>
            <el-statistic
              group-separator=","
              prefix="（"
              suffix="）"
              :precision="0"
              :value="data.TrxCnt"
            />
            <el-statistic
              group-separator=","
              :precision="6"
              :value="data.TrxSum"
            />
          </el-row>
        </el-row>
      </template>
      <el-table-column
        label="ID"
        prop="ID"
        width="70"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span>{{ row.ID }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="发送地址"
        prop="FromAddress"
        show-overflow-tooltip
      />
      <el-table-column
        label="接收地址"
        prop="ToAddress"
        show-overflow-tooltip
      />
      <el-table-column label="用户id" prop="Uid" width="100" />
      <el-table-column
        show-overflow-tooltip
        label="用户名"
        prop="Username"
        width="100"
      />
      <el-table-column
        show-overflow-tooltip
        label="用户昵称"
        prop="Nickname"
        width="100"
      />

      <el-table-column
        show-overflow-tooltip
        label="转账金额"
        prop="Amount"
        width="100"
      >
        <template slot-scope="{ row }">
          <span>{{ row.Amount / 1000000 }} {{ row.CoinSymbol }}</span>
        </template>
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        label="交易hash"
        prop="TxHash"
      />

      <el-table-column
        show-overflow-tooltip
        label="块高"
        prop="BlockNum"
        width="100"
      />

      <el-table-column
        show-overflow-tooltip
        label="创建时间"
        prop="CreatedAt"
        width="150"
      >
        <template #default="{row}">
          {{ row.CreatedAt | dateFormat }}
        </template>
      </el-table-column>
    </s-table>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { rangePickerOption } from '@/utils'

export default {
  name: 'WalletRecharge',
  data() {
    return {
      querys: [
        {
          field: 'fromAddress',
          title: '发送地址',
          props: {
            placeholder: '发送地址'
          }
        },
        {
          field: 'toAddress',
          title: '接收地址',
          props: {
            placeholder: '接收地址'
          }
        },
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
          field: 'hash',
          title: 'hash',
          props: {
            placeholder: 'hash'
          }
        },
        {
          field: 'rangeTime',
          title: '日期',
          type: 'datePicker',
          props: {
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期',
            rangeSeparator: '至',
            type: 'daterange',
            pickerOptions: rangePickerOption()
          },
          col: {
            xl: 9,
            lg: 10,
            md: 12,
            sm: 24,
            xs: 24
          }
        }
      ]
    }
  },
  methods: {
    formatter(model) {
      const _model = {
        ...model
      }
      if (_model.rangeTime != null && _model.rangeTime.length) {
        _model.fromTime = dayjs(_model.rangeTime[0]).toISOString()
        _model.toTime = dayjs(_model.rangeTime[1]).toISOString()
      }
      if (_model.uid) {
        _model.uid = Number(_model.uid)
      }
      return _model
    }
  }
}
</script>
