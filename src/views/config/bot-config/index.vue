<template>
  <div class="app-container">
    <s-table
      ref="tableRef"
      :api="{
        url: '/botMessageConfig/list',
        method: 'POST'
      }"
      :querys="querys"
      show-add
      @addClick="addClick"
    >
      <el-table-column label="ID" prop="ID" />
      <el-table-column label="机器人类型" prop="BotType" />
      <el-table-column label="状态" prop="Status" />
      <el-table-column label="按钮名称" prop="ButtonName" />
      <el-table-column label="跳转地址" prop="JumpUrl" />
      <el-table-column label="备注" prop="Note" />
      <el-table-column label="创建时间" prop="CreateAt" />
      <el-table-column label="更新时间" prop="UpdateAt" />
    </s-table>
  </div>
</template>

<script>
import modalForm from '@/utils/modalForm'

function getOptions(botTypeOptions, isQuery = false) {
  const options = [...botTypeOptions]
  if (isQuery) {
    options.unshift({
      label: '全部',
      value: -1
    })
  }
  return options
}
const botTypeOptions = [
  {
    label: '下单bot',
    value: 1
  },
  {
    label: '开奖bot',
    value: 2
  },
  {
    label: '管理bot',
    value: 3
  }
]
const statusOptions = [
  {
    label: '启用',
    value: 1
  },
  {
    label: '禁用',
    value: 0
  }
]

export default {
  name: 'Config',
  data() {
    return {
      querys: [
        {
          type: 'select',
          field: 'botType',
          title: '机器人类型',
          options: getOptions(botTypeOptions, true),
          value: -1,
          props: {
            placeholder: '机器人类型'
          },
          wrap: {
            labelWidth: '100px'
          }
        },
        {
          type: 'select',
          field: 'status',
          title: '状态',
          value: -1,
          options: getOptions(statusOptions, true),
          props: {
            placeholder: '状态'
          }
        }
      ]
    }
  },
  methods: {
    addClick() {
      modalForm.call(this, Promise.resolve({
        status: 200,
        data: {
          config: {
            form: {
              labelWidth: '110px'
            }
          },
          rules: [
            this.$formCreate.maker.select('机器人类型', 'botType', '', {
              placeholder: '机器人类型',
              class: 'tw-w-full'
            }).options(getOptions(botTypeOptions)).validate([
              { required: true, type: 'number', message: '请选择机器人类型' }
            ]),
            this.$formCreate.maker.radio('状态', 'status', 0).options(getOptions(statusOptions)),
            this.$formCreate.maker.input('按钮名称', 'buttonName', '', {
              placeholder: '按钮名称'
            }).validate([
              { required: true, type: 'string', message: '请输入按钮名称' }
            ]),
            this.$formCreate.maker.input('跳转路径', 'jumpUrl', '', {
              placeholder: '跳转路径'
            }).validate([
              { required: true, type: 'string', message: '请输入跳转路径' }
            ]),
            this.$formCreate.maker.input('备注', 'note', '', {
              placeholder: '备注'
            })
          ],
          title: '添加配置',
          action: '/botMessageConfig/add',
          method: 'POST',
          status: true
        }
      }))
        .then(() => {
          this.$refs.tableRef.refresh(true)
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
