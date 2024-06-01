<template>

    <div class="app-container">
        <div class="filter-container">
            <el-input-number v-model="listQuery.uid" placeholder="用户id" style="width: 200px;" class="filter-item"
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

            <el-table-column label="新增用户数" align="center" width="100">

                <template slot-scope="{row}">
                    <span>{{ row.NewUserCnt }}</span>
                </template>
            </el-table-column>
            <el-table-column label="新增用户trx充值" align="center" width="160">

                <template slot-scope="{row}">
                    <div>充值次数: {{ row.NewUserTrxRechargeCnt }}</div>
                    <div>充值总额: {{ row.NewUserTrxRechargeAmount }}</div>
                    <div>充值人次: {{ row.NewUserTrxRechargeUserCnt }}</div>
                </template>
            </el-table-column>

            <el-table-column label="新增用户trx提现" align="center" width="160">

                <template slot-scope="{row}">
                    <div>提现次数: {{ row.NewUserTrxWithdrawCnt }}</div>
                    <div>提现总额: {{ row.NewUserTrxWithdrawAmount }}</div>
                    <div>提现人次: {{ row.NewUserTrxWithdrawUserCnt }}</div>
                </template>
            </el-table-column>

            <el-table-column label="新增用户usdt充值" align="center" width="160">

                <template slot-scope="{row}">
                    <div>充值次数: {{ row.NewUserUsdtRechargeCnt }}</div>
                    <div>充值总额: {{ row.NewUserUsdtRechargeAmount }}</div>
                    <div>充值人次: {{ row.NewUserUsdtRechargeUserCnt }}</div>
                </template>
            </el-table-column>

            <el-table-column label="新增用户usdt提现" align="center" width="160">

                <template slot-scope="{row}">
                    <div>提现次数: {{ row.NewUserUsdtWithdrawCnt }}</div>
                    <div>提现总额: {{ row.NewUserUsdtWithdrawAmount }}</div>
                    <div>提现人次: {{ row.NewUserUsdtWithdrawUserCnt }}</div>
                </template>
            </el-table-column>

     

            <el-table-column label="所有用户trx充值" align="center" width="160">

                <template slot-scope="{row}">
                    <div>充值次数: {{ row.AllUserTrxRechargeCnt }}</div>
                    <div>充值总额: {{ row.AllUserTrxRechargeAmount }}</div>
                    <div>充值人次: {{ row.AllUserTrxRechargeUserCnt }}</div>
                </template>
            </el-table-column>

            <el-table-column label="所有用户trx提现" align="center" width="160">

                <template slot-scope="{row}">
                    <div>提现次数: {{ row.AllUserTrxWithdrawCnt }}</div>
                    <div>提现总额: {{ row.AllUserTrxWithdrawAmount }}</div>
                    <div>提现人次: {{ row.AllUserTrxWithdrawUserCnt }}</div>
                </template>
            </el-table-column>

            <el-table-column label="所有用户usdt充值" align="center" width="160">

                <template slot-scope="{row}">
                    <div>充值次数: {{ row.AllUserUsdtRechargeCnt }}</div>
                    <div>充值总额: {{ row.AllUserUsdtRechargeAmount }}</div>
                    <div>充值人次: {{ row.AllUserUsdtRechargeUserCnt }}</div>
                </template>
            </el-table-column>

            <el-table-column label="所有用户usdt提现" align="center" width="160">

                <template slot-scope="{row}">
                    <div>提现次数: {{ row.AllUserUsdtWithdrawCnt }}</div>
                    <div>提现总额: {{ row.AllUserUsdtWithdrawAmount }}</div>
                    <div>提现人次: {{ row.AllUserUsdtWithdrawUserCnt }}</div>
                </template>
            </el-table-column>






        </el-table>

        <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :size.sync="listQuery.size"
            @pagination="getList"></pagination>

    </div>

</template>


<script>
import { getWalletUserOverview } from '@/api/wallet'
import Pagination from '@/components/Pagination'
import waves from '@/directive/waves' // waves directive

export default ({
    name: 'userOverviewss',
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

            getWalletUserOverview(this.listQuery).then(response => {
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
