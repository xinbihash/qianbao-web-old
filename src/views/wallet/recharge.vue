<template>
  <div class="app-container">
    <s-table
      ref="tableRef"
      has-query
      :api="{
        url: '/wallet/recharge',
        method: 'POST',
      }"
      total-field="code"
      :formatter="formatter"
    >
      <template #query="{ model }">
        <el-col v-bind="queryFormGrid">
          <el-form-item label="发送地址">
            <el-input
              v-model="model.fromAddress"
              placeholder="发送地址"
              @keyup.enter.native="$refs.tableRef.refresh(false)"
            />
          </el-form-item></el-col>
        <el-col v-bind="queryFormGrid">
          <el-form-item label="接收地址">
            <el-input
              v-model="model.toAddress"
              placeholder="接收地址"
              @keyup.enter.native="$refs.tableRef.refresh(false)"
            />
          </el-form-item></el-col>
        <el-col v-bind="queryFormGrid">
          <el-form-item label="用户ID">
            <el-input
              v-model="model.uid"
              placeholder="用户ID"
              @keyup.enter.native="$refs.tableRef.refresh(false)"
            />
          </el-form-item></el-col>
        <el-col v-bind="queryFormGrid">
          <el-form-item label="用户名">
            <el-input
              v-model="model.username"
              placeholder="用户名"
              @keyup.enter.native="$refs.tableRef.refresh(false)"
            />
          </el-form-item></el-col>
        <el-col v-bind="queryFormGrid">
          <el-form-item label="hash">
            <el-input
              v-model="model.hash"
              placeholder="充值hash"
              @keyup.enter.native="$refs.tableRef.refresh(false)"
            />
          </el-form-item></el-col>
        <el-col
          v-bind="{
            xs: 24,
            sm: 24,
            md: 12,
            lg: 12,
            xl: 12
          }"
        >
          <el-form-item label="日期">
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
export default {
  name: 'WalletRecharge',
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
    }
  }
}
</script>
