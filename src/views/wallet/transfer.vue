<template>

    <div class="app-container">
        <div class="filter-container">
            <el-input-number v-model="listQuery.fromUid" placeholder="发起人id" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handlerFilter"></el-input-number>
            <el-input-number v-model="listQuery.toUid" placeholder="被操作人id" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handlerFilter"></el-input-number>
            <el-input v-model="listQuery.fromName" placeholder="发起人name" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handlerFilter"></el-input>
            <el-input v-model="listQuery.toName" placeholder="接收人name" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handlerFilter"></el-input>
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search"
                @click="handlerFilter">搜索</el-button>
        </div>
        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">
            <el-table-column label="ID" align="center" width="50">
                <template slot-scope="{row}">
                    <span>{{ row.ID }}</span>
                </template>
            </el-table-column>

            <el-table-column label="发起人ID" align="center" width="150">

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
            <el-table-column label="转账类型" align="center" width="80">

                <template slot-scope="{row}">
                    <span>{{ row.Direction | dirFilter }}</span>
                </template>
            </el-table-column>

            <el-table-column label="被操作人ID" align="center" width="150">

                <template slot-scope="{row}">
                    <span>{{ row.OtherUid }}</span>
                </template>
            </el-table-column>
            <el-table-column label="被操作人名" align="center" width="100">

                <template slot-scope="{row}">
                    <span>{{ row.OtherUsername }}</span>
                </template>
            </el-table-column>
            <el-table-column label="被操作人昵称" align="center" width="120">

                <template slot-scope="{row}">
                    <span>{{ row.OtherNickname }}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作金额" align="left" width="150">

                <template slot-scope="{row}">
                    <span> {{ row.CoinType | coinTypeFilter }} {{ row.CoinCount }}</span>
                </template>
            </el-table-column>


            <el-table-column label="下分倍率" align="center" width="50">

                <template slot-scope="{row}">
                    <span>{{ row.DownTimes }}</span>
                </template>
            </el-table-column>


            <el-table-column label="创建时间" width="300px" align="center">

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
import { getWalletTransferList } from '@/api/wallet'
import Pagination from '@/components/Pagination'
import waves from '@/directive/waves' // waves directive

const coinTypeMap = {
    1: "usdt",
    2: "trx",
    3: "彩usdt",
    4: "彩trx",
}
const dirMap = {
    1: "===>>>",
    2: "<<<===",
}

export default ({

    name: 'WalletRecharge',
    components: { Pagination },
    directives: { waves },
    filters: {
        coinTypeFilter(coinType) {
            return coinTypeMap[coinType]
        },
        dirFilter(dir) {
            return dirMap[dir]
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
                uid: 0
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

            getWalletTransferList(this.listQuery).then(response => {
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
