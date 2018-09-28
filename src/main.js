import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'
import 'normalize.css/normalize.css'
import '@/assets/styles/public.css';
import App from './App'
import Bal from "babel-polyfill"
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'
import LangEn from '@/common/lang/en'
import LangZh from '@/common/lang/zh'
// 自定义全局组件Loading
import Loading from '/components/loading'
Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.use(Bal)
Vue.use(ElementUI)
Vue.use(Loading)

const i18n = new VueI18n({
  locale: sessionStorage.getItem('locale') ||'zhCHS', // 语言标识
  messages:{
    'en': LangEn,
    'zhCHS': LangZh
  }
})
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})

