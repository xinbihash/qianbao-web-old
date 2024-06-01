<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input-number v-model="listQuery.uid" placeholder="用户ID" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handlerFilter" />
            <el-input v-model="listQuery.username" placeholder="用户名" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handlerFilter" />
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search"
                @click="handlerFilter">搜索</el-button>
        </div>

        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">
            <el-table-column label="序号" prop="id" align="center" width="150">
                <template slot-scope="{row}">
                    <span>{{ row.ID }}</span>
                </template>
            </el-table-column>
            <el-table-column label="玩家ID" prop="uid" align="center" width="150">
                <template slot-scope="{row}">
                    <span>{{ row.Uid }}</span>
                </template>
            </el-table-column>
            <el-table-column label="玩家名" prop="uid" align="center" width="150">
                <template slot-scope="{row}">
                    <span>{{ row.PlayerName }} - {{ row.PlayerNickName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="发彩金uid" align="center" width="100">
                <template slot-scope="{row}">
                    <span>{{ row.OwnerId }}</span>
                </template>
            </el-table-column>

            <el-table-column label="发彩金人名" align="center" width="150">
                <template slot-scope="{row}">
                    <span>{{ row.OwnerName }} - {{ row.OwnerNickName }}</span>
                </template>
            </el-table-column>

            <el-table-column label="转化审批人" align="center" width="100">
                <template slot-scope="{row}">
                    <span>{{ row.ApprovalUid }}</span>
                </template>
            </el-table-column>

            <el-table-column label="转化审批人名" align="center" width="150">
                <template slot-scope="{row}">
                    <span>{{ row.ApprovalName }} - {{ row.ApprovalNickName }}</span>
                </template>
            </el-table-column>


            <el-table-column label="货币类型" width="100px" align="center">

                <template slot-scope="{row}">
                    <el-tag>{{ row.CoinType | coinTypeFilter }}</el-tag>
                </template>
            </el-table-column>

            <el-table-column label="彩金领取额" width="100" align="left">

                <template slot-scope="{row}">
                    <span>{{ row.BonusAmount }}</span>
                </template>
            </el-table-column>

            <el-table-column label="转化标准" width="00px" align="left">

                <template slot-scope="{row}">
                    <span>{{ row.ConvertAmount }}</span>
                </template>
            </el-table-column>

            <el-table-column label="转化额度" width="100" align="left">

                <template slot-scope="{row}">
                    <span>{{ row.RealConvertAmount }}</span>
                </template>
            </el-table-column>
            <el-table-column label="下分倍率" width="100" align="left">

                <template slot-scope="{row}">
                    <span>{{ row.DownTimes }}</span>
                </template>
            </el-table-column>
            <el-table-column label="状态" width="100" align="left">

                <template slot-scope="{row}">
                    <span>{{ row.Status | statusFilter }}</span>
                </template>
            </el-table-column>


            <el-table-column label="创建时间" width="200px" align="center">

                <template slot-scope="{row}">
                    <span>{{ row.CreatedAt }}</span>
                </template>
            </el-table-column>

            <el-table-column label="更新时间" width="200px" align="center">

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
import { getWalletBonusRecord } from '@/api/wallet'
import Pagination from '@/components/Pagination'
import waves from '@/directive/waves' // waves directive


const coinTypeMap = {
    1: "usdt",
    2: "trx",
    3: "彩usdt",
    4: "彩trx",
}

const statusMap = {
    1: "已领取",
    2: "转化提交",
    3: "转化通过",
    4: "转化拒绝",
    5: "已耗尽",
}

export default ({
    name: 'BlChange',
    components: { Pagination },
    directives: { waves },
    filters: {
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
            downloadLoading: false
        }
    },

    created() {
        this.getList()
    },

    methods: {
        getList() {
            this.listLoading = true

            getWalletBonusRecord(this.listQuery).then(response => {
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