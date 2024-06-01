<template>

    <div class="app-container">
        <div class="filter-container">
            <el-input-number v-model="listQuery.uid" placeholder="用户id" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handlerFilter"></el-input-number>
            <el-input v-model="listQuery.username" placeholder="用户名" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handlerFilter"></el-input>
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search"
                @click="handlerFilter">搜索</el-button>
        </div>
        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">
            <el-table-column label="日期" align="left" width="120">
                <template slot-scope="{row}">
                    <span>{{ row.Day }}</span>
                </template>
            </el-table-column>

            <el-table-column label="用户ID" align="left" width="100">

                <template slot-scope="{row}">
                    <span>{{ row.Uid }}</span>
                </template>
            </el-table-column>

            <el-table-column label="trx充值" align="left" width="120">

                <template slot-scope="{row}">
                    <div>次数: {{ row.TrxRechargeCnt }}</div>
                    <div>总额: {{ row.TrxRechargeAmount }}</div>
                    <div>人次: {{ row.TrxRechargeUserCnt }}</div>
                </template>
            </el-table-column>
            <el-table-column label="trx提现" align="left" width="120">

                <template slot-scope="{row}">
                    <div>次数: {{ row.TrxWithdrawCnt }}</div>
                    <div>总额: {{ row.TrxWithdrawAmount }}</div>
                    <div>人次: {{ row.TrxWithdrawUserCnt }}</div>
                </template>
            </el-table-column>
            <el-table-column label="trx下注" align="left" width="120">

                <template slot-scope="{row}">
                    <div>次数: {{ row.TrxBetCnt }}</div>
                    <div>总额: {{ row.TrxBetAmount }}</div>
                    <div>人次: {{ row.TrxBetUserCnt }}</div>
                </template>
            </el-table-column>
            <el-table-column label="trx下注中奖" align="left" width="120">

                <template slot-scope="{row}">
                    <div>次数: {{ row.TrxBetWinCnt }}</div>
                    <div>总额: {{ row.TrxBetWinAmount }}</div>
                    <div>人次: {{ row.TrxBetWinUserCnt }}</div>
                </template>
            </el-table-column>
            <el-table-column label="trx反水" align="left" width="120">

                <template slot-scope="{row}">
                    <div>次数: {{ row.TrxRebateCnt }}</div>
                    <div>总额: {{ row.TrxRebateAmount }}</div>
                    <div>人次: {{ row.TrxRebateUserCnt }}</div>
                </template>
            </el-table-column>
            <el-table-column label="trx转化" align="left" width="120">

                <template slot-scope="{row}">
                    <div>次数: {{ row.TrxBonusConvertCnt }}</div>
                    <div>总额: {{ row.TrxBonusConvertAmount }}</div>
                    <div>人次: {{ row.TrxBonusConvertUserCnt }}</div>
                </template>
            </el-table-column>


            <el-table-column label="usdt充值" align="left" width="120">

                <template slot-scope="{row}">
                    <div>次数: {{ row.UsdtRechargeCnt }}</div>
                    <div>总额: {{ row.UsdtRechargeAmount }}</div>
                    <div>人次: {{ row.UsdtRechargeUserCnt }}</div>
                </template>
            </el-table-column>
            <el-table-column label="usdt提现" align="left" width="120">

                <template slot-scope="{row}">
                    <div>次数: {{ row.UsdtWithdrawCnt }}</div>
                    <div>总额: {{ row.UsdtWithdrawAmount }}</div>
                    <div>人次: {{ row.UsdtWithdrawUserCnt }}</div>
                </template>
            </el-table-column>
            <el-table-column label="usdt下注" align="left" width="120">

                <template slot-scope="{row}">
                    <div>次数: {{ row.UsdtBetCnt }}</div>
                    <div>总额: {{ row.UsdtBetAmount }}</div>
                    <div>人次: {{ row.UsdtBetUserCnt }}</div>
                </template>
            </el-table-column>
            <el-table-column label="usdt下注中奖" align="left" width="120">

                <template slot-scope="{row}">
                    <div>次数: {{ row.UsdtBetWinCnt }}</div>
                    <div>总额: {{ row.UsdtBetWinAmount }}</div>
                    <div>人次: {{ row.UsdtBetWinUserCnt }}</div>
                </template>
            </el-table-column>
            <el-table-column label="usdt反水" align="left" width="120">

                <template slot-scope="{row}">
                    <div>次数: {{ row.UsdtRebateCnt }}</div>
                    <div>总额: {{ row.UsdtRebateAmount }}</div>
                    <div>人次: {{ row.UsdtRebateUserCnt }}</div>
                </template>
            </el-table-column>
            <el-table-column label="usdt转化" align="left" width="120">

                <template slot-scope="{row}">
                    <div>次数: {{ row.UsdtBonusConvertCnt }}</div>
                    <div>总额: {{ row.UsdtBonusConvertAmount }}</div>
                    <div>人次: {{ row.UsdtBonusConvertUserCnt }}</div>
                </template>
            </el-table-column>


            <el-table-column label="彩trx下注" align="left" width="120">

                <template slot-scope="{row}">
                    <div>次数: {{ row.TrxBonusBetCnt }}</div>
                    <div>总额: {{ row.TrxBonusBetAmount }}</div>
                    <div>人次: {{ row.TrxBonusBetUserCnt }}</div>
                </template>
            </el-table-column>
            <el-table-column label="彩trx下注中奖" align="left" width="120">

                <template slot-scope="{row}">
                    <div>次数: {{ row.TrxBonusBetWinCnt }}</div>
                    <div>总额: {{ row.TrxBonusBetWinAmount }}</div>
                    <div>人次: {{ row.TrxBonusBetWinUserCnt }}</div>
                </template>
            </el-table-column>


            <el-table-column label="彩usdt下注" align="left" width="120">

                <template slot-scope="{row}">
                    <div>次数: {{ row.UsdtBonusBetCnt }}</div>
                    <div>总额: {{ row.UsdtBonusBetAmount }}</div>
                    <div>人次: {{ row.UsdtBonusBetUserCnt }}</div>
                </template>
            </el-table-column>
            <el-table-column label="彩usdt下注中奖" align="left" width="120">

                <template slot-scope="{row}">
                    <div>次数: {{ row.UsdtBonusBetWinCnt }}</div>
                    <div>总额: {{ row.UsdtBonusBetWinAmount }}</div>
                    <div>人次: {{ row.UsdtBonusBetWinUserCnt }}</div>
                </template>
            </el-table-column>



        </el-table>

        <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :size.sync="listQuery.size"
            @pagination="getList"></pagination>

    </div>

</template>


<script>
import { getWalletUserListOverview } from '@/api/wallet'
import Pagination from '@/components/Pagination'
import waves from '@/directive/waves' // waves directive

export default ({
    name: 'userList',
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

            getWalletUserListOverview(this.listQuery).then(response => {
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
