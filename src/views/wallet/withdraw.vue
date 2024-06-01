<template>

    <div class="app-container">
        <div class="filter-container">
            <el-input-number v-model="listQuery.uid" placeholder="用户id" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handlerFilter"></el-input-number>
            <el-input v-model="listQuery.username" placeholder="用户名" style="width: 200px;" class="filter-item"
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
                <td>手续费</td>
                <td>实际总额</td>
            </tr>
            <tr>
                <td>USDT</td>
                <td>{{ this.UsdtCnt }}</td>
                <td> {{ this.UsdtSum }}</td>
                <td> {{ this.UsdtFeeSum }}</td>
                <td> {{ this.UsdtRealSum }}</td>
            </tr>
            <tr>
                <td>TRX</td>
                <td>{{ this.TrxCnt }}</td>
                <td> {{ this.TrxSum }}</td>
                <td> {{ this.TrxFeeSum }}</td>
                <td> {{ this.TrxRealSum }}</td>
            </tr>
        </table>


        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">
            <el-table-column label="ID" prop="id" align="center" width="60">
                <template slot-scope="{row}">
                    <span>{{ row.ID }}</span>
                </template>
            </el-table-column>

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

            <el-table-column label="提现金额" prop="id" align="left" width="100">

                <template slot-scope="{row}">
                    <span>{{ row.CoinName }} {{ row.CoinCount }} </span>
                </template>
            </el-table-column>

            <el-table-column label="提现手续费" prop="id" align="left" width="100">

                <template slot-scope="{row}">
                    <span>{{ row.CoinName }} {{ row.CoinFee }} </span>
                </template>
            </el-table-column>

            <el-table-column label="到账金额" prop="id" align="left" width="100">

                <template slot-scope="{row}">
                    <span>{{ row.CoinName }} {{ row.CoinRelCount }} </span>
                </template>
            </el-table-column>

            <el-table-column label="提现地址" prop="id" align="left" width="300">

                <template slot-scope="{row}">
                    <span>{{ row.Address }} </span>
                </template>
            </el-table-column>


            <el-table-column label="审批人id" prop="id" align="center" width="150">

                <template slot-scope="{row}">
                    <span>{{ row.ApprovalUid }}</span>
                </template>
            </el-table-column>
            <el-table-column label="审批时间" width="230px" align="center">

                <template slot-scope="{row}">
                    <span>{{ row.ApprovalTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建时间" width="230px" align="center">

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
import { getWalletWithdrawList } from '@/api/wallet'
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
            UsdtCnt: 0,
            TrxCnt: 0,
            UsdtSum: 0,
            TrxSum: 0,
            UsdtFeeSum: 0,
            TrxFeeSum: 0,
            UsdtRealSum: 0,
            TrxRealSum: 0,
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
            getWalletWithdrawList(this.listQuery).then(response => {
                this.list = response.data.Data

                this.UsdtCnt = response.data.UsdtCnt
                this.TrxCnt = response.data.TrxCnt
                this.UsdtSum = response.data.UsdtSum
                this.TrxSum = response.data.TrxSum
                this.UsdtFeeSum = response.data.UsdtFeeSum
                this.TrxFeeSum = response.data.TrxFeeSum
                this.UsdtRealSum = response.data.UsdtRealSum
                this.TrxRealSum = response.data.TrxRealSum

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
