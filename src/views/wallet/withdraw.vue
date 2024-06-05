<template>

  <div class="app-container">
    <s-table
      ref="tableRef"
      :api="{
        url: '/wallet/withdraw',
        method: 'POST'
      }"
      has-query
    >
      <template #query="{model}">
        <el-col v-bind="queryFormGrid">
          <el-form-item prop="uid" label="用户id">
            <el-input
              v-model="model.uid"
              placeholder="用户id"
              @keyup.enter.native="handlerFilter"
            />
          </el-form-item>
        </el-col>
        <el-col v-bind="queryFormGrid">
          <el-form-item prop="username" label="用户id">
            <el-input
              v-model="model.username"
              placeholder="用户名"
              @keyup.enter.native="handlerFilter"
            />
          </el-form-item>
        </el-col>
        <el-col
          v-bind="{
            xs: 24,
            sm: 24,
            md: 12,
            lg: 12,
            xl: 12
          }"
        >
          <el-form-item prop="rangeTime" label="用户id">
            <el-date-picker
              v-model="model.rangeTime"
              type="datetimerange"
              class="tw-w-full"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
        </el-col>
      </template>
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

    </s-table></div>

</template>

<script>

export default ({
  name: 'WalletRecharge',
  data() {
    return {
      UsdtCnt: 0,
      TrxCnt: 0,
      UsdtSum: 0,
      TrxSum: 0,
      UsdtFeeSum: 0,
      TrxFeeSum: 0,
      UsdtRealSum: 0,
      TrxRealSum: 0,
      downloadLoading: false
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
      return _model
    },
    handlerFilter() {
      this.$refs.tableRef.refresh()
    }

  }

})
</script>
