<template>

    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="listQuery.fromAddress" placeholder="发送地址" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handlerFilter"></el-input>
            <!-- <el-input v-model="listQuery.hash" placeholder="充值hash" style="width: 200px;" class="filter-item" -->
            <!-- @keyup.enter.native="handlerFilter"></el-input> -->

            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search"
                @click="handlerFilter">搜索</el-button>
        </div>
        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">

            <el-table-column label="ID" prop="id" align="center" width="50">
                <template slot-scope="{row}">
                    <span>{{ row.ID }}</span>
                </template>
            </el-table-column>


            <el-table-column label="用户ID" prop="id" align="center" width="120">

                <template slot-scope="{row}">
                    <span>{{ row.Uid }}</span>
                </template>
            </el-table-column>

            <el-table-column label="发送金额" align="left" width="150">

                <template slot-scope="{row}">
                    <span>{{ row.PayAmount }} {{ row.PaySymbol }}</span>
                </template>
            </el-table-column>


            <el-table-column label="接收金额" align="left" width="150">

                <template slot-scope="{row}">
                    <span>{{ row.ReceiveAmount }} {{ row.ReceiveSymbol }}</span>
                </template>
            </el-table-column>


            <el-table-column label="价格" align="left" width="150">

                <template slot-scope="{row}">
                    <span>{{ row.AvgPrice }} </span>
                </template>
            </el-table-column>

            <el-table-column label="成交量" align="left" width="150">

                <template slot-scope="{row}">
                    <span>{{ row.ExecutedQty }} </span>
                </template>
            </el-table-column>

            <el-table-column label="xm状态" align="left" width="150">

                <template slot-scope="{row}">
                    <span>{{ row.MsgStatus }} </span>
                </template>
            </el-table-column>

            <el-table-column label="本地状态" align="left" width="150">

                <template slot-scope="{row}">
                    <span>{{ row.Msg }} </span>
                </template>
            </el-table-column>

            <el-table-column label="发送地址" align="left" width="330">

                <template slot-scope="{row}">
                    <span>{{ row.PayAddress }}</span>
                </template>
            </el-table-column>
            <el-table-column label="接收地址" align="left" width="330">

                <template slot-scope="{row}">
                    <span>{{ row.ReceiveAddress }}</span>
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
import { getFlashOrderList } from '@/api/flash'
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
            downloadLoading: false
        }
    },

    created() {
        this.getList()
    },

    methods: {
        getList() {
            this.listLoading = true

            getFlashOrderList(this.listQuery).then(response => {
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
