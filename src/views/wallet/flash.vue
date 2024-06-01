<template>

    <div class="app-container">
        <div class="filter-container">
            <el-input-number v-model="listQuery.uid" placeholder="用户ID" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handlerFilter"></el-input-number>
            <el-input v-model="listQuery.username" placeholder="用户名" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handlerFilter" />
            <el-input-number v-model="listQuery.flashType" placeholder="闪兑类型:1、2" style="width: 200px;"
                class="filter-item" @keyup.enter.native="handlerFilter"></el-input-number>

            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search"
                @click="handlerFilter">搜索</el-button>
        </div>
        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">
            <el-table-column label="ID" align="center" width="50">
                <template slot-scope="{row}">
                    <span>{{ row.ID }}</span>
                </template>
            </el-table-column>

            <el-table-column label="用户ID" align="center" width="100">

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
            <el-table-column label="闪兑类型" align="left" width="100">

                <template slot-scope="{row}">
                    <span>{{ row.FlashType | FlashTypeFilter }}</span>
                </template>
            </el-table-column>
            <el-table-column label="发送数量" align="left" width="100">

                <template slot-scope="{row}">
                    <span>{{ row.CoinNumSend }}</span>
                </template>
            </el-table-column>

            <el-table-column label="接收数量" align="left" width="100">

                <template slot-scope="{row}">
                    <span>{{ row.CoinNumReceive }}</span>
                </template>
            </el-table-column>

            <el-table-column label="闪兑价格" align="left" width="100">

                <template slot-scope="{row}">
                    <span>{{ row.FlashPrice }}</span>
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
import { getWalletFlashList } from '@/api/wallet'
import Pagination from '@/components/Pagination'
import waves from '@/directive/waves' // waves directive


const FlashTypeMap = {
    1: "usdt -> trx",
    2: "trx -> usdt"
}

export default ({

    name: 'WalletRecharge',
    components: { Pagination },
    directives: { waves },
    filters: {
        FlashTypeFilter(flashType) {
            return FlashTypeMap[flashType]
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

            getWalletFlashList(this.listQuery).then(response => {
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
