<template>

  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.address" placeholder="充值地址" style="width: 200px;" class="filter-item"
        @keyup.enter.native="handlerFilter"></el-input>
      <el-input v-model="listQuery.hash" placeholder="充值hash" style="width: 200px;" class="filter-item"
        @keyup.enter.native="handlerFilter"></el-input>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handlerFilter">搜索</el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">

      <el-table-column label="mid" prop="id" align="center" width="250">
        <template slot-scope="{row}">
          <span>{{ row.Id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="群ID" prop="id" align="center" width="120">

        <template slot-scope="{row}">
          <span>{{ row.GroupID }}</span>
        </template>
      </el-table-column>
      <el-table-column label="群名称" prop="id" align="center" width="120">

        <template slot-scope="{row}">
          <span>{{ row.GroupTitle }}</span>
        </template>
      </el-table-column>

      <el-table-column label="群主ID" prop="id" align="center" width="120">

        <template slot-scope="{row}">
          <span>{{ row.OwnerUid }}</span>
        </template>
      </el-table-column>


      <el-table-column label="群主名" align="center" width="100">

        <template slot-scope="{row}">
          <span>{{ row.OwnerUsername }}</span>
        </template>
      </el-table-column>
      <el-table-column label="群主昵称" align="center" width="100">

        <template slot-scope="{row}">
          <span>{{ row.OwnerNickname }}</span>
        </template>
      </el-table-column>



      <el-table-column label="玩家ID" prop="id" align="center" width="120">

        <template slot-scope="{row}">
          <span>{{ row.Uid }}</span>
        </template>
      </el-table-column>

      <el-table-column label="玩家名" align="center" width="100">

        <template slot-scope="{row}">
          <span>{{ row.Username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="玩家昵称" align="center" width="100">

        <template slot-scope="{row}">
          <span>{{ row.Nickname }}</span>
        </template>
      </el-table-column>

      <el-table-column label="开奖方式" align="center" width="80">

        <template slot-scope="{row}">
          <span> {{ row.OpenType | openTypeFilter }}</span>
        </template>


      </el-table-column>


      <el-table-column label="下注金额" align="left" width="110">

        <template slot-scope="{row}">
          <span> {{ row.CoinType | coinTypeFilter }} {{ row.CoinCount }}</span>
        </template>
      </el-table-column>

      <el-table-column label="中奖金额" align="left" width="180">

        <template slot-scope="{row}">
          <span> {{ row.WinTimes }}倍 -> {{ row.WinCount }} {{ row.CoinType | coinTypeFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column label="红包个数" width="50px" align="center">

        <template slot-scope="{row}">
          <span>{{ row.RedEnvelopeNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="骰子点数" width="50px" align="center">

        <template slot-scope="{row}">
          <span>{{ row.CubeValue % 10 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="雷值" width="150px" align="center">

        <template slot-scope="{row}">
          <span>{{ row.RedEnvelopeMineCode }} 在 {{ row.CubeValue % 10 }} + {{ row.RedEnvelopeInfoCode
            }}</span>
        </template>
      </el-table-column>

      <el-table-column label="红包列表" width="250px" align="left">

        <template slot-scope="{row}">
          <span>{{ row.RedEnvelopeInfo }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="80px" align="left">

        <template slot-scope="{row}">
          <span>{{ row.Status | statusFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" width="220px" align="center">

        <template slot-scope="{row}">
          <span>{{ row.CreatedAt }}</span>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :size.sync="listQuery.size"
      @pagination="getList"></pagination>

  </div>

</template>


<script>
import { getMineOrderList } from '@/api/mine'
import Pagination from '@/components/Pagination'
import waves from '@/directive/waves' // waves directive

const coinTypeMap = {
  1: "usdt",
  2: "trx",
  3: "彩usdt",
  4: "彩trx",
}

const betTypeMap = {
  1: "大", // BetBig,
  2: "小", // BetSmall,
  3: "单", // BetOdd,
  4: "双", // BetEven,
  5: "大单", // BetBigOdd,
  6: "大双", // BetBigEven,
  7: "小单", // BetSmallOdd,
  8: "小双", // BetSmallEven,
  9: "对子", // BetPair,
  10: "顺子", //BetFlush,
  11: "豹子", //BetLeopard,
  12: "极大", //BetExtremeBig,
  13: "极小", //BetExtremeSmall,
  14: "操", //BetFixPoint,
}

const openTypeMap = {
  1: "群开",
  2: "私开"
}

const statusMap = {
  1: "群ID设置", 2: "金额已设置", 3: "已埋雷", 4: "中奖", 5: "未中奖", 6: "已发奖金", 7: "余额不足"
}

export default ({

  name: 'WalletRecharge',
  components: { Pagination },
  directives: { waves },
  filters: {
    betTypeFilter(betType) {
      return betTypeMap[betType]
    },
    openTypeFilter(coinType) {
      return openTypeMap[coinType]
    },
    coinTypeFilter(coinType) {
      return coinTypeMap[coinType]
    },
    statusFilter(status) {
      return statusMap[status]
    }

  },

  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 20,
      },
      downloadLoading: false
    }
  },

  created() {
    this.getList()
  },

  methods: {
    getList() {
      this.listLoading = true

      getMineOrderList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.code

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
          // }, 1.5 * 1000)
        }, 100)
      })
    },

    handlerFilter() {
      this.listQuery.page = 1
      this.getList()
    },

  },

})
</script>
