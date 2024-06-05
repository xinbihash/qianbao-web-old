<template>
  <div class="app-container">
    <s-table
      ref="tableRef"
      :api="{
        url: '/pcHigh/order',
        method: 'POST',
      }"
      :querys="querys"
      :formatter="formatter"
    >
      <el-table-column
        label="订单号"
        prop="Id"
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

      <el-table-column label="创建时间" prop="CreatedAt" width="150px">
        <template #default="{row}">
          {{ row.CreatedAt | dateFormat }}
        </template>
      </el-table-column>
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
          field: 'drawNum',
          title: '期号',
          props: {
            placeholder: '期号'
          }
        },
        {
          field: 'id',
          title: '订单号',
          props: {
            placeholder: '订单号'
          }
        },
        {
          field: 'gameType',
          title: '游戏类型',
          type: 'select',
          value: 2,
          options: Object.freeze([
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
          props: {
            placeholder: '游戏类型'
          }
        },
        {
          field: 'status',
          title: '订单状态',
          type: 'select',
          options: Object.freeze([
            {
              label: '下单',
              value: 0
            },
            {
              label: '中奖',
              value: 1
            },
            {
              label: '未中奖',
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
          props: {
            placeholder: '订单状态'
          }
        },
        {
          field: 'isPrivate',
          title: '是否私聊',
          type: 'select',
          options: Object.freeze([
            {
              label: '私聊',
              value: 0
            },
            {
              label: '群聊',
              value: 1
            }
          ]),
          props: {
            placeholder: '是否私聊'
          }
        }
      ]
    }
  },
  methods: {
    handlerFilter() {
      this.$nextTick(() => {
        this.$refs.tableRef.refresh(true)
      })
    },
    formatter(data) {
      if (data.uid) {
        data.uid = Number(data.uid)
      }
      return data
    }
  }
}
</script>
