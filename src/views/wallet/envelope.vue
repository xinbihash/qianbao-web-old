<template>

    <div class="app-container">
        <div class="filter-container">
            <el-input-number v-model="listQuery.uid" placeholder="用户ID" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handlerFilter"></el-input-number>
            <el-input v-model="listQuery.username" placeholder="用户名" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handlerFilter" />

            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search"
                @click="handlerFilter">搜索</el-button>
        </div>
        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">
            <el-table-column label="ID" prop="id" align="center" width="100">
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
            <el-table-column label="红包总金额" prop="id" align="center" width="150">

                <template slot-scope="{row}">
                    <span>{{ row.CoinType | coinTypeFilter }} {{ row.CoinCount }}</span>
                </template>
            </el-table-column>

            <el-table-column label="红包类型" prop="id" align="center" width="100">

                <template slot-scope="{row}">
                    <span>{{ row.RedEnvelopeType | RedEnvelopeTypeFilter }} </span>
                </template>
            </el-table-column>

            <el-table-column label="红包个数" prop="id" align="center" width="50">

                <template slot-scope="{row}">
                    <span>{{ row.RedEnvelopeNum }}个</span>
                </template>
            </el-table-column>

            <el-table-column label="下分倍率" prop="id" align="center" width="50">

                <template slot-scope="{row}">
                    <span>{{ row.DownTimes }}倍</span>
                </template>
            </el-table-column>

            <el-table-column label="状态" prop="id" align="center" width="80">

                <template slot-scope="{row}">
                    <span>{{ row.Status | statusFilter }}</span>
                </template>
            </el-table-column>

            <el-table-column label="创建时间" width="250px" align="left">

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
import { getWalletEnvelopeList } from '@/api/wallet'
import Pagination from '@/components/Pagination'
import waves from '@/directive/waves' // waves directive

const coinTypeMap = {
    1: "usdt",
    2: "trx",
    3: "彩usdt",
    4: "彩trx",
}
// 1、金额设置 2、个数设置 3、进行中 4、 已结束 5、过期 6、彩金转化倍率
const statusMap = {
    1: "金额设置",
    2: "个数设置",
    3: "进行中",
    4: "已结束",
    5: "过期",
    6: "彩金转化倍率",
}

const RedEnvelopeTypeMap = {
    1: "随机包",
    2: "均分包"
}

export default ({

    name: 'WalletRecharge',
    components: { Pagination },
    directives: { waves },
    filters: {
        coinTypeFilter(coinType) {
            return coinTypeMap[coinType]
        },
        statusFilter(status) {
            return statusMap[status]
        },
        RedEnvelopeTypeFilter(t) {
            return RedEnvelopeTypeMap[t]
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

            getWalletEnvelopeList(this.listQuery).then(response => {
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
