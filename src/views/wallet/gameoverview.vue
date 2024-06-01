<template>

    <div class="app-container">
        <div class="filter-container">
            <el-input-number v-model="listQuery.gid" placeholder="组id" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handlerFilter"></el-input-number>
            <el-input-number v-model="listQuery.gameType" placeholder="2,4,5" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handlerFilter"></el-input-number>
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search"
                @click="handlerFilter">搜索</el-button>
        </div>
        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">

            <el-table-column label="日期" align="center" width="120">
                <template slot-scope="{row}">
                    <span>{{ row.Day }}</span>
                </template>
            </el-table-column>

            <el-table-column label="组ID" align="center" width="100">

                <template slot-scope="{row}">
                    <span>{{ row.Gid }}</span>
                </template>
            </el-table-column>

            <el-table-column label="trx下注" align="center" width="160">

                <template slot-scope="{row}">
                    <div>下注人数: {{ row.TrxBetUserCnt }}</div>
                    <div>下注笔数: {{ row.TrxBetCnt }}</div>
                    <div>下注金额: {{ row.TrxBetAmount }}</div>
                    <div>中奖人数: {{ row.TrxBetWinUserCnt }}</div>
                    <div>中奖笔数: {{ row.TrxBetWinCnt }}</div>
                    <div>中奖金额: {{ row.TrxBetWinAmount }}</div>
                </template>
            </el-table-column>


            <el-table-column label="usdt下注" align="center" width="160">

                <template slot-scope="{row}">
                    <div>下注人数: {{ row.TrxBetUserCnt }}</div>
                    <div>下注笔数: {{ row.TrxBetCnt }}</div>
                    <div>下注金额: {{ row.TrxBetAmount }}</div>
                    <div>中奖人数: {{ row.TrxBetWinUserCnt }}</div>
                    <div>中奖笔数: {{ row.TrxBetWinCnt }}</div>
                    <div>中奖金额: {{ row.TrxBetWinAmount }}</div>
                </template>
            </el-table-column>


            <el-table-column label="彩trx下注" align="center" width="160">

                <template slot-scope="{row}">
                    <div>下注人数: {{ row.TrxBetUserCnt }}</div>
                    <div>下注笔数: {{ row.TrxBetCnt }}</div>
                    <div>下注金额: {{ row.TrxBetAmount }}</div>
                    <div>中奖人数: {{ row.TrxBetWinUserCnt }}</div>
                    <div>中奖笔数: {{ row.TrxBetWinCnt }}</div>
                    <div>中奖金额: {{ row.TrxBetWinAmount }}</div>
                </template>
            </el-table-column>


            <el-table-column label="彩usdt下注" align="center" width="160">

                <template slot-scope="{row}">
                    <div>下注人数: {{ row.TrxBetUserCnt }}</div>
                    <div>下注笔数: {{ row.TrxBetCnt }}</div>
                    <div>下注金额: {{ row.TrxBetAmount }}</div>
                    <div>中奖人数: {{ row.TrxBetWinUserCnt }}</div>
                    <div>中奖笔数: {{ row.TrxBetWinCnt }}</div>
                    <div>中奖金额: {{ row.TrxBetWinAmount }}</div>
                </template>
            </el-table-column>

            <el-table-column label="trx反水" align="center" width="160">

                <template slot-scope="{row}">
                    <div>人数: {{ row.TrxRebateUserDistinct }}</div>
                    <div>笔数: {{ row.TrxRebateCnt }}</div>
                    <div>金额: {{ row.TrxRebateAmount }}</div>
                </template>
            </el-table-column>
            <el-table-column label="usdt反水" align="center" width="160">

                <template slot-scope="{row}">
                    <div>人数: {{ row.UsdtRebateUserDistinct }}</div>
                    <div>笔数: {{ row.UsdtRebateCnt }}</div>
                    <div>金额: {{ row.UsdtRebateAmount }}</div>
                </template>
            </el-table-column>


            <el-table-column label="彩trx转化" align="center" width="160">

                <template slot-scope="{row}">
                    <div>人数: {{ row.TrxBonusTransUserDistinct }}</div>
                    <div>笔数: {{ row.TrxBonusTransCnt }}</div>
                    <div>金额: {{ row.TrxBonusTransAmount }}</div>
                </template>
            </el-table-column>
            <el-table-column label="彩usdt转化" align="center" width="160">

                <template slot-scope="{row}">
                    <div>人数: {{ row.UsdtBonusTransUserDistinct }}</div>
                    <div>笔数: {{ row.UsdtBonusTransCnt }}</div>
                    <div>金额: {{ row.UsdtBonusTransAmount }}</div>
                </template>
            </el-table-column>


            <el-table-column label="trx盈利" align="center" width="160">

                <template slot-scope="{row}">
                    <div>金额: {{ row.TrxTotalProfit }}</div>
                </template>
            </el-table-column>
            <el-table-column label="usdt盈利" align="center" width="160">

                <template slot-scope="{row}">
                    <div>金额: {{ row.UsdtTotalProfit }}</div>
                </template>
            </el-table-column>






        </el-table>

        <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :size.sync="listQuery.size"
            @pagination="getList"></pagination>

    </div>

</template>


<script>
import { getPcGroupOverView } from '@/api/pchigh'
import Pagination from '@/components/Pagination'
import waves from '@/directive/waves' // waves directive

export default ({
    name: 'gameOverview',
    components: { Pagination },
    directives: { waves },
    data() {
        return {
            list: null,
            total: 0,
            listLoading: true,
            listQuery: {
                page: 1,
                size: 10,
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

            getPcGroupOverView(this.listQuery).then(response => {
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
