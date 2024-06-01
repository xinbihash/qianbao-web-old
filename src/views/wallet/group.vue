<template>

    <div class="app-container">
        <div class="filter-container">
            <el-input-number v-model="listQuery.gameType" placeholder="1,2,3" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handlerFilter"></el-input-number>
            <el-input-number v-model="listQuery.groupID" placeholder="群ID" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handlerFilter"></el-input-number>
            <el-input-number v-model="listQuery.ownerID" placeholder="群主ID" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handlerFilter"></el-input-number>

            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search"
                @click="handlerFilter">搜索</el-button>
        </div>
        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">
            <el-table-column label="ID" prop="id" align="center" width="150">
                <template slot-scope="{row}">
                    <span>{{ row.ID }}</span>
                </template>
            </el-table-column>

            <el-table-column label="群主ID" prop="id" align="center" width="150">

                <template slot-scope="{row}">
                    <span>{{ row.Uid }}</span>
                </template>
            </el-table-column>

            <el-table-column label="群主名" align="center" width="100">

                <template slot-scope="{row}">
                    <span>{{ row.Username }}</span>
                </template>
            </el-table-column>
            <el-table-column label="群主昵称" align="center" width="100">

                <template slot-scope="{row}">
                    <span>{{ row.Nickname }}</span>
                </template>
            </el-table-column>

            <el-table-column label="群名" align="center" width="100">

                <template slot-scope="{row}">
                    <span>{{ row.Title }}</span>
                </template>
            </el-table-column>

            <el-table-column label="群ID" prop="id" align="center" width="150">

                <template slot-scope="{row}">
                    <span>{{ row.GroupID }}</span>
                </template>
            </el-table-column>

            <el-table-column label="游戏类型" prop="id" align="center" width="150">

                <template slot-scope="{row}">
                    <span>{{ row.GameType | gameTypeFilter }}</span>
                </template>
            </el-table-column>

            <el-table-column label="状态" prop="id" align="center" width="100">

                <template slot-scope="{row}">
                    <span>{{ row.Status | statusFilter }}</span>
                </template>
            </el-table-column>

            <el-table-column label="过期时间" width="250px" align="center">

                <template slot-scope="{row}">
                    <span>{{ row.ExpireAt }}</span>
                </template>
            </el-table-column>

            <el-table-column label="创建时间" width="250px" align="center">

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
import { getWalletGroupList } from '@/api/wallet'
import Pagination from '@/components/Pagination'
import waves from '@/directive/waves' // waves directive

const gameTypeMap = {
    1: "扫雷",
    2: "pc28高倍",
    3: "骰子"
}

const statusMap = {
    1: "可用",
    2: "禁用",
}

export default ({
    name: 'WalletRecharge',
    components: { Pagination },
    directives: { waves },
    filters: {
        gameTypeFilter(gameType) {
            return gameTypeMap[gameType]
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

            getWalletGroupList(this.listQuery).then(response => {
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
