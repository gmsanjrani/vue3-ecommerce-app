import { createApp } from 'vue'
import App from './App.vue'
import "../src/assets/css/index.css"
import router from './router'
import store from './store'
import Toast,{POSITION} from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";


createApp(App).use(router).use(store).use(Toast,{ timeout: 3000, position: POSITION.TOP_CENTER }).mount('#app')

