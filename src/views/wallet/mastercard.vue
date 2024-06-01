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
            <el-table-column label="ID" prop="id" align="center" width="50">
                <template slot-scope="{row}">
                    <span>{{ row.ID }}</span>
                </template>
            </el-table-column>

            <el-table-column label="tg-UID" prop="id" align="center" width="100">

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
            <el-table-column label="订单ID" prop="id" align="center" width="500">

                <template slot-scope="{row}">
                    <span>{{ row.OrderNo }}</span>
                </template>
            </el-table-column>

            <el-table-column label="卡ID" prop="id" align="center" width="200">

                <template slot-scope="{row}">
                    <span>{{ row.CardId }}</span>
                </template>
            </el-table-column>
            <el-table-column label="kyc状态" prop="id" align="center" width="100">

                <template slot-scope="{row}">
                    <span>{{ row.KycStatus | kycStatusFilter }}</span>
                </template>
            </el-table-column>

            <el-table-column label="审批状态" prop="id" align="center" width="100">

                <template slot-scope="{row}">
                    <span>{{ row.ApplyStatus | applyStatusFilter }}</span>
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
import { getWalletMasterCardList } from '@/api/wallet'
import Pagination from '@/components/Pagination'
import waves from '@/directive/waves' // waves directive

const kycStatusMap = {
    0: "未提交",
    1: "等待审核",
    2: "审核中",
    3: "审核通过",
    4: "审核失败",
    5: "等待重新提交"
}

const applyStatusMap = {
    "NOT_APPLY": "未申请",
    "WAIT_AUDIT": "等待审核",
    "AUDIT_PASS": "审核通过",
    "AUDIT_REFUSE": "审核失败",
    "CARD_INIT": "卡初始化中",
    "APPLYING": "应用",
}

export default ({

    name: 'WalletRecharge',
    components: { Pagination },
    directives: { waves },
    filters: {
        kycStatusFilter(status) {
            return kycStatusMap[status]
        },
        applyStatusFilter(status) {
            return applyStatusMap[status]
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

            getWalletMasterCardList(this.listQuery).then(response => {
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
