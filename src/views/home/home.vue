<template>
  <div class="home">
    <h1>This is an home page</h1>
    <div class="d1">
      <router-link to="/store">store</router-link>
    </div>
  </div>
</template>

<script>
import { USER_LOGIN } from '@/http'

export default {
  mounted () {
    // this.init()
  },
  methods: {
    async init () {
      const data = await USER_LOGIN({ username: 'abc', password: '123' })
      console.log(data)
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
