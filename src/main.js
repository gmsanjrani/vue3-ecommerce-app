import { createApp } from "vue";
import App from "./App.vue";
import "../src/assets/css/index.css";
import router from "./router";
import store from "./store";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// import 'sweetalert2/src/sweetalert2.scss'

createApp(App)
  .use(router)
  .use(store)
  .use(VueSweetalert2)
  .use(Toast, { timeout: 3000, position: POSITION.TOP_CENTER })
  .mount("#app");
