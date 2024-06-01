<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input-number v-model="listQuery.uid" placeholder="用户ID" style="width: 200px;" class="filter-item"
        @keyup.enter.native="handlerFilter" />
      <el-input v-model="listQuery.username" placeholder="用户名" style="width: 200px;" class="filter-item"
        @keyup.enter.native="handlerFilter" />
      <el-input-number v-model="listQuery.coinType" placeholder="1,2,3,4" style="width: 200px;" class="filter-item"
        @keyup.enter.native="handlerFilter" />

      <el-date-picker v-model="listQuery.date" type="date" placeholder="选择日期">
      </el-date-picker>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handlerFilter">搜索</el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">
      <el-table-column label="用户ID" prop="id" align="center" width="150">
        <template slot-scope="{row}">
          <span>{{ row.Uid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.Username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户昵称" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.Nickname }}</span>
        </template>
      </el-table-column>

      <el-table-column label="货币" width="100px" align="center">

        <template slot-scope="{row}">
          <el-tag>{{ row.CoinType | coinTypeFilter }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="变化量" width="100" align="left">

        <template slot-scope="{row}">
          <span>{{ row.ChangeBalance }}</span>
        </template>
      </el-table-column>


      <el-table-column label="当前值" width="100" align="left">

        <template slot-scope="{row}">
          <span>{{ row.AfterChangeBalance }}</span>
        </template>
      </el-table-column>

      <el-table-column label="备注" width="300px" align="left">

        <template slot-scope="{row}">
          <span>{{ row.Remark }}</span>
        </template>
      </el-table-column>


      <el-table-column label="创建时间" width="200px" align="center">

        <template slot-scope="{row}">
          <span>{{ row.CreatedAt }}</span>
        </template>
      </el-table-column>

      <el-table-column label="更新时间" width="200px" align="center">

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
import { getWalletBlChangeList } from '@/api/wallet'
import Pagination from '@/components/Pagination'
import waves from '@/directive/waves' // waves directive


const coinTypeMap = {
  1: "usdt",
  2: "trx",
  3: "彩usdt",
  4: "彩trx",
}


const coinTypeOptions = [
  { key: '', display_name: '' },
  { key: '', display_name: '' },
  { key: '', display_name: '' },
  { key: '', display_name: '' },

]


export default ({
  name: 'BlChange',
  components: { Pagination },
  directives: { waves },
  filters: {
    coinTypeFilter(coinType) {
      return coinTypeMap[coinType]
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

      getWalletBlChangeList(this.listQuery).then(response => {
        this.list = response.data
        this.total = 1000000

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
