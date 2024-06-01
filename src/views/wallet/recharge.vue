<template>

    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="listQuery.fromAddress" placeholder="发送地址" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handlerFilter"></el-input>
            <el-input v-model="listQuery.toAddress" placeholder="接收地址" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handlerFilter"></el-input>
            <el-input-number v-model="listQuery.uid" placeholder="用户ID" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handlerFilter" />
            <el-input v-model="listQuery.username" placeholder="用户名" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handlerFilter" />
            <el-input v-model="listQuery.hash" placeholder="充值hash" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handlerFilter"></el-input>
            <el-date-picker v-model="listQuery.rangeTime" type="datetimerange" range-separator="至"
                start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search"
                @click="handlerFilter">搜索</el-button>
        </div>
        <table>
            <tr>
                <td>货币</td>
                <td>次数</td>
                <td>总额</td>
            </tr>
            <tr>
                <td>usdt</td>
                <td>{{ this.usdtCnt }}</td>
                <td> {{ this.usdtSum }}</td>
            </tr>
            <tr>
                <td>trx</td>
                <td> {{ this.trxCnt }}</td>
                <td>{{ this.trxSum }} </td>
            </tr>
        </table>

        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">
            <el-table-column label="ID" prop="id" align="center" width="50">
                <template slot-scope="{row}">
                    <span>{{ row.ID }}</span>
                </template>
            </el-table-column>
            <el-table-column label="发送地址" align="left" width="330">

                <template slot-scope="{row}">
                    <span>{{ row.FromAddress }}</span>
                </template>
            </el-table-column>
            <el-table-column label="接收地址" align="left" width="330">

                <template slot-scope="{row}">
                    <span>{{ row.ToAddress }}</span>
                </template>
            </el-table-column>
            <el-table-column label="用户id" align="center" width="100">

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

            <el-table-column label="转账金额" align="left" width="100">

                <template slot-scope="{row}">
                    <span>{{ row.Amount / 1000000 }} {{ row.CoinSymbol }}</span>
                </template>
            </el-table-column>


            <el-table-column label="交易hash" align="left" width="330">

                <template slot-scope="{row}">
                    <span>{{ row.TxHash }}</span>
                </template>
            </el-table-column>

            <el-table-column label="块高" align="center" width="100">

                <template slot-scope="{row}">
                    <span>{{ row.BlockNum }}</span>
                </template>
            </el-table-column>

            <el-table-column label="创建时间" width="250" align="center">

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
import { getWalletRechargeList } from '@/api/wallet'
import Pagination from '@/components/Pagination'
import waves from '@/directive/waves' // waves directive

export default ({

    name: 'WalletRecharge',
    components: { Pagination },
    directives: { waves },

    data() {
        return {
            list: null,
            total: 0,
            listLoading: true,
            listQuery: {
                page: 1,
                size: 20,
            },
            usdtCnt: 0,
            trxCnt: 0,
            usdtSum: 0,
            trxSum: 0,
            downloadLoading: false
        }
    },

    created() {
        this.getList()
    },

    methods: {
        getList() {
            this.listLoading = true
            if (this.listQuery.rangeTime != null && this.listQuery.rangeTime.length == 2) {
                this.listQuery.fromTime = this.listQuery.rangeTime[0]
                this.listQuery.toTime = this.listQuery.rangeTime[1]
                this.listQuery.rangeTime = null
            }

            getWalletRechargeList(this.listQuery).then(response => {
                this.list = response.data.Data
                this.usdtCnt = response.data.UsdtCnt
                this.trxCnt = response.data.TrxCnt
                this.usdtSum = response.data.UsdtSum
                this.trxSum = response.data.TrxSum
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
