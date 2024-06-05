<template>

    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="listQuery.address" placeholder="充值地址" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handlerFilter"></el-input>
            <el-input-number v-model="listQuery.uid" placeholder="用户id" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handlerFilter"></el-input-number>
            <el-input v-model="listQuery.username" placeholder="username" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handlerFilter"></el-input>

            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search"
                @click="handlerFilter">搜索</el-button>
        </div>
        <div class="filter-container">
            <el-tag>用户总余额U：{{ this.usdtTotal }}</el-tag><el-tag>用户总余额T：{{ this.trxTotal }}</el-tag>
        </div>
        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">

            <el-table-column label="ID" prop="id" align="center" width="100">
                <template slot-scope="{row}">
                    <span>{{ row.ID }}</span>
                </template>
            </el-table-column>

            <el-table-column label="用户ID" prop="id" align="center" width="150">

                <template slot-scope="{row}">
                    <span class="link-ype" @click="userProfit(row.Uid)">{{ row.Uid }}</span>
                </template>
            </el-table-column>


            <el-table-column label="昵称" prop="id" align="left" width="150">

                <template slot-scope="{row}">
                    <span>{{ row.FirstName }}{{ row.LastName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="username" prop="id" align="left" width="150">

                <template slot-scope="{row}">
                    <span>{{ row.UserName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="VIP等级" prop="id" align="left" width="150">

                <template slot-scope="{row}">
                    <span>{{ row.VipLevel }}</span>
                </template>
            </el-table-column>
            <el-table-column label="usdt" prop="id" align="left" width="100">

                <template slot-scope="{row}">
                    <span>{{ row.UsdtBalance }}</span>
                </template>
            </el-table-column>
            <el-table-column label="trx" prop="id" align="left" width="100">

                <template slot-scope="{row}">
                    <span>{{ row.TrxBalance }}</span>
                </template>
            </el-table-column>
            <el-table-column label="彩usdt" prop="id" align="left" width="100">

                <template slot-scope="{row}">
                    <span>{{ row.UsdtBonusBalance }}</span>
                </template>
            </el-table-column>
            <el-table-column label="彩trx" prop="id" align="left" width="100">

                <template slot-scope="{row}">
                    <span>{{ row.TrxBonusBalance }}</span>
                </template>
            </el-table-column>
            <el-table-column label="usdt免密额度" prop="id" align="left" width="110">

                <template slot-scope="{row}">
                    <span>{{ row.UsdtValidFree }}</span>
                </template>
            </el-table-column>
            <el-table-column label="trx免密额度" prop="id" align="left" width="100">

                <template slot-scope="{row}">
                    <span>{{ row.TrxValidFree }}</span>
                </template>
            </el-table-column>

            <el-table-column label="支付密码" prop="id" align="center" width="60">

                <template slot-scope="{row}">
                    <span>{{ row.PaySecret }}</span>
                </template>
            </el-table-column>

            <el-table-column label="充值地址" prop="id" align="left" width="350">

                <template slot-scope="{row}">
                    <span>{{ row.UserAddress }}</span>
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



        <el-dialog :visible.sync="userProfitDataVisible">

            <!-- <el-descriptions title="用户总体盈利情况"> -->
            <div>用户总体盈利情况</div>
            <div> 用户ID: {{ userProfitData.Uid }}</div>
            <div> </div>
            <div> 用户名: {{ userProfitData.Username }}</div>
            <div> 用户昵称: {{ userProfitData.NickName }}</div>
            <div> trx pc28下注总额: {{ userProfitData.PcTrxSendAmount }} </div>
            <div> trx pc28中奖总额: {{ userProfitData.PcTrxReceiveAmount }} </div>
            <div> trx pc28反水总额: {{ userProfitData.PcTrxRebateAmount }} </div>
            <div> 彩trx pc28下注总额: {{ userProfitData.PcTrxBonusSendAmount }} </div>
            <div> 彩trx pc28中奖总额: {{ userProfitData.PcTrxBonusReceiveAmount }} </div>
            <div> 彩trx pc28反水总额: {{ userProfitData.PcTrxBonusRebateAmount }} </div>
            <div> trx 充值总额: {{ userProfitData.TrxRechargeAmount }} </div>
            <div> trx 提现总额: {{ userProfitData.TrxWithdrawAmount }} </div>
            <div> trx 转账发送总额: {{ userProfitData.TrxTxSendAmount }} </div>
            <div> trx 转账接收总额: {{ userProfitData.TrxTxReceiveAmount }} </div>

            <div> usdt pc28下注总额: {{ userProfitData.PcUsdtSendAmount }} </div>
            <div> usdt pc28中奖总额: {{ userProfitData.PcUsdtReceiveAmount }} </div>
            <div> usdt pc28反水总额: {{ userProfitData.PcUsdtRebateAmount }} </div>
            <div> 彩usdt pc28下注总额: {{ userProfitData.PcUsdtBonusSendAmount }} </div>
            <div> 彩usdt pc28中奖总额: {{ userProfitData.PcUsdtBonusReceiveAmount }} </div>
            <div> 彩usdt pc28反水总额: {{ userProfitData.PcUsdtBonusRebateAmount }} </div>
            <div> usdt 充值总额: {{ userProfitData.UsdtRechargeAmount }} </div>
            <div> usdt 提现总额: {{ userProfitData.UsdtWithdrawAmount }} </div>
            <div> usdt 转账发送总额: {{ userProfitData.UsdtTxSendAmount }} </div>
            <div> usdt 转账接收总额: {{ userProfitData.UsdtTxReceiveAmount }} </div>
            <div> trx总收益: {{ userProfitData.TrxTotalAmount }} </div>
            <div> usdt 总收益: {{ userProfitData.UsdtTotalAmount }} </div>
            <div> 游戏总流水: {{ userProfitData.TotalBetAmount }} </div>
            <div> 游戏总盈亏: {{ userProfitData.TotalProfitAmount }} </div>
            <!-- <el-descriptions-item label="trx充值总和"></el-descriptions-item> -->

            <!-- </el-descriptions> -->
        </el-dialog>
    </div>

</template>


<script>
import { getWalletUserList, getUserProfit } from '@/api/wallet'
import Pagination from '@/components/Pagination'
import waves from '@/directive/waves' // waves directive
import { title } from '@/settings'

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

            userProfitQuery: {
                uid: 0
            },
            downloadLoading: false,
            userProfitData: {},
            userProfitDataVisible: false,
            usdtTotal: 0,
            trxTotal: 0
        }
    },

    created() {
        this.getList()
    },

    methods: {
        getList() {
            this.listLoading = true

            getWalletUserList(this.listQuery).then(response => {
                this.list = response.data
                this.total = response.code
                this.usdtTotal = response.usdtTotal
                this.trxTotal = response.trxTotal
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
        userProfit(uid) {
            this.userProfitQuery.uid = uid
            getUserProfit(this.userProfitQuery).then(response => {
                this.userProfitData = response.data
                this.userProfitDataVisible = true
            })
        }

    },

})
</script>
