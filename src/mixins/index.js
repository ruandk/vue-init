import Vue from 'vue'

const myMixin = {
  data () {
    return {
      VUE_APP_HOST: process.env.VUE_APP_HOST,
      FILE_MAX: 1,
      PAGE_SIZE: 10
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    go (router) {
      this.$router.push(router)
    }
  }
}

Vue.mixin(myMixin)
