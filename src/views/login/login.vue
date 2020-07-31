<template>
  <div class="login">
    <h1 @click="login">This is an login page</h1>
    <img src="/static/images/common/logo-v.png">
  </div>
</template>

<script>
import { Storage } from '@/utils'

export default {
  methods: {
    async login () {
      await Storage.setItem(Storage.USER_INFO, {
        token: 'token'
      })
      this.$router.replace('/home')
    }
  }
}
</script>
