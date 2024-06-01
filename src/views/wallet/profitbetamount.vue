<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input-number v-model="listQuery.uid" placeholder="用户ID" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handlerFilter" />
            <el-input v-model="listQuery.username" placeholder="用户名" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handlerFilter" />
            <el-input-number v-model="listQuery.dataType" placeholder="1、流失 2、收益" style="width: 200px;"
                class="filter-item" @keyup.enter.native="handlerFilter" />
            <!-- <el-date-picker v-model="listQuery.date" type="date" placeholder="选择日期" /> -->
            <el-date-picker v-model="listQuery.rangeTime" type="datetimerange" range-separator="至"
                start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search"
                @click="handlerFilter">搜索</el-button>
        </div>


        <div>
            盈亏: {{ this.Profit }}
        </div>

        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">
            <el-table-column label="用户ID" prop="id" align="center" width="150">
                <template slot-scope="{row}">
                    <span>{{ row.Uid }}</span>
                </template>
            </el-table-column>
            <el-table-column label="用户名" prop="id" align="center" width="150">
                <template slot-scope="{row}">
                    <span>{{ row.UserName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="用户昵称" prop="id" align="center" width="150">
                <template slot-scope="{row}">
                    <span>{{ row.NickName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="盈亏" prop="id" align="left" width="300">
                <template slot-scope="{row}">
                    <span>{{ row.Profit }}</span>
                </template>
            </el-table-column>


        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :size.sync="listQuery.size"
            @pagination="getList"></pagination>

    </div>
</template>

<script>
import { getDayProfitBetAmount } from '@/api/wallet'
import Pagination from '@/components/Pagination'
import waves from '@/directive/waves' // waves directive


const coinTypeMap = {
    1: "usdt",
    2: "trx",
    3: "彩usdt",
    4: "彩trx",
}

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
                dataType: 1,
            },
            Profit: 0,
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

            // const diff = this.listQuery.date.getTimezoneOffset() * 60 * 1000
            // console.log(diff)
            // this.listQuery.date = new Date(this.listQuery.date.getTime() + diff)
            console.log(this.listQuery.date)


            getDayProfitBetAmount(this.listQuery).then(response => {
                this.list = response.data.Data
                this.Profit = response.data.Profit
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