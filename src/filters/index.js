import Vue from 'vue'
import { Utils } from '@/utils'

const filters = {
  dateFormat (val, format) {
    /**
     * @format 格式
     */
    return Utils.dateFormat(val, format)
  }
}

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
