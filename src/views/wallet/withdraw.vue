<template>

  <div class="app-container">
    <s-table
      ref="tableRef"
      :api="{
        url: '/wallet/withdraw',
        method: 'POST'
      }"
      :querys="querys"
      :formatter="formatter"
    >
      <template #middle="{ data }">
        <el-card class="tw-mb-md">
          <template #header>
            <el-descriptions title="USDT">
              <el-descriptions-item label="次数">{{ data.UsdtCnt }}</el-descriptions-item>
              <el-descriptions-item label="总额">
                <el-statistic
                  group-separator=","
                  :precision="0"
                  :value="data.UsdtSum"
                />
              </el-descriptions-item>
              <el-descriptions-item label="手续费">
                <el-statistic
                  group-separator=","
                  :precision="0"
                  :value="data.UsdtFeeSum"
                />
              </el-descriptions-item>
              <el-descriptions-item label="实际总额">
                <el-statistic
                  group-separator=","
                  :precision="0"
                  :value="data.UsdtRealSum"
                />
              </el-descriptions-item>
            </el-descriptions>
          </template>
          <el-descriptions title="TRX" class="tw-mt-md">
            <el-descriptions-item label="次数">{{ data.TrxCnt }}</el-descriptions-item>
            <el-descriptions-item label="总额">
              <el-statistic
                group-separator=","
                :precision="0"
                :value="data.TrxSum"
              />
            </el-descriptions-item>
            <el-descriptions-item label="手续费">
              <el-statistic
                group-separator=","
                :precision="0"
                :value="data.TrxFeeSum"
              />
            </el-descriptions-item>
            <el-descriptions-item label="实际总额">
              <el-statistic
                group-separator=","
                :precision="0"
                :value="data.TrxRealSum"
              />
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </template>
      <el-table-column label="ID" prop="ID" width="60" show-overflow-tooltip />
      <el-table-column label="用户ID" prop="id" width="150" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.Uid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="100" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.Username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户昵称" width="100" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.Nickname }}</span>
        </template>
      </el-table-column>

      <el-table-column label="提现金额" width="100">
        <template slot-scope="{row}">
          <span>{{ row.CoinName }} {{ row.CoinCount }} </span>
        </template>
      </el-table-column>

      <el-table-column label="提现手续费" width="100">
        <template slot-scope="{row}">
          <span>{{ row.CoinName }} {{ row.CoinFee }} </span>
        </template>
      </el-table-column>

      <el-table-column label="到账金额" width="100">
        <template slot-scope="{row}">
          <span>{{ row.CoinName }} {{ row.CoinRelCount }} </span>
        </template>
      </el-table-column>

      <el-table-column label="提现地址" show-overflow-tooltip prop="Address" />
      <el-table-column label="审批人id" show-overflow-tooltip prop="ApprovalUid" />
      <el-table-column label="审批时间" width="150px">
        <template slot-scope="{row}">
          <span>{{ row.ApprovalTime | dateFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="150px">
        <template slot-scope="{row}">
          <span>{{ row.CreatedAt | dateFormat }}</span>
        </template>
      </el-table-column>
    </s-table>
  </div>

</template>

<script>
import { rangePickerOption } from '@/utils'

export default ({
  name: 'WalletRecharge',
  data() {
    return {
      querys: [
        {
          field: 'uid',
          title: '用户id',
          props: {
            placeholder: '用户id'
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
          field: 'rangeTime',
          title: '日期',
          type: 'el-date-picker',
          props: {
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期',
            rangeSeparator: '至',
            type: 'daterange',
            pickerOptions: rangePickerOption()
          },
          col: {
            xl: 8,
            lg: 9,
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
        _model.fromTime = _model.rangeTime[0]
        _model.toTime = _model.rangeTime[1]
      }
      if (_model.uid) {
        _model.uid = Number(_model.uid)
      }
      return _model
    },
    handlerFilter() {
      this.$refs.tableRef.refresh()
    }
  }
})
</script>
