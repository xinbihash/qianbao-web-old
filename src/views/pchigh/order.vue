<template>
    <div class="app-container">
      <s-table
        ref="tableRef"
        :api="{
          url: '/pcHigh/order',
          method: 'POST',
        }"
        has-query
      >
        <template #query="{ model }">
          <el-col v-bind="queryFormGrid">
            <el-form-item label="群ID" prop="gid">
              <el-input
                v-model="model.gid"
                placeholder="群ID"
                @keyup.enter.native="handlerFilter"
              />
            </el-form-item>
          </el-col>
          <el-col v-bind="queryFormGrid">
            <el-form-item label="用户ID" prop="uid">
              <el-input
                v-model="model.uid"
                placeholder="用户ID"
                @keyup.enter.native="handlerFilter"
              />
            </el-form-item>
          </el-col>
          <el-col v-bind="queryFormGrid">
            <el-form-item label="用户名" prop="username">
              <el-input
                v-model="model.username"
                placeholder="用户名"
                @keyup.enter.native="handlerFilter"
              /></el-form-item>
          </el-col>
          <el-col v-bind="queryFormGrid">
            <el-form-item label="期号" prop="drawNum">
              <el-input
                v-model="model.drawNum"
                placeholder="期号"
                @keyup.enter.native="handlerFilter"
              /></el-form-item>
          </el-col>
          <el-col v-bind="queryFormGrid">
            <el-form-item label="订单号" prop="id">
              <el-input
                v-model="model.id"
                placeholder="订单号"
                @keyup.enter.native="handlerFilter"
              /></el-form-item>
          </el-col>
          <el-col v-bind="queryFormGrid">
            <el-form-item label="游戏类型" prop="gameType">
              <Select
                v-model="model.gameType"
                placeholder="游戏类型"
                class="tw-w-full"
                :options="gameOptions"
                :default-value="2"
                @change="handlerFilter"
              /></el-form-item>
          </el-col>
          <el-col v-bind="queryFormGrid">
            <el-form-item label="订单状态" prop="status">
              <Select
                v-model="model.status"
                placeholder="订单状态"
                class="tw-w-full"
                :options="statusOptions"
                @change="handlerFilter"
              /></el-form-item>
          </el-col>
          <el-col v-bind="queryFormGrid">
            <el-form-item label="是否私聊" prop="isPrivate">
              <Select
                v-model="model.isPrivate"
                placeholder="是否私聊"
                class="tw-w-full"
                :options="privateOptions"
                @change="handlerFilter"
              /></el-form-item>
          </el-col>
        </template>
        <el-table-column
          label="订单号"
          prop="Id"
          show-overflow-tooltip
        />
  
        <el-table-column
          label="群ID"
          prop="GroupId"
          show-overflow-tooltip
        />
  
        <el-table-column
          label="群主ID"
          prop="OwnerId"
          show-overflow-tooltip
        />
  
        <el-table-column
          label="玩家ID"
          prop="Uid"
          show-overflow-tooltip
        />
  
        <el-table-column
          label="玩家名"
          prop="Username"
          show-overflow-tooltip
          width="100"
        />
        <el-table-column
          label="玩家昵称"
          prop="Nickname"
          show-overflow-tooltip
          width="100"
        />
  
        <el-table-column
          label="当前期数"
          prop="DrawNum"
          show-overflow-tooltip
          width="100"
        />
  
        <el-table-column label="私聊下注" width="100">
          <template slot-scope="{ row }">
            <span>{{ row.IsPrivate | privateFilter }}</span>
          </template>
        </el-table-column>
  
        <el-table-column label="用户下注" width="100">
          <template slot-scope="{ row }">
            <span>
              {{ row.CoinType | coinTypeFilter }}
              {{ row.BetType | betTypeFilter
              }}{{ row.BetAmount }}</span>
          </template>
        </el-table-column>
  
        <el-table-column label="定点数" prop="FixPoint" width="70" />
  
        <el-table-column label="状态" prop="Status" width="70">
          <template slot-scope="{ row }">
            <span>{{ statusMap[row.Status] }} </span>
          </template>
        </el-table-column>
  
        <el-table-column label="创建时间" prop="CreatedAt" />
      </s-table>
    </div>
  </template>
  
  <script>
  import Select from '@/components/Select'
  
  const coinTypeMap = {
    1: 'usdt',
    2: 'trx',
    3: '彩usdt',
    4: '彩trx'
  }
  
  const betTypeMap = {
    1: '大', // BetBig,
    2: '小', // BetSmall,
    3: '单', // BetOdd,
    4: '双', // BetEven,
    5: '大单', // BetBigOdd,
    6: '大双', // BetBigEven,
    7: '小单', // BetSmallOdd,
    8: '小双', // BetSmallEven,
    9: '对子', // BetPair,
    10: '顺子', // BetFlush,
    11: '豹子', // BetLeopard,
    12: '极大', // BetExtremeBig,
    13: '极小', // BetExtremeSmall,
    14: '操' // BetFixPoint,
  }
  
  const statusMap = {
    0: '下单',
    1: '中',
    2: '未中',
    3: '取消',
    4: '返本金'
  }
  
  const isPrivateMap = {
    0: '群',
    1: '私聊下注'
  }
  
  export default {
    name: 'WalletRecharge',
    components: { Select },
    filters: {
      betTypeFilter(betType) {
        return betTypeMap[betType]
      },
      coinTypeFilter(coinType) {
        return coinTypeMap[coinType]
      },
      statusFilter(status) {
        return statusMap[status]
      },
      privateFilter(IsPrivate) {
        return isPrivateMap[IsPrivate]
      }
    },
    data() {
      return {
        statusMap,
        gameOptions: Object.freeze([
          {
            label: 'PC高倍',
            value: 2
          },
          {
            label: 'PC网盘',
            value: 4
          },
          {
            label: 'PC5.0',
            value: 5
          },
          {
            label: 'PC4.6',
            value: 9
          },
          {
            label: 'PC硬碰硬',
            value: 10
          }
        ]),
        statusOptions: Object.freeze([
          {
            label: '下单',
            value: 0
          },
          {
            label: '中将',
            value: 1
          },
          {
            label: '未中将',
            value: 2
          },
          {
            label: '取消',
            value: 3
          },
          {
            label: '返本金',
            value: 4
          }
        ]),
        privateOptions: Object.freeze([
          {
            label: '私聊',
            value: 0
          },
          {
            label: '群聊',
            value: 1
          }
        ])
      }
    },
    methods: {
      handlerFilter() {
        this.$nextTick(() => {
          this.$refs.tableRef.refresh(true)
        })
      }
    }
  }
  </script>
  