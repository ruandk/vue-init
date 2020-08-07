<template>
  <div class="home">
    <h1>This is an home page</h1>
    <div class="d1">
      <van-field readonly clickable :value="value" placeholder="请选择" @click="showPicker = true" />
      <router-link to="/store">store</router-link>
    </div>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { Storage } from '@/utils'
import { USER_LOGIN } from '@/http'

export default {
  data () {
    return {
      value: '',
      showPicker: false,
      columns: ['选项1', '选项2', '选项3']
    }
  },
  mounted () {
    console.log(Storage.getItem(Storage.AUTH_TOKEN))
    console.log(Storage.getItem(Storage.USER_INFO))
    // this.init()
  },
  methods: {
    async init () {
      const data = await USER_LOGIN({ username: 'abc', password: '123' })
      console.log(data)
    },
    onConfirm (value) {
      this.value = value
      this.showPicker = false
    }
  }
}
</script>

<style lang="scss" scoped>
.d1 {
  margin: 0 auto;
  width: 375px;
  height: 375px;
  background: #df2233;
}
</style>
