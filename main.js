import Vue from 'vue'
import App from './App'
import store from './store'
import cuCustom from './colorui/components/cu-custom.vue';

Vue.component('cu-custom',cuCustom);
Vue.config.productionTip = false
Vue.prototype.$openid = '';
Vue.prototype.appid = '';
Vue.prototype.secret = '';
Vue.prototype.$state = store.state;
Vue.prototype.$baseUrl = '';
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
