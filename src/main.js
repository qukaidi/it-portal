import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './rem'
import VueWechatTitle from 'vue-wechat-title'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import 'vant/lib/icon/local.css';
import toast from './utils/toast';
import * as filters from './utils/filters'
import {Lazyload} from 'vant';

Vue.prototype.$toast = toast
Vue.mixin({
  methods: {
    isChinese () {
      return this.$vantLang === 'zh-CN';
    },
    getLangContent (zhContent, enContent) {
      let displayContent = zhContent;
      if(this.$vantLang==='en-US' && enContent && enContent !== ''){
        displayContent = enContent
      }
      return displayContent;
    }
  },
})
Vue.use(Lazyload, {
    loading: require('./assets/loading.gif'),
    error: require('./assets/loading.gif'),
    preLoad: "1.3",
    attempt: 1,
  filter: {
    webp (listener) {
        listener.src = "/api/image-zip/" + listener.src
    }
  }

});
Vue.use(preview,{
  shareButtons: [
    {id:'download', label:'Download image', url:'{{raw_image_url}}', download:true}
]
})
Vue.use(VueWechatTitle)
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.directive('focus', {
    update: function(el, value) {
      el.focus();
    },
    inserted: function(el) {
      el.focus();
    }
})
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

