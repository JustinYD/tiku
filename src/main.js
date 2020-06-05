import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './plugins/vant.js'
import Vant from 'vant';
import 'vant/lib/index.css';
import axios from 'axios';
Vue.prototype.$http = axios;
Vue.config.productionTip = false
Vue.use(Vant);
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')