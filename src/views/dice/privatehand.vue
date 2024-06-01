<template>

    <div class="app-container">

        <el-input-number v-model="listQuery.uid" placeholder="用户ID" style="width: 200px;" class="filter-item"
            @keyup.enter.native="handlerFilter"></el-input-number>
        <el-input v-model="listQuery.username" placeholder="用户名" style="width: 200px;" class="filter-item"
            @keyup.enter.native="handlerFilter"></el-input>
        <el-input v-model="listQuery.id" placeholder="订单号" style="width: 200px;" class="filter-item"
            @keyup.enter.native="handlerFilter"></el-input>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search"
            @click="handlerFilter">搜索</el-button>

        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">

            <el-table-column label="订单号" prop="id" align="center" width="250">
                <template slot-scope="{row}">
                    <span>{{ row.Id }}</span>
                </template>
            </el-table-column>


            <el-table-column label="玩家ID" prop="id" align="center" width="120">

                <template slot-scope="{row}">
                    <span>{{ row.Uid }}</span>
                </template>
            </el-table-column>

            <el-table-column label="玩家名" align="center" width="100">

                <template slot-scope="{row}">
                    <span>{{ row.UserName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="玩家昵称" align="center" width="100">

                <template slot-scope="{row}">
                    <span>{{ row.NickName }}</span>
                </template>
            </el-table-column>

            <el-table-column label="当前期数" align="center" width="130">

                <template slot-scope="{row}">
                    <span>{{ row.Num }}期</span>
                </template>
            </el-table-column>

            <el-table-column label="当期开奖结果" align="center" width="130">

                <template slot-scope="{row}">
                    <span>{{ row.DiceStr}}</span>
                </template>
            </el-table-column>
            <el-table-column label="用户下注" align="left" width="150">

                <template slot-scope="{row}">
                    <span> {{ row.CoinType | coinTypeFilter }} {{ row.BetType | betTypeFilter }}{{ row.BetAmount
                        }}</span>
                </template>
            </el-table-column>

            <el-table-column label="倍率" align="left" width="150">

                <template slot-scope="{row}">
                    <span> 赢: {{ row.BetWinAmount }} {{ row.BetTimes }}倍</span>
                </template>
            </el-table-column>


            <el-table-column label="定点数" align="center" width="70">

                <template slot-scope="{row}">
                    <span>{{ row.FixPoint }} </span>
                </template>
            </el-table-column>

            <el-table-column label="状态" align="left" width="70">

                <template slot-scope="{row}">
                    <span>{{ row.Status | statusFilter }} </span>
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
import { getDiceOrderList } from '@/api/dice'
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

const statusMap = {
    0: "下单",
    1: "中",
    2: "未中",
    3: "取消",
    4: "返本金"
}

export default ({

    name: 'WalletRecharge',
    components: { Pagination },
    directives: { waves },
    filters: {
        betTypeFilter(betType) {
            return betTypeMap[betType]
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
                gameType: 8,
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

            getDiceOrderList(this.listQuery).then(response => {
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
