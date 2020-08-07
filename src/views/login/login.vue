<template>
  <div class="login">
    <h1 @click="login">This is an login page</h1>
    <img src="/static/images/common/logo-v.png" />
  </div>
</template>

<script>
import { Storage } from '@/utils'

export default {
  methods: {
    async login () {
      Storage.setItem(Storage.AUTH_TOKEN, 'token')
      Storage.setItem(Storage.USER_INFO, {
        id: 123,
        name: 'abc'
      })
      this.$router.replace('/home')
    }
  }
}
</script>
