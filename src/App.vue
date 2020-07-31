<template>
  <div id="app">
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: '标题',
    meta: [
      {
        name: 'keywords',
        content: '关键字'
      },
      {
        name: 'description',
        content: '描述'
      }
    ],
    link: []
  },
  mounted () {
    console.log(process.env)
  }
}
</script>

<style lang="scss">
#app {
  text-align: center;
  color: #2c3e50;
}
</style>
