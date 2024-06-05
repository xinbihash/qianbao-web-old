<template>
  <el-select v-bind="$attrs" :value="value" @change="change">
    <el-option
      v-for="item in localOptions"
      :key="item[localProps.value]"
      :label="item[localProps.label]"
      :value="item[localProps.value]"
    />
  </el-select>
</template>

<script>
import { handleApi } from '../util'

export default {
  model: {
    event: 'change'
  },
  props: {
    value: [String, Number],
    defaultValue: [String, Number],
    options: {
      type: Array,
      default: () => []
    },
    props: {
      type: Object,
      default: () => ({
        label: 'label',
        value: 'value'
      })
    },
    api: [String, Object, Function]
  },
  data() {
    return {
      localOptions: []
    }
  },
  computed: {
    localProps() {
      const { props } = this
      return {
        label: props.label || 'label',
        value: props.value || 'value'
      }
    }
  },
  watch: {
    options: {
      handler(val) {
        if (val) {
          this.localOptions = val
        }
      },
      immediate: true
    },
    defaultValue: {
      handler(val) {
        if (val !== undefined) {
          this.$emit('change', val)
        }
      },
      immediate: true
    }
  },
  created() {
    if (this.api) {
      this.getData()
    }
  },
  methods: {
    getData() {
      handleApi(this.api).then(({ data }) => {
        this.localOptions = data
        this.$emit('result', data)
      })
    },
    change(e) {
      this.$emit('change', e)
    }
  }
}
</script>
