<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input-number v-model="listQuery.gid" placeholder="群组ID" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handlerFilter"></el-input-number>

            <el-date-picker v-model="listQuery.day" type="daterange" range-separator="至" start-placeholde="开始日期"
                end-placeholde="结束日期" :picker-options="pickerOptions"></el-date-picker>

            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search"
                @click="handlerFilter">搜索</el-button>
        </div>
        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">

            <el-table-column label="群组ID" align="center" width="150">
                <template slot-scope="{row}">
                    <span>{{ row.GroupId }}</span>
                </template>
            </el-table-column>

            <el-table-column label="群组名" align="center" width="150">

                <template slot-scope="{row}">
                    <span>{{ row.GroupTitle }}</span>
                </template>
            </el-table-column>

            <el-table-column label="群主ID" align="center" width="150">

                <template slot-scope="{row}">
                    <span>{{ row.OwnerId }}</span>
                </template>
            </el-table-column>

            <el-table-column label="群主名" align="center" width="150">

                <template slot-scope="{row}">
                    <span>{{ row.OwnerUsername }}</span>
                </template>
            </el-table-column>
            <el-table-column label="群主昵称" align="center" width="150">

                <template slot-scope="{row}">
                    <span>{{ row.OwnerNickname }}</span>
                </template>
            </el-table-column>

            <el-table-column label="trx下注" align="center" width="100">

                <template slot-scope="{row}">
                    <span>{{ row.TrxUserBet }}</span>
                </template>
            </el-table-column>
            <el-table-column label="trx中奖额" align="center" width="100">

                <template slot-scope="{row}">
                    <span>{{ row.TrxUserWin }}</span>
                </template>
            </el-table-column>
            <el-table-column label="trx反水" align="center" width="100">

                <template slot-scope="{row}">
                    <span>{{ row.TrxRebate }}</span>
                </template>
            </el-table-column>


            <el-table-column label="usdt下注" align="center" width="100">

                <template slot-scope="{row}">
                    <span>{{ row.UsdtUserBet }}</span>
                </template>
            </el-table-column>
            <el-table-column label="usdt中奖额" align="center" width="100">

                <template slot-scope="{row}">
                    <span>{{ row.UsdtUserWin }}</span>
                </template>
            </el-table-column>
            <el-table-column label="usdt反水" align="center" width="100">

                <template slot-scope="{row}">
                    <span>{{ row.UsdtRebate }}</span>
                </template>
            </el-table-column>


            <el-table-column label="彩trx下注" align="center" width="100">

                <template slot-scope="{row}">
                    <span>{{ row.TrxBonusUserBet }}</span>
                </template>
            </el-table-column>
            <el-table-column label="彩trx中奖额" align="center" width="100">

                <template slot-scope="{row}">
                    <span>{{ row.TrxBonusUserWin }}</span>
                </template>
            </el-table-column>

            <el-table-column label="彩usdt下注" align="center" width="100">

                <template slot-scope="{row}">
                    <span>{{ row.UsdtBonusUserBet }}</span>
                </template>
            </el-table-column>
            <el-table-column label="彩usdt中奖额" align="center" width="120">

                <template slot-scope="{row}">
                    <span>{{ row.UsdtBonusUserWin }}</span>
                </template>
            </el-table-column>


        </el-table>

        <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :size.sync="listQuery.size"
            @pagination="getList"></pagination>

    </div>

</template>


<script>
import { getPcHighGroupDay } from '@/api/pchigh'
import Pagination from '@/components/Pagination'
import waves from '@/directive/waves' // waves directive


const FORMAT = 'YYYY-MM-DD'

export default ({

    name: 'groupall',
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
                page: 1,
                size: 20,
            },
            downloadLoading: false,
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
        }
    },

    created() {
        // this.getList()
    },

    methods: {
        getList() {
            this.listLoading = true
            getPcHighGroupDay(this.listQuery).then(response => {
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