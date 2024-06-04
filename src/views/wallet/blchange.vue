<template>
  <div class="app-container">
    <s-table
      :api="{
        url: '/wallet/blChange',
        method: 'POST',
      }"
      has-query
    >
      <template #query="{ model }">
        <el-col v-bind="queryFormGrid">
          <el-form-item label="用户ID">
            <el-input
              v-model="model.uid"
              placeholder="用户ID"
              @keyup.enter.native="handlerFilter"
            />
          </el-form-item>
        </el-col>
        <el-col v-bind="queryFormGrid">
          <el-form-item label="用户名">
            <el-input
              v-model="model.username"
              placeholder="用户名"
              @keyup.enter.native="handlerFilter"
            />
          </el-form-item>
        </el-col>
        <el-col v-bind="queryFormGrid">
          <el-form-item label="类型">
            <el-input
              v-model="model.coinType"
              placeholder="1,2,3,4"
              @keyup.enter.native="handlerFilter"
            />
          </el-form-item>
        </el-col>
        <el-col v-bind="queryFormGrid">
          <el-form-item label="日期">
            <el-date-picker
              v-model="model.date"
              class="tw-w-full"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
      </template>
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
  }
}
</script>
