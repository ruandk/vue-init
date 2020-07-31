import Vue from 'vue'
// import Navigation from 'vue-navigation'

// APP
import App from './App.vue'

// 引入路由、状态管理
import router from './router'
import store from './store'

// set meta
import MetaInfo from 'vue-meta-info'

// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 注册全局组件
import '@/components'

// 过滤器、混入、指令
import '@/filters'
import '@/mixins'
import '@/directives'

// set 1rem = viewWidth / 10
import 'amfe-flexible'
// 引入字体图标、全局样式
import '@/styles/iconfont/iconfont.css'
import '@/styles/index.scss'

// Vue.use(Navigation, { router })
Vue.use(MetaInfo)
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$cdn = process.env.VUE_APP_CDN

new Vue({
  router,
  store,
  render: h => h(App),
  mounted () {
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#app')
