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
      <el-table-column show-overflow-tooltip label="ID" prop="primaryKey" width="70px">
        <template #default="{row}">
          <span class="tw-font-bold tw-text-md">
            {{ row.primaryKey }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="status" width="50px">
        <template #default="{row}">
          <el-link :type="row.status == 0 ? 'danger' : 'success'">
            {{ statusMap[row.status] }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="排序" prop="sort" width="50px" />
      <el-table-column label="机器人类型" prop="botType">
        <template #default="{row}">{{ botTypeMap[row.botType] }}</template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="按钮名称" prop="buttonName" />
      <el-table-column show-overflow-tooltip label="跳转地址" prop="jumpUrl" />
      <el-table-column show-overflow-tooltip label="备注" prop="note" />
      <el-table-column show-overflow-tooltip label="创建时间" prop="createdAt">
        <template #default="{row}">{{ row.createdAt | dateFormat }}</template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="更新时间" prop="updatedAt">
        <template #default="{row}">{{ row.updatedAt | dateFormat }}</template>
      </el-table-column>
      <el-table-column label="操作" prop="operation" width="120px">
        <template #default="{row}">
          <el-link type="primary" @click="editClick(row)">修改</el-link>
          <el-divider direction="vertical" />
          <el-link type="danger" @click="del(row)">删除</el-link>
        </template>
      </el-table-column>
    </s-table>
  </div>
</template>

<script>
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

function mapToOptions(map, isNumber = true) {
  return Object.keys(map).map(key => ({
    label: map[key],
    value: isNumber ? Number(key) : key
  }))
}

const botTypeMap = {
  1: '下单bot',
  2: '开奖bot',
  3: '管理bot'
}

const statusMap = {
  1: '启用',
  0: '禁用'
}
const botTypeOptions = mapToOptions(botTypeMap)
const statusOptions = mapToOptions(statusMap)

export default {
  name: 'Config',
  data() {
    return {
      botTypeMap,
      statusMap,
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
    getRules(row) {
      const rules = [
        this.$formCreate.maker.select('机器人类型', 'botType', row && row.botType, {
          placeholder: '机器人类型',
          class: 'tw-w-full'
        }).options(getOptions(botTypeOptions)).validate([
          { required: true, type: 'number', message: '请选择机器人类型' }
        ]),
        this.$formCreate.maker.radio('状态', 'status', row && row.status).options(getOptions(statusOptions)),
        this.$formCreate.maker.input('按钮名称', 'buttonName', row && row.buttonName, {
          placeholder: '按钮名称'
        }).validate([
          { required: true, type: 'string', message: '请输入按钮名称' }
        ]),
        this.$formCreate.maker.input('跳转路径', 'jumpUrl', row && row.jumpUrl, {
          placeholder: '跳转路径'
        }).validate([
          { required: true, type: 'string', message: '请输入跳转路径' }
        ]),
        this.$formCreate.maker.inputNumber('排序', 'sort', row && row.sort, {
          placeholder: '排序',
          class: 'tw-w-full'
        }),
        this.$formCreate.maker.input('备注', 'note', row && row.note, {
          placeholder: '备注'
        })
      ]
      if (row) {
        rules.push(this.$formCreate.maker.input('id', 'id', row.primaryKey, {
          placeholder: '机器人类型',
          class: 'tw-w-full'
        }).hidden(true))
      }
      return rules
    },
    addClick() {
      this.$modalForm(Promise.resolve({
        status: 200,
        data: {
          config: {
            form: {
              labelWidth: '110px'
            }
          },
          rules: this.getRules(),
          title: '添加配置',
          action: '/botMessageConfig/add',
          method: 'POST',
          status: true
        }
      }))
        .then(() => {
          this.$refs.tableRef.refresh(true)
        })
    },
    editClick(row) {
      this.$modalForm(Promise.resolve({
        status: 200,
        data: {
          config: {
            form: {
              labelWidth: '110px'
            }
          },
          rules: this.getRules(row),
          title: '添加配置',
          action: '/botMessageConfig/edit',
          method: 'POST',
          status: true
        }
      }))
        .then(() => {
          this.$refs.tableRef.refresh(true)
        })
    },
    del(row) {
      this.$modalSure({
        title: row.buttonName,
        api: {
          url: '/botMessageConfig/del',
          method: 'POST',
          data: {
            id: row.primaryKey
          }
        }
      })
        .then(() => this.$refs.tableRef.refresh(true))
    }
  }
}
</script>
